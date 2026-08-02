# Workflow Loop Node Guide

---

## Chapter 1: Loop Node Overview and Basic Concepts

### 1.1 What Is a Loop Node

The Loop node is a control node in the workflow system used for batch processing data. It retrieves an array of data from a data source and then executes a set of child nodes (i.e., the loop body) for each item in the array in turn, enabling automation scenarios such as batch notifications, batch archiving, and batch external API calls.

On the workflow canvas, the Loop node is displayed as a container. The child nodes inside it form the node chain that is executed during each iteration.

### 1.2 Relationship Between the Loop Node and Loop Body Nodes

The Loop node is a container-type node. Its core structure is as follows:

- **Loop node itself**: responsible for data source parsing, iteration control, error handling, and loop context management.
- **Loop body nodes (`loop_body_nodes`)**: the nested child node chain inside the Loop node, executed sequentially during each iteration.

The two have a parent-child relationship. The Loop node holds the list of loop body child nodes through the `config.loop_body_nodes` field. Child nodes are sorted via the `order` field and form an execution chain through the `next_nodes` field.

### 1.3 Supported Node Types in the Loop Body

The following node types can be added inside a loop body (the `condition` branch node is not included):

| Node Type | Name | Description |
|----------|------|-------------|
| `webhook` | Webhook | Call an external HTTP endpoint |
| `send_email` | Send Email | Send an email to specified recipients |
| `update_record` | Update Record | Update records in a data table |
| `create_record` | Create Record | Create new records in a target data table |
| `find_records` | Find Records | Query records in a data table |
| `loop` | Loop | Nested loop (supports up to 3 levels of nesting) |

> **Note**: The `condition` (conditional branch) node is not allowed inside a loop body. If you try to add one, the system will reject it and return a validation error when the workflow is created or updated.

### 1.4 System Constraints

| Constraint | Limit | Description |
|------------|-------|-------------|
| Maximum loop nodes per workflow | 5 | Includes all loop nodes inside nested loop bodies |
| Maximum nesting depth | 3 | Loop nodes can be nested up to 3 levels |
| Loop execution mode | `sequential` | Only sequential execution is currently supported; parallel execution is not supported |

---

## Chapter 2: Detailed Usage of the Loop Body

### 2.1 Syntax Structure

#### 2.1.1 Template Variable Syntax

Loop body nodes can use template variables in their configuration to reference loop context data. Template variables use double curly brace syntax:

```
{{variable_path}}
```

For example:

```
{{loop.current_data}}
{{loop.current_data.field_abc123}}
{{loop.round}}
```

#### 2.1.2 Dot-Path Resolution

Template variable paths use dot separators. The system resolves them layer by layer through the `_resolve_path()` method:

1. Split the path into multiple parts by the dot `.`.
2. Retrieve values layer by layer from the rendering context dictionary.
3. If an intermediate layer is a `dict`, use `.get(part)` to retrieve the value.
4. If an intermediate layer is a `list`/`tuple` and the path part is numeric, retrieve by index.
5. If any layer resolves to `None`, the entire expression returns `None`.

Examples:

```
{{loop.current_data.field_id}}  → context["loop"]["current_data"]["field_id"]
{{record.name}}                 → context["record"]["name"]
{{trigger.record.status}}       → context["trigger"]["record"]["status"]
```

#### 2.1.3 Template Rendering Rules

The rendering rules of the `render_template()` method are as follows:

- If the input value is not a string, it is returned as-is.
- If the entire string is exactly a `{{...}}` expression (full match), the resolved raw value is returned directly (type preserved).
- If the string contains multiple `{{...}}` expressions mixed with plain text, they are replaced one by one and concatenated as strings (`None` becomes an empty string).

### 2.2 Data Source Configuration

The Loop node determines the data source to iterate through the `data_source` configuration item. The following four types are supported:

#### 2.2.1 find_records_all

Iterate over all records returned by a Find Records node. The `current_data` of each iteration is the complete record dictionary (containing all field values).

```json
{
  "type": "find_records_all",
  "node_id": "<find_records node ID>"
}
```

- Data source: the `records` array in the output of the specified `find_records` node.
- `current_data` type: `dict` (complete record; keys are field IDs and values are field values).
- Supports field drilling: yes (specific fields can be accessed via `{{loop.current_data.field_id}}`).

#### 2.2.2 find_records_column

Extract the value of a specified field from the Find Records results and flatten it. Applicable to field types such as member, group, attachment, and link; automatically deduplicates list items that have an `id` attribute.

```json
{
  "type": "find_records_column",
  "node_id": "<find_records node ID>",
  "field_id": "<field ID>"
}
```

- Data source: extracts the specified field value from each record in the `find_records` node result list.
- Flattening logic: if the field value is a list, it is expanded item by item; dictionary items containing `id` are automatically deduplicated.
- `current_data` type: depends on the field type (e.g., a member field is a dictionary `{id, name, email}`).
- Supports field drilling: no (the data is already a single value).

#### 2.2.3 trigger_field

Retrieve the value of a specified field from the trigger record. If the field value is a list, it is returned directly; otherwise it is wrapped as a single-element list.

```json
{
  "type": "trigger_field",
  "field_id": "<field ID>"
}
```

- Data source: the specified field value of the `record` object in the trigger event.
- List fields (e.g., multi-person collaboration): returned directly as a list.
- Single-value fields: wrapped as `[value]` single-element list.
- Supports field drilling: no.

#### 2.2.4 webhook_array

Read a JSON array from the return result of a Webhook node.

```json
{
  "type": "webhook_array",
  "node_id": "<webhook node ID>"
}
```

- Data source: the `{node_id}_result.json.array` path in the context.
- `current_data` type: depends on the data structure returned by the Webhook.
- Supports field drilling: no (data structure is unknown).

### 2.3 Execution Flow

The complete execution flow of the Loop node is as follows:

```
1. Loop node starts execution
   │
2. Parse data_source and obtain data_array
   │
3. If data_array is empty
   ├─ empty_result_action = "skip" → log and return {next_nodes}, continue main chain
   └─ empty_result_action = "error" → raise an exception
   │
4. Compute total = min(len(data_array), max_iterations)
   │
5. Create execution log (status: running)
   │
6. Iterate index = 0, 1, ..., total-1 in order
   │
   ├─ a. Save the outer loop_context (used for nested loop recovery)
   ├─ b. Set the current loop_context = {
   │       current_data: data_array[index],
   │       index: index,
   │       round: index + 1,
   │       total: total
   │    }, write to instance.context
   ├─ c. Execute the loop body node chain
   │   └─ If a node raises an exception:
   │       ├─ error_handling = "skip" → log failure and continue to next iteration
   │       └─ error_handling = "terminate" → mark early termination and raise exception upward
   └─ d. Restore the outer loop_context (guaranteed by finally)
   │
7. Update execution log (status: success/error, record statistics)
   │
8. Return {next_nodes: node.next_nodes} and continue the main chain
```

The output result after execution contains the following statistical fields:

| Field | Type | Description |
|-------|------|-------------|
| `total_iterations` | int | Total number of iterations actually executed |
| `success_count` | int | Number of successful iterations |
| `failure_count` | int | Number of failed iterations |
| `early_terminated` | bool | Whether the loop terminated early |
| `skipped_reason` | string | Reason for skipping (only present when data is empty; value is `data_array_empty`) |

---

## Chapter 3: Loop Body Configuration

### 3.1 Basic Configuration

The complete configuration parameters of the Loop node are as follows:

| Parameter | Type | Default | Range | Description |
|-----------|------|---------|-------|-------------|
| `data_source.type` | string | `"find_records_all"` | `find_records_all`, `find_records_column`, `trigger_field`, `webhook_array` | Data source type |
| `data_source.node_id` | string | - | UUID of the referenced node | ID of the upstream node referenced by the data source (required for `find_records_all` / `find_records_column` / `webhook_array`) |
| `data_source.field_id` | string | - | UUID of the field | Target field ID to extract (required for `find_records_column`) |
| `data_source.trigger_field_id` | string | - | UUID of the field | Trigger record field ID (used for `trigger_field`; compatible with `field_id`) |
| `max_iterations` | number | `100` | 1 - 1000 | Maximum number of iterations per execution |
| `error_handling` | string | `"skip"` | `skip`, `terminate` | How to handle errors during loop body execution |
| `empty_result_action` | string | `"skip"` | `skip`, `error` | How to handle an empty data array |
| `loop_body_nodes` | array | `[]` | - | List of loop body child nodes (cannot be empty) |
| `loop_mode` | string | `"sequential"` | `sequential` | Loop execution mode (only sequential is currently supported) |

#### 3.1.1 Error Handling

- **`skip` (skip current and continue)**: When an iteration of the loop body raises an exception, skip the remaining nodes of that iteration, record a failure count, and continue with the next iteration. After the loop ends, it returns to the main chain normally.
- **`terminate` (terminate flow)**: When an iteration raises an exception, mark `early_terminated = True`, raise the exception upward, and terminate the entire workflow instance.

#### 3.1.2 Empty Result Handling

- **`skip` (skip loop)**: When the data array is empty, record a diagnostic log (containing `skipped_reason: "data_array_empty"`), return `{next_nodes}`, and continue the main chain.
- **`error` (report error)**: When the data array is empty, raise `ValueError('Loop data source is empty')` and terminate the workflow instance.

### 3.2 Advanced Configuration

#### 3.2.1 Nested Loop Support

A Loop node can be nested inside another loop body to form a multi-level loop structure. System constraints are as follows:

- **Maximum nesting depth**: 3 levels (the outermost is level 1 and the innermost is level 3).
- Configurations that exceed 3 levels of nesting will be rejected when creating or updating the workflow, returning the error message: `Loop nesting depth cannot exceed 3 levels`.

Nested loop context isolation mechanism:

- Before entering the inner loop, save the outer `loop_context` to a temporary variable.
- Set the inner `loop_context` and execute the inner loop body.
- Regardless of whether the inner loop succeeds or fails, restore the outer `loop_context` in the `finally` block.

#### 3.2.2 Loop Node Count Limit

The total number of Loop nodes in a single workflow (including those inside nested loop bodies) cannot exceed 5. When the limit is exceeded, creating or updating the workflow will return the error message: `A single workflow can contain at most 5 loop nodes`.

#### 3.2.3 Loop Context Structure

During each iteration, the system sets the `loop_context` field in the workflow instance context (`instance.context`) with the following structure:

```json
{
  "current_data": "<data item of the current iteration>",
  "index": 0,
  "round": 1,
  "total": 10
}
```

| Field | Type | Description |
|-------|------|-------------|
| `current_data` | Any | Data item of the current iteration (type depends on the data source) |
| `index` | int | Index of the current iteration (starting from 0) |
| `round` | int | Round number of the current iteration (starting from 1, i.e., `index + 1`) |
| `total` | int | Total number of iterations for this loop |

---

## Chapter 4: Typical Usage Scenarios

### 4.1 Batch Notifications

**Scenario**: Find all tasks with status "In Progress", extract the member list from the owner field, and send email notifications one by one.

**Flow**:

```
Trigger → Find Records (in-progress tasks) → Loop (find_records_column, owner field) → Send Email
```

**Key points**:

- Use `find_records_column` as the data source and specify a member-type field.
- `find_records_column` automatically deduplicates member lists to prevent the same person from receiving multiple emails.
- Use `{{loop.current_data.name}}` and `{{loop.current_data.email}}` in the email template to reference recipient information.

### 4.2 Batch Archiving

**Scenario**: Find all requirements with status "Launched" from the requirements progress table and copy them to the archive table one by one.

**Flow**:

```
Trigger → Find Records (launched requirements) → Loop (find_records_all) → Create Record
```

**Key points**:

- Use `find_records_all` as the data source; the `current_data` of each iteration is a complete record dictionary.
- Use `{{loop.current_data.field_id}}` in the field mapping of the Create Record node to reference source record values field by field.

### 4.3 Nested Loops

**Scenario**: The outer loop iterates over active employees, and the inner loop iterates over the tasks assigned to each employee. Create a detail record for each employee-task combination.

**Flow**:

```
Trigger
  → Find Records (active employees)
  → Outer Loop (find_records_all, employees)
    → Find Records (tasks of this employee)
    → Inner Loop (find_records_all, tasks)
      → Create Record
```

**Key points**:

- The nesting depth is 2, within the limit.
- The inner loop body can access inner data through `{{loop.current_data}}`, and the outer context is automatically restored after the inner loop ends.

### 4.4 Batch Webhook Calls

**Scenario**: Find records that meet the conditions and call an external API one by one to synchronize data.

**Flow**:

```
Trigger → Find Records → Loop (find_records_all) → Webhook
```

**Key points**:

- The Webhook body template can use variables such as `{{loop.current_data}}` and `{{loop.round}}`.
- When building Webhook event data, the system automatically passes `loop_context` into the rendering context.

---

## Chapter 5: Detailed Case Studies

### 5.1 Case 1: Batch Email Notifications

#### Scenario Description

When a new record is added to the task table, find all tasks with status "In Progress", extract the members from the owner field of these tasks, and send an email reminder to each unique member.

#### Configuration Code

```json
{
  "name": "任务提醒工作流",
  "nodes_config": [
    {
      "node_type": "trigger",
      "name": "记录创建触发",
      "config": {},
      "order": 0
    },
    {
      "node_type": "find_records",
      "name": "查找进行中任务",
      "config": {
        "target_table_id": "tbl_tasks",
        "conditions": [
          {
            "field_id": "fld_status",
            "operator": "equals",
            "value": "进行中"
          }
        ],
        "conjunction": "and",
        "result_variable": "records"
      },
      "order": 1
    },
    {
      "node_type": "loop",
      "name": "按负责人循环",
      "config": {
        "loop_mode": "sequential",
        "data_source": {
          "type": "find_records_column",
          "node_id": "<find_records 节点 ID>",
          "field_id": "fld_member"
        },
        "max_iterations": 100,
        "error_handling": "skip",
        "empty_result_action": "skip",
        "loop_body_nodes": [
          {
            "id": "body-send-email-1",
            "node_type": "send_email",
            "name": "发送任务提醒",
            "config": {
              "to_email": "{{loop.current_data.email}}",
              "to_name": "{{loop.current_data.name}}",
              "template_key": "task_reminder",
              "template_data": {
                "user_name": "{{loop.current_data.name}}",
                "task_count": "{{loop.total}}"
              }
            },
            "order": 0,
            "next_nodes": []
          }
        ]
      },
      "order": 2,
      "next_nodes": []
    }
  ]
}
```

#### Execution Flow

1. The trigger fires and the workflow instance starts.
2. The `find_records` node executes, querying records with status "In Progress", and stores the result in `instance.context["records"]`.
3. The `loop` node executes:
   - Data source type is `find_records_column`, extracting the value of the `fld_member` field from the record list.
   - The member list is automatically deduplicated (by the `id` field), yielding 3 unique members.
   - `data_array = [{id:"u1", name:"张三", email:"zhang@example.com"}, {id:"u2", name:"李四", email:"li@example.com"}, {id:"u3", name:"王五", email:"wang@example.com"}]`.
   - Iterate 3 times in order, setting `loop_context` and executing the `send_email` node each time.
4. The loop ends, returns `{next_nodes: []}`, and the workflow completes.

#### Output Result

Execution log record:

```json
{
  "total_iterations": 3,
  "success_count": 3,
  "failure_count": 0,
  "early_terminated": false
}
```

Email sending result: Zhang San, Li Si, and Wang Wu each receive 1 task reminder email.

---

### 5.2 Case 2: Batch Record Archiving

#### Scenario Description

Find all requirement records with status "Launched" from the requirements progress table, copy them to the archive table one by one, and map fields such as requirement name, owner, and source.

#### Configuration Code

```json
{
  "name": "需求归档工作流",
  "nodes_config": [
    {
      "node_type": "trigger",
      "name": "触发",
      "config": {},
      "order": 0
    },
    {
      "node_type": "find_records",
      "name": "查找已上线需求",
      "config": {
        "target_table_id": "tbl_progress",
        "conditions": [
          {
            "field_id": "fld_req_status",
            "operator": "equals",
            "value": "已上线"
          }
        ],
        "conjunction": "and",
        "result_variable": "records"
      },
      "order": 1
    },
    {
      "node_type": "loop",
      "name": "逐条归档",
      "config": {
        "loop_mode": "sequential",
        "data_source": {
          "type": "find_records_all",
          "node_id": "<find_records 节点 ID>"
        },
        "max_iterations": 100,
        "error_handling": "skip",
        "empty_result_action": "skip",
        "loop_body_nodes": [
          {
            "id": "body-create-1",
            "node_type": "create_record",
            "name": "创建归档记录",
            "config": {
              "target_table_id": "tbl_archive",
              "field_mappings": [
                {
                  "target_field_id": "fld_arc_name",
                  "source_field_id": "",
                  "value_template": "{{loop.current_data.fld_req_name}}"
                },
                {
                  "target_field_id": "fld_arc_owner",
                  "source_field_id": "",
                  "value_template": "{{loop.current_data.fld_req_owner}}"
                },
                {
                  "target_field_id": "fld_arc_source",
                  "source_field_id": "",
                  "value_template": "需求进度表"
                }
              ]
            },
            "order": 0,
            "next_nodes": []
          }
        ]
      },
      "order": 2,
      "next_nodes": []
    }
  ]
}
```

#### Execution Flow

1. The trigger fires and the workflow instance starts.
2. The `find_records` node executes, querying 5 requirement records with status "Launched".
3. The `loop` node executes:
   - Data source type is `find_records_all`, using the record array directly.
   - `data_array` contains 5 complete record dictionaries.
   - Round 1: `loop_context = {current_data: records[0], index: 0, round: 1, total: 5}`.
     - Create archive record; name from `{{loop.current_data.fld_req_name}}`, owner from `{{loop.current_data.fld_req_owner}}`, source fixed to "需求进度表".
   - Rounds 2-5: same as above, creating archive records one by one.
4. The loop ends; 5 archive records have been created.

#### Output Result

Execution log record:

```json
{
  "total_iterations": 5,
  "success_count": 5,
  "failure_count": 0,
  "early_terminated": false
}
```

5 new records are added to the archive table, with field values corresponding to the requirements in the progress table one by one.

---

### 5.3 Case 3: Webhook Calls Inside the Loop Body

#### Scenario Description

Find records waiting to be synchronized and call an external API one by one to push data to a third-party system. The Webhook request body needs to include the current record data and loop round information.

#### Configuration Code

```json
{
  "name": "数据同步工作流",
  "nodes_config": [
    {
      "node_type": "trigger",
      "name": "触发",
      "config": {},
      "order": 0
    },
    {
      "node_type": "find_records",
      "name": "查找待同步记录",
      "config": {
        "target_table_id": "tbl_orders",
        "conditions": [
          {
            "field_id": "fld_sync_status",
            "operator": "equals",
            "value": "待同步"
          }
        ],
        "conjunction": "and",
        "result_variable": "records"
      },
      "order": 1
    },
    {
      "node_type": "loop",
      "name": "逐条推送",
      "config": {
        "loop_mode": "sequential",
        "data_source": {
          "type": "find_records_all",
          "node_id": "<find_records 节点 ID>"
        },
        "max_iterations": 50,
        "error_handling": "skip",
        "empty_result_action": "skip",
        "loop_body_nodes": [
          {
            "id": "body-webhook-1",
            "node_type": "webhook",
            "name": "推送至外部系统",
            "config": {
              "inline_webhook": {
                "url": "https://api.example.com/orders/sync",
                "method": "POST",
                "headers": [
                  {"key": "Content-Type", "value": "application/json"},
                  {"key": "X-Auth-Token", "value": "secret-token"}
                ],
                "body_template": "{\"order_id\": \"{{loop.current_data.fld_order_id}}\", \"amount\": {{loop.current_data.fld_amount}}, \"sync_round\": {{loop.round}}, \"sync_index\": {{loop.index}}, \"total_batches\": {{loop.total}}}"
              }
            },
            "order": 0,
            "next_nodes": []
          }
        ]
      },
      "order": 2,
      "next_nodes": []
    }
  ]
}
```

#### Execution Flow

1. The trigger fires and the workflow instance starts.
2. The `find_records` node executes and finds 3 records waiting to be synchronized.
3. The `loop` node executes:
   - Data source type is `find_records_all`; `data_array` contains 3 records.
   - When building Webhook event data, the system automatically passes `loop_context` into the rendering context to ensure template variables such as `{{loop.current_data}}` are available.
   - Round 1 (`index=0, round=1`): send a POST request whose body contains the current record data and round information.
   - Round 2 (`index=1, round=2`): process the next record.
   - Round 3 (`index=2, round=3`): process the last record.
4. The loop ends; all 3 records have been pushed.

#### Output Result

Round 1 Webhook request body (after template rendering):

```json
{
  "order_id": "ORD-2026-001",
  "amount": 1500.00,
  "sync_round": 1,
  "sync_index": 0,
  "total_batches": 3
}
```

Execution log record:

```json
{
  "total_iterations": 3,
  "success_count": 3,
  "failure_count": 0,
  "early_terminated": false
}
```

---

## Chapter 6: Common Issues and Solutions

### 6.1 Loop Body Not Executed

**Symptom**: After the workflow reaches the Loop node, the loop body child nodes are not executed, and `total_iterations` in the log is 0.

**Common cause**: The data source type is misconfigured. For example, you expect to iterate over all records but use the `find_records_column` type, which only extracts the value of a specified field. If the extracted field value is empty (no data or wrong field ID), `data_array` will be empty.

**Solution**:

- If you need to iterate over complete records, change `data_source.type` to `find_records_all`.
- If you use `find_records_column`, confirm that `field_id` is correct and the corresponding field actually has values.
- Check the `skipped_reason` field in the diagnostic log to confirm whether it is `data_array_empty`.

### 6.2 Empty Loop Data

**Symptom**: The Loop node log contains `skipped_reason: "data_array_empty"` in `output_result`.

**Common causes**:

- The upstream `find_records` node did not find any records.
- The node ID pointed to by `data_source.node_id` does not exist or is incorrect.
- The field pointed to by `data_source.field_id` does not exist in the record or its value is empty.
- The trigger record field value for the `trigger_field` type is empty.

**Solution**:

- Check whether the filter conditions of the upstream `find_records` node are too strict.
- Confirm the correctness of `node_id` and `field_id`.
- If empty data is a normal case, set `empty_result_action` to `"skip"` to skip the loop and continue the main chain.

### 6.3 Template Variables Not Resolved

**Symptom**: In the Webhook request body or Create Record field values, `{{loop.current_data.xxx}}` is not replaced and the original template string remains.

**Common causes**:

- The current node is not inside a loop body (not a child of a Loop node), so `loop_context` does not exist.
- `loop_context` is not correctly passed into the rendering context.

**Solution**:

- Confirm that the node using the template variable is indeed located in the `loop_body_nodes` of a Loop node.
- In the frontend configuration panel, only nodes inside a loop body display the "Insert Loop Variable" button (the `LoopVarInserter` component). If it is not displayed, the current node is not inside a loop body.
- Check whether `loop_context` is included in `instance.context`.

### 6.4 Nested Loop Context Overwriting

**Symptom**: In a nested loop, after the inner loop executes, the outer loop's template variables resolve to inner data.

**Common cause**: This issue has been resolved in the current implementation through the context recovery mechanism in the `finally` block.

**Mechanism description**:

The `_execute_loop_body()` method saves the outer `loop_context` before entering the loop body and restores it in the `finally` block:

```python
context = instance.context or {}
outer_loop_context = context.get('loop_context')  # Save outer context

context['loop_context'] = { ... }  # Set inner context

try:
    # Execute loop body
finally:
    context['loop_context'] = outer_loop_context  # Restore outer context
```

If context overwriting still occurs, it may be because an exception was swallowed causing the `finally` block not to execute correctly. Check the exception handling chain.

### 6.5 Maximum Iterations Reached

**Symptom**: The actual data volume is larger than `max_iterations`, and some data is not processed.

**Common cause**: The default value of `max_iterations` is 100. If the array returned by the data source is longer than this value, the loop stops after reaching the upper limit.

**Solution**:

- Adjust `max_iterations` according to the actual data volume (range 1-1000).
- Note: the system clamps `max_iterations` to the `[1, 1000]` range; values outside this range are automatically truncated.

### 6.6 Loop Body Node Type Not Allowed

**Symptom**: A validation error is returned when creating or updating the workflow: `Conditional branch nodes are not supported inside a loop body`.

**Common cause**: A node of type `condition` was added to `loop_body_nodes`.

**Solution**:

- Remove the `condition` node from the loop body.
- If conditional logic is needed, consider using a conditional branch in the main workflow chain (outside the loop), or use the conditional callback mechanism of the Webhook node.

---

## Appendix: Loop Body Template Variable Cheat Sheet

| Variable | Type | Description | Applicable Data Source |
|----------|------|-------------|------------------------|
| `{{loop.current_data}}` | Any | Complete data item of the current iteration | All types |
| `{{loop.current_data.field_id}}` | Any | Specified field value of the current record (field drilling) | Only `find_records_all` |
| `{{loop.index}}` | int | Current iteration index (starting from 0) | All types |
| `{{loop.round}}` | int | Current iteration round (starting from 1) | All types |
| `{{loop.total}}` | int | Total number of iterations for this loop | All types |
| `{{record}}` | dict | Complete field values of the trigger record | All types |
| `{{record.field_id}}` | Any | Specified field value of the trigger record | All types |
| `{{event}}` | dict | Trigger event data | All types |
| `{{workflow}}` | dict | Current workflow information | All types |
| `{{instance}}` | dict | Current workflow instance information | All types |

> **Field drilling note**: `{{loop.current_data.field_id}}` is only available when the data source is `find_records_all`, because in this case `current_data` is a complete record dictionary containing all fields. For other data source types (`find_records_column`, `trigger_field`, `webhook_array`), `current_data` is a single value and does not support drilling. The frontend `LoopVarInserter` component automatically controls the display of field drilling options based on the data source type.
