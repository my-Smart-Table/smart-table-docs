# Custom Script Node Guide

## 1. Document Overview

### 1.1 What Is a Custom Script Node

The Custom Script node (Script Node) is a fine-grained action node in the SmartTable workflow engine. It allows users to write and run custom **Python** code during workflow execution. The script runs in a restricted sandbox environment, can access output data from upstream nodes and the workflow context, produces a standardized result that is passed downstream, and supports branch routing based on the script's return value.

Compared with fixed-function nodes (such as Find Records, Send Email, and Update Record), the Script node offers the greatest flexibility and can express complex data transformation, cleaning, aggregation, and dynamic conditional logic.

### 1.2 Application Scenarios

| Scenario Category | Typical Use Cases |
|-------------------|-------------------|
| Data transformation | Field renaming, structural adjustment, unit conversion, format standardization |
| Data cleaning | Null handling, deduplication, regex validation and correction |
| Aggregation and statistics | Sum, average, grouped statistics, percentile calculation |
| Conditional branches | Routing decisions based on complex business rules (multi-condition combinations, threshold judgment) |
| Field extraction | Extract specific fields from nested JSON, flatten structures |
| Data enrichment | String splicing, UUID generation, hash calculation, date formatting |

### 1.3 Value and Positioning

- **Fill functional gaps**: When fixed nodes cannot express complex logic, the Script node is the fallback solution.
- **Reduce development cost**: Customized business logic can be implemented without modifying backend code.
- **Sandbox security**: Subprocess isolation and a whitelist module mechanism ensure scripts do not harm system security.
- **Testability**: An independent test execution interface is provided to verify script logic during configuration.

### 1.4 Target Audience and Prerequisites

**Target audience**:

- Workflow designers (business analysts, product managers)
- Data processing personnel with basic programming skills
- Developers who need to implement complex business logic

**Prerequisites**:

| Knowledge Area | Required Level | Description |
|----------------|----------------|-------------|
| Python | Basic | Understand variables, conditions, loops, functions, and dictionary operations |
| JSON data format | Familiar | Understand JSON objects, arrays, and nested structures |
| SmartTable workflow basics | Basic | Familiar with triggers, nodes, execution instances, and other basic concepts |
| Workflow canvas operations | Familiar | Able to add nodes, connect nodes, and configure node parameters |

### 1.5 Runtime Prerequisites

| Runtime Environment | Requirement | Description |
|---------------------|-------------|-------------|
| Python scripts | Python 3.8+ | Bundled with the backend service; no additional installation required |

---

## 2. Basic Usage Guide

### 2.1 Script Creation Process

#### 2.1.1 Adding a Script Node

1. On the workflow canvas, click the "+" button between nodes or the "Add Node" button on the blank canvas.
2. Select "Custom Script" from the node type list.
3. The node will appear on the canvas with a `Cpu` icon and the default name "Custom Script".

<img src="/images/user-guide/basic-features/self-sript.jpeg" alt="Custom script node configuration panel" style="max-width: 100%; border: 1px solid #e0e0e0; border-radius: 4px;">

#### 2.1.2 Script Storage Location

The script source code is not stored as a separate file. Instead, it is saved directly in the `config` JSON field of the `workflow_nodes` table, persisted together with other node configurations. The storage structure is as follows:

```
workflow_nodes
├── id: node UUID
├── node_type: 'script'
├── name: 'Custom script node name'
└── config: {
    "language": "python",                 # Script language
    "script_source": "set_result(42)",    # Script source code
    "timeout": 30,                        # Timeout in seconds
    "result_variable": "script_result",   # Result variable name
    "input_node_id": null,                # Input source node ID
    "branches": []                        # Branch routing configuration
  }
```

#### 2.1.3 Naming Conventions

- **Node name**: Use business-semantic naming such as "Calculate Order Total" or "Clean User Data". Avoid meaningless names such as "Script 1" or "Script Node".
- **Result variable name**: Use lower camelCase or snake_case to reflect the output meaning, such as `total_amount` or `cleanedRecords`. Avoid the default `script_result`.

### 2.2 Basic Syntax Rules and Core API

#### 2.2.1 Python Script Core API

The script runs in a restricted global namespace and can access the following injected variables and functions:

```python
# === Injected variables ===
input       # Output from the upstream node (any JSON value: dict / list / scalar)
context     # Workflow context dictionary
            #   context['trigger']      trigger event data
            #   context['record']       trigger record data
            #   context['instance']     workflow instance information
            #   context['workflow']     workflow configuration
            #   context['loop']         loop context (only available inside a loop body)
            #   context['node_outputs'] dictionary of outputs from all preceding nodes

# === Injected functions ===
set_result(value)   # Set the script output result (recommended)
set_branch(label)   # Declare a branch label for branch routing
result              # Alternative: assigning directly to the result variable is also treated as output
```

**Minimal example**:

```python
# Return a fixed value directly
set_result({"message": "Hello, SmartTable!", "code": 200})
```

**Reading input example**:

```python
# Assume the upstream find_records node outputs {records: [...], count: N}
data = input or {}
records = data.get('records', []) if isinstance(data, dict) else []
set_result({
    "total": len(records),
    "first_id": records[0].get('id') if records else None
})
```

#### 2.2.2 Whitelist Modules

**Python whitelist modules** (11 in total):

| Module | Purpose | Common APIs |
|--------|---------|-------------|
| `json` | JSON encoding/decoding | `json.loads`, `json.dumps` |
| `re` | Regular expressions | `re.match`, `re.sub`, `re.findall` |
| `math` | Mathematical operations | `math.ceil`, `math.floor`, `math.sqrt` |
| `datetime` | Date and time | `datetime.now`, `datetime.strptime` |
| `decimal` | Precise decimals | `decimal.Decimal` |
| `collections` | Container extensions | `collections.Counter`, `collections.defaultdict` |
| `itertools` | Iteration tools | `itertools.chain`, `itertools.groupby` |
| `hashlib` | Hash algorithms | `hashlib.md5`, `hashlib.sha256` |
| `base64` | Base64 encoding | `base64.b64encode`, `base64.b64decode` |
| `uuid` | UUID generation | `uuid.uuid4`, `uuid.uuid1` |
| `statistics` | Statistical functions | `statistics.mean`, `statistics.median` |

#### 2.2.3 Disabled Capabilities

**Python sandbox restrictions**:

| Category | Disabled Items | Reason |
|----------|----------------|--------|
| File I/O | `open()`, `input()` | Prevent reading/writing the file system |
| Code execution | `exec()`, `eval()`, `compile()` | Prevent dynamic execution of arbitrary code |
| Module import | `__import__('os')` and other dangerous modules | Prevent access to system resources |
| Introspection | `globals()`, `locals()`, `vars()` | Prevent sandbox escape |
| Exit | `exit()`, `quit()` | Prevent terminating the main process |

### 2.3 Execution Methods and Environment Requirements

#### 2.3.1 Execution Methods

The Script node supports two execution modes:

**Production execution** (when the workflow instance runs):

- Scheduled by the workflow execution engine
- Calls `ScriptExecutionService.execute()`
- Executed in an isolated subprocess (Python uses `subprocess`)
- Result is written to `instance.context[<result_variable>]` and `instance.context['node_outputs'][<node_id>]`
- Produces an execution log (`WorkflowExecutionLog`)

**Test execution** (configuration-stage validation):

- Triggered by the "Test Run" button in the configuration panel
- Calls the `POST /api/v1/workflows/<workflow_id>/nodes/script/test` endpoint
- Not persisted; does not create a workflow instance or execution log
- Input is sample JSON data provided by the user

#### 2.3.2 Subprocess Isolation Architecture

```
┌─────────────────────────────────────────────────────────┐
│  Flask main process (Python)                            │
│  ┌──────────────────────────────────────────────────┐   │
│  │  WorkflowExecutionEngine._execute_script_node    │   │
│  │       ↓                                          │   │
│  │  ScriptExecutionService.execute()                │   │
│  │       ↓ subprocess.run (timeout control)         │   │
│  └──────────────────────────────────────────────────┘   │
│         ↓                                               │
│  ┌──────────────────────────────────────────────────┐   │
│  │  Python: python_runner.py                        │   │
│  │  - Read {script_source, input, ctx} from stdin   │   │
│  │  - Restricted builtins + safe_import             │   │
│  │  - exec() executes user code                     │   │
│  │  - Output JSON to stdout                         │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

#### 2.3.3 Environment Requirements

| Configuration Item | Requirement | Verification Method |
|--------------------|-------------|---------------------|
| Python | ≥ 3.8, usually bundled with the backend service | `python --version` |

### 2.4 Debugging Methods and Common Troubleshooting

#### 2.4.1 Debugging Process

```
Configure script → Click "Test Run" → View result/error feedback → Modify script → Test again → Save after confirmation
```

**Debugging steps**:

1. **Prepare sample input**: Fill simulated upstream data into the "Sample Input (JSON)" text box.
2. **Click Test Run**: Observe the status, return value, error stack, and execution duration displayed in the result area.
3. **View error information**: When it fails, the error stack displays the exception type, message, and traceback (including line numbers).
4. **Narrow down step by step**: Use `set_result` to output intermediate variables to locate the issue.

#### 2.4.2 Common Troubleshooting

| Issue | Possible Cause | Solution |
|-------|----------------|----------|
| `NameError: name 'open' is not defined` | Called a disabled built-in function | Use a whitelist module or adjust logic |
| `ImportError: module 'os' is forbidden` | Imported a non-whitelist module | Use only the 11 whitelist modules |
| `Script execution timed out (30 seconds)` | Infinite loop or long-running processing | Optimize algorithm, increase timeout, or reduce data volume |
| `Script output exceeds 1MB limit` | Returned an overly large data structure | Return only necessary fields; avoid returning raw big data |
| `Script output is not JSON serializable` | Returned functions, class instances, or other non-JSON types | Return only basic types such as dict/list/scalar |
| Test passes but production execution fails | Input data structure differs from the sample | Check the actual output structure of the upstream node |

---

## 3. Configuration System Details

### 3.1 Configuration File Structure

The complete configuration of the Script node is stored in the `WorkflowNode.config` JSON field with the following structure:

```json
{
  "language": "python",
  "script_source": "set_result(input)",
  "timeout": 30,
  "result_variable": "script_result",
  "input_node_id": null,
  "branches": [
    {
      "label": "high_priority",
      "target_node_id": "node-uuid-xxx"
    }
  ]
}
```

### 3.2 Configuration Field Description

| Field | Type | Required | Default | Range | Description |
|-------|------|----------|---------|-------|-------------|
| `language` | string | Yes | - | `"python"` | Script language |
| `script_source` | string | Yes | - | Non-empty, ≤ 50000 characters | Script source code |
| `timeout` | number | No | `30` | Positive integer 1 ~ 300 | Execution timeout in seconds |
| `result_variable` | string | No | `"script_result"` | `^[a-zA-Z_][a-zA-Z0-9_]{0,63}$` | Result variable name |
| `input_node_id` | string \| null | No | `null` | Existing node UUID | Input source node ID |
| `branches` | array | No | `[]` | See table below | Branch routing configuration |

**Branches sub-item structure**:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `label` | string | Yes | Branch label (referenced in the script via `set_branch('label')`; unique within the same node) |
| `target_node_id` | string | Yes | Target node ID (must exist in the same workflow) |

### 3.3 Configuration Type Definitions

**Frontend TypeScript types** (`src/types/workflow.ts`):

```typescript
export type ScriptLanguage = 'python';

export interface ScriptBranch {
  /** Branch label (referenced in the script via set_branch(label)) */
  label: string;
  /** Target node ID */
  target_node_id: string;
}

export interface ScriptNodeConfig {
  /** Script language: python */
  language: ScriptLanguage;
  /** Script source code (≤ 50000 characters) */
  script_source: string;
  /** Execution timeout in seconds (1-300, default 30) */
  timeout: number;
  /** Result variable name (default script_result; downstream can reference via {{<result_variable>.field}}) */
  result_variable: string;
  /** Input source node ID (defaults to output of the most recent predecessor when omitted) */
  input_node_id?: string | null;
  /** Branch routing configuration */
  branches: ScriptBranch[];
}
```

### 3.4 Configuration Validation Rules

The backend `WorkflowService._validate_script_node` performs validation when a workflow is created or updated, returning a 400 error on failure:

| Validation Item | Rule | Example Error Message |
|-----------------|------|-----------------------|
| `language` | Must be `'python'` | "Script language must be 'python'" |
| `script_source` | Non-empty string | "Script content cannot be empty" |
| `script_source` length | ≤ 50000 characters | "Script content cannot exceed 50000 characters" |
| `timeout` | Positive integer between 1 and 300 (boolean excluded) | "Timeout must be a positive integer between 1 and 300" |
| `result_variable` | Matches `^[a-zA-Z_][a-zA-Z0-9_]{0,63}$` | "Result variable name must start with a letter or underscore and contain only letters, digits, and underscores (≤ 64 characters)" |
| `branches.label` | Non-empty, unique | "Duplicate branch label: high_priority" |
| `branches.target_node_id` | Non-empty, exists in the workflow node set | "Target node of branch high_priority does not exist: xxx" |

### 3.5 Configuration Inheritance and Priority Rules

The Script node configuration does not involve inheritance; all configuration items are independent at the node level. However, the **input source** follows the priority rules below:

```
Explicit input_node_id  >  Output of the most recent predecessor  >  Merged dictionary of multiple predecessors  >  None
```

| Scenario | Behavior |
|----------|----------|
| `input_node_id` specified | `input` = the node's `output_result` |
| `input_node_id` empty, single predecessor | `input` = the predecessor node's `output_result` |
| `input_node_id` empty, multiple predecessors | `input` = dictionary `{ "<node_id_1>": <output_1>, "<node_id_2>": <output_2>, ... }` |
| No predecessor | `input` = `null` |

### 3.6 Difference Between Dynamic and Static Configuration

| Configuration Type | Description | Example |
|--------------------|-------------|---------|
| **Static configuration** | Determined when the node is saved; immutable at runtime | `language`, `script_source`, `timeout`, `result_variable`, `branches` |
| **Dynamic data** | Injected from the workflow context at runtime | `input` (upstream output), `context.trigger`, `context.record`, `context.loop` |

**Key differences**:

- Static configuration is validated when the workflow is saved; dynamic data is injected at runtime.
- Scripts access dynamic data by reading `input` and `context`; static configuration cannot be modified.
- During test execution, `input` comes from user-provided sample JSON and `context` is a minimal context.

---

## 4. Node Usage Tutorial

### 4.1 Core Node Types and Function Description

The Script node is an ordinary action node (non-container) on the workflow canvas, at the same level as nodes such as `find_records`, `send_email`, and `update_record`. The node card displays:

- **Icon**: `Cpu` icon
- **Node type tag**: `Custom Script`
- **Node name**: Editable (can be edited in any state)

### 4.2 Node Parameter Configuration Details

The configuration panel contains the following areas (from top to bottom):

#### 4.2.1 Node Name

Supports editing in any state. Click the edit icon to enter edit mode, press Enter to save, and press Esc to cancel.

#### 4.2.2 Script Language

The Script node uses Python as the fixed script language; no selection is required in the configuration panel.

#### 4.2.3 Script Code Editor

A CodeMirror 6-based code editor provides:

- Syntax highlighting (Python)
- Line numbers
- Indentation assistance
- Bracket matching
- Basic error hints (lint gutter)

The editor toolbar contains an "Insert Template" dropdown button. Clicking it displays a list of common templates for the current language; selecting a template appends the code to the end of the current script.

#### 4.2.4 Timeout (Seconds)

A numeric input box with a range of 1-300 and a default of 30. Scripts that do not complete within the set time will be forcibly terminated.

#### 4.2.5 Result Variable Name

A text input box with the default `script_result`. Downstream nodes can reference the script output via `{{<result_variable>.field}}`.

The **hint text** dynamically displays how to reference the current variable name, for example: `Downstream nodes can reference script output via {{total_amount.field}}`.

#### 4.2.6 Input Source

A dropdown selector with the following options:

- **Previous Node Output (default)**: automatically uses the output of the most recent predecessor node
- **Specified Node**: select one node from the workflow as the input source

#### 4.2.7 Branch Routing Configuration

Multiple branch rules can be added. Each rule contains:

- **Branch label**: the label name referenced in the script via `set_branch('label')`
- **Target node**: selected from all nodes in the workflow; execution routes to this node

Click the "Add Branch" button to add a rule, and click the delete icon to remove one.

#### 4.2.8 Test Run Area

Contains:

- **Sample Input (JSON)**: text area for filling in simulated upstream data
- **Test Run Button**: click to trigger test execution
- **Result Feedback Area**: displays execution status (success/failure), return result (collapsible JSON), error stack, execution duration, and stdout output

### 4.3 Inter-Node Data Flow Mechanism

#### 4.3.1 Data Flow Architecture

```
┌─────────────────────────────────────────────────────────────┐
│  Workflow instance context (instance.context)               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  node_outputs: {                                    │    │
│  │    "node-A-id": { result: ..., branch: ..., ... },  │    │
│  │    "node-B-id": { result: ..., branch: ..., ... },  │    │
│  │    "script-node-id": { result: <script output>, branch: ... }│   │
│  │  }                                                  │    │
│  │  script_result: <script output>  # result variable directly written │    │
│  │  loop_context: { ... }           # loop context     │    │
│  │  record: { ... }                 # trigger record   │    │
│  │  trigger_event: { ... }          # trigger event    │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

#### 4.3.2 Input Injection

When the script is executed, the engine resolves the input data through `_resolve_script_input` and injects it into the script's global scope as the `input` variable.

#### 4.3.3 Output Writing

After the script sets the output via `set_result(value)`, the engine performs the following writes:

1. **Result variable write**: `instance.context[<result_variable>] = value`
2. **Node output write**: `instance.context['node_outputs'][<node_id>] = { result: value, branch: <label>, duration_ms: <int> }`
3. **Execution log write**: `execution_log.output_result = { result, branch, duration_ms, next_nodes }`

#### 4.3.4 Downstream Reference Methods

Downstream nodes can reference script output in two ways:

**Method 1: Reference via result variable name (recommended)**

```
{{script_result.field_name}}
```

Applicable when the Script node's `result_variable` is the default `script_result` or a custom name. The engine exposes non-reserved keys in `instance.context` to the top level of the rendering context.

**Method 2: Reference via node_outputs**

```
{{node_outputs.<script_node_id>.result.field_name}}
```

Applicable when you need to reference the output of any preceding node (not only the direct predecessor). `<script_node_id>` is the UUID of the Script node.

#### 4.3.5 Execution Inside a Loop Body

The Script node can be used as a child node of a loop body. In this case, `context.loop` contains loop iteration data:

```python
current = context['loop']['current_data']  # current iteration data
index = context['loop']['index']           # current index (0-based)
round_num = context['loop']['round']       # current round (1-based)
total = context['loop']['total']           # total iterations
```

### 4.4 Node Error Handling and Retry Strategy

#### 4.4.1 Error Handling Flow

```
Script execution fails
    ↓
_execute_script_node returns {status: 'error', error_message: ...}
    ↓
execute_node detects status='error'
    ↓
├── execution_log.status = 'error'
├── execution_log.error_message = error message (including traceback)
├── error_message written to node_outputs for downstream reference
    ↓
Check node.config.continue_on_error
    ├── true  → return error result, workflow continues to the next node
    └── false → raise RuntimeError, terminating the workflow instance
```

#### 4.4.2 Retry Mechanism

Nodes support the `max_retries` configuration (set in `node.config`, not exclusive to Script nodes):

- Default `max_retries = 0`; failure terminates immediately
- When `max_retries = N` is set, automatic retries occur up to N times after failure
- Retries do not re-execute the entire workflow; only the current node is retried

#### 4.4.3 Branch Routing Rules

| Script Behavior | Routing Result |
|-----------------|----------------|
| `set_branch('label')` and label exists in `branches` config | Route to the corresponding `target_node_id` (unique next_nodes) |
| `set_branch('unknown')` but label is not in config | Fall back to default `next_nodes`; a warning is logged |
| `set_branch` not called | Use default `next_nodes` (standard sequential flow) |
| Default `next_nodes` is empty | Workflow execution chain ends normally |

---

## 5. Classic Use Cases

### 5.1 Case 1: Order Data Cleaning and Grading

**Scenario**: After obtaining order records from a Find Records node, you need to clean null values, calculate order levels, and route to different processing nodes by amount.

**Workflow orchestration**:

```
Trigger → Find order records → Custom Script (clean + grade) → Branch routing
                                                    ├── High priority → Urgent processing node
                                                    ├── Normal order → Regular processing node
                                                    └── Default      → Archive node
```

**Script configuration**:

- **Language**: Python
- **Result variable name**: `cleaned_order`
- **Branch routing**:
  - `high` → urgent processing node
  - `normal` → regular processing node

**Script code**:

```python
import re
from datetime import datetime

# Read upstream find_records output
data = input or {}
records = data.get('records', []) if isinstance(data, dict) else []

cleaned = []
total_amount = 0

for record in records:
    # Clean amount: remove currency symbols and commas
    raw_amount = record.get('amount', '0')
    if isinstance(raw_amount, str):
        amount_str = re.sub(r'[¥$,]', '', raw_amount)
        try:
            amount = float(amount_str)
        except ValueError:
            amount = 0.0
    else:
        amount = float(raw_amount or 0)

    # Clean customer name: remove leading and trailing spaces
    customer_name = (record.get('customer_name') or '').strip()

    # Clean order date: standardize to ISO format
    raw_date = record.get('order_date', '')
    try:
        parsed_date = datetime.strptime(raw_date, '%Y/%m/%d')
        iso_date = parsed_date.strftime('%Y-%m-%d')
    except (ValueError, TypeError):
        iso_date = None

    cleaned_record = {
        'id': record.get('id'),
        'customer_name': customer_name,
        'amount': round(amount, 2),
        'order_date': iso_date,
        'status': record.get('status', 'unknown')
    }
    cleaned.append(cleaned_record)
    total_amount += amount

# Calculate average amount and determine priority
avg_amount = total_amount / len(cleaned) if cleaned else 0

# Branch decision: a single maximum amount more than 2x the average and greater than 10000 is high priority
max_amount = max((r['amount'] for r in cleaned), default=0)
if max_amount > avg_amount * 2 and max_amount > 10000:
    set_branch('high')
elif cleaned:
    set_branch('normal')

# Output cleaned data
set_result({
    'records': cleaned,
    'total_amount': round(total_amount, 2),
    'avg_amount': round(avg_amount, 2),
    'max_amount': round(max_amount, 2),
    'count': len(cleaned)
})
```

**Key technical points**:

1. Use the `re` whitelist module for regex cleaning.
2. Use the `datetime` whitelist module to standardize date formats.
3. Implement dynamic routing based on business rules via `set_branch`.
4. Output structured data for downstream nodes to reference via `{{cleaned_order.records}}`.

**Execution effect**:

- Input: 100 order records; execution duration about 50ms
- Output contains the cleaned record array and statistics
- Orders more than 2x the average and greater than 10000 route to the "High Priority" branch

**Performance optimization suggestions**:

- Avoid calling `set_result` frequently in loops; a single final call is sufficient.
- For large data volumes, consider batch processing or returning only necessary fields.

### 5.2 Case 2: Data Aggregation and Statistics

**Scenario**: Group and aggregate a batch of product sales records by category, calculate sales quantity, total sales amount, average unit price, and median unit price for each category, and mark category tiers to facilitate subsequent report display and operational decision-making.

**Workflow orchestration**:

```
Trigger → Find sales records → Custom Script (aggregate + statistics) → Update statistics report node
```

**Script configuration**:

- **Language**: Python
- **Result variable name**: `category_stats`
- **Input source**: Find sales records node

**Script code**:

```python
import statistics
from collections import defaultdict
from itertools import groupby

# Read upstream find_records output
data = input or {}
records = data.get('records', []) if isinstance(data, dict) else []

# Group by category (use defaultdict to accumulate sales amount and price list)
category_sales = defaultdict(lambda: {'count': 0, 'total': 0.0, 'prices': []})

for record in records:
    category = (record.get('category') or '未分类').strip()
    price = float(record.get('price', 0) or 0)
    quantity = int(record.get('quantity', 1) or 1)

    bucket = category_sales[category]
    bucket['count'] += quantity
    bucket['total'] += price * quantity
    bucket['prices'].extend([price] * quantity)

# Calculate statistics for each category
stats = []
for category, info in sorted(category_sales.items()):
    prices = info['prices']
    avg_price = statistics.mean(prices) if prices else 0
    median_price = statistics.median(prices) if prices else 0

    # Category tier: total sales ≥ 10000 is A, ≥ 1000 is B, otherwise C
    if info['total'] >= 10000:
        tier = 'A'
    elif info['total'] >= 1000:
        tier = 'B'
    else:
        tier = 'C'

    stats.append({
        'category': category,
        'count': info['count'],
        'total_amount': round(info['total'], 2),
        'avg_price': round(avg_price, 2),
        'median_price': round(median_price, 2),
        'tier': tier
    })

# Global summary
grand_total = sum(s['total_amount'] for s in stats)
top_category = max(stats, key=lambda s: s['total_amount'], default=None)

set_result({
    'categories': stats,
    'category_count': len(stats),
    'grand_total': round(grand_total, 2),
    'top_category': top_category['category'] if top_category else None,
    'top_category_amount': top_category['total_amount'] if top_category else 0
})
```

**Key technical points**:

1. Use `collections.defaultdict` to automatically group and accumulate by category, avoiding manual null checks.
2. Use `statistics.mean` and `statistics.median` to calculate average and median unit prices.
3. Use `sorted` with the `groupby` concept to ensure stable category output order.
4. Mark tiers based on sales thresholds via the `tier` field, facilitating downstream report filtering.

**Execution effect**:

- Input: 500 sales records covering 8 categories; execution duration about 60ms
- Output contains sales quantity, total sales amount, average and median unit price, and category tier for each category
- Global summary and TOP category can be referenced downstream via `{{category_stats.grand_total}}` and `{{category_stats.top_category}}`

**Performance optimization suggestions**:

- Using `defaultdict` to accumulate data avoids frequent dictionary null checks and initialization overhead.
- For very large data volumes (> 10000 records), consider performing basic aggregation in the SQL layer first before handing statistics to the script.
- Median calculation requires the complete price list; if only an approximate value is needed, use percentile sampling to reduce memory usage.

### 5.3 Case 3: Data Processing and Field Extraction Inside a Loop Body

**Scenario**: While the Loop node iterates over each record, use a Script node to extract and transform fields of each record, and pass the result to a Webhook node inside the loop body to send notifications.

**Workflow orchestration**:

```
Trigger → Find order records → Loop node (iterate records)
                          ├── Custom Script (extract + transform) → Webhook node (send notification)
                          └── (loop ends) → Update statistics node
```

**Script configuration inside the loop body**:

- **Language**: Python
- **Result variable name**: `notification_payload`
- **Input source**: Previous node output (default)

**Script code**:

```python
import json
from datetime import datetime

# Read current iteration data of the loop
loop_ctx = context.get('loop') or {}
current_record = loop_ctx.get('current_data') or {}
iteration_index = loop_ctx.get('index', 0)
total_iterations = loop_ctx.get('total', 0)

# Extract and transform fields
order_id = current_record.get('id', '')
customer = current_record.get('customer_name', '未知客户')
amount = float(current_record.get('amount', 0))

# Format amount: keep two decimals and add currency symbol
formatted_amount = f"¥{amount:,.2f}"

# Generate notification summary
summary = f"Order {order_id}: {customer} purchase amount {formatted_amount}"

# Generate priority label based on amount level
if amount >= 10000:
    priority = 'critical'
    priority_text = '紧急'
elif amount >= 1000:
    priority = 'high'
    priority_text = '高'
else:
    priority = 'normal'
    priority_text = '普通'

# Build webhook notification payload
notification = {
    'order_id': order_id,
    'customer': customer,
    'amount': round(amount, 2),
    'formatted_amount': formatted_amount,
    'priority': priority,
    'priority_text': priority_text,
    'summary': summary,
    'iteration': {
        'current': iteration_index + 1,
        'total': total_iterations
    },
    'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
}

set_result(notification)
```

**Webhook node configuration inside the loop body**:

The Webhook node body template can reference the script output:

```json
{
  "text": "{{notification_payload.summary}}",
  "priority": "{{notification_payload.priority}}",
  "iteration": "{{notification_payload.iteration.current}}/{{notification_payload.iteration.total}}"
}
```

**Key technical points**:

1. Access the current iteration data of the loop via `context['loop']['current_data']`.
2. Use `context['loop']['index']` and `context['loop']['total']` to track progress.
3. Structured script output is referenced by the Webhook node via `{{notification_payload.field}}`.
4. The script in the loop body executes independently each iteration, producing independent execution logs.

**Execution effect**:

- Assume 50 order records; the loop executes the script 50 times.
- Each iteration takes about 10ms.
- The `notification_payload` of each iteration is sent directly as the Webhook request body.

**Performance optimization suggestions**:

- Keep scripts inside the loop body lightweight; avoid complex calculations.
- If all records require the same processing, consider batch processing outside the loop before entering it.
- Use `iteration_index` and `total` to implement progress tracking.

---

## 6. Best Practices

### 6.1 Code Standards and Style Guide

#### 6.1.1 Python Script Standards

```python
# ✅ Recommended: use set_result to make output explicit
data = input or {}
result = process(data)
set_result(result)

# ✅ Recommended: defensively handle null values and types
records = data.get('records', []) if isinstance(data, dict) else []

# ✅ Recommended: use whitelist modules instead of disabled features
import json  # replace eval(json_str)
parsed = json.loads(json_str)

# ❌ Avoid: calling disabled built-in functions
# open('file.txt')  # NameError
# exec('code')      # NameError
# import os         # ImportError

# ❌ Avoid: outputting non-serializable objects
# set_result(lambda x: x)  # cannot be JSON serialized
```

#### 6.1.2 General Standards

- **Single responsibility**: each Script node does only one thing; split complex logic into multiple Script nodes.
- **Clear naming**: result variable names should reflect business meaning; avoid the default `script_result`.
- **Defensive programming**: always handle cases where `input` is `null`, `undefined`, or has an unexpected type.
- **Avoid side effects**: scripts should not depend on external state; process input data in a pure-function style.

### 6.2 Performance Optimization Tips

| Optimization Scenario | Tip | Effect |
|-----------------------|-----|--------|
| Large data volume processing | Use generators or batch processing to avoid loading all data at once | Reduce memory peak |
| Complex lookups | Use `Set` instead of array `includes`/`in` operations | O(n) → O(1) |
| Regex precompilation | In Python, move `re.compile` outside the loop | Reduce repeated compilation overhead |
| Reduce output volume | Return only necessary fields; avoid returning raw big data | Avoid triggering the 1MB limit |
| Set timeout reasonably | Estimate duration based on data volume and set a timeout slightly larger than actual need | Avoid killing normal execution |
| Avoid set_result inside loops | Call `set_result` once after the loop ends | Reduce state write overhead |

### 6.3 Security Considerations

#### 6.3.1 Sandbox Boundaries

- **Subprocess isolation**: scripts execute in an independent subprocess; crashes do not affect the main process.
- **Whitelist modules**: only safe standard library modules can be imported; the file system, network, and subprocesses are inaccessible.
- **Restricted builtins**: dangerous functions such as `open`, `exec`, and `eval` are removed.
- **Timeout control**: long-running scripts are forcibly terminated to prevent resource exhaustion.
- **Output size limit**: execution is rejected if the serialized result exceeds 1MB.

#### 6.3.2 Script Writing Security Suggestions

```python
# ✅ Safe: use only whitelist modules
import json
import hashlib

# ❌ Dangerous: attempts to escape the sandbox will be intercepted
# __import__('os').system('rm -rf /')
# eval('__import__("subprocess").call(["ls"])')
```

- Do not try to bypass sandbox restrictions; all dangerous operations are intercepted and logged.
- Do not hard-code sensitive information (passwords, keys) in scripts; pass them through the workflow context.
- For untrusted input data, validate and clean it before processing.

### 6.4 Version Compatibility Handling

| Compatibility Dimension | Handling Scheme |
|-------------------------|-----------------|
| Python version | Scripts should be compatible with Python 3.8+; avoid features from 3.9+ (such as the `dict` merge operator `\|`) |
| Whitelist module changes | When the backend upgrades the whitelist, old scripts can still run (whitelist only expands) |
| Workflow version | Script node configuration is stored in the node config; workflow version snapshots fully preserve script content |
| Frontend compatibility | The node type `'script'` is a new enum value and does not affect loading and execution of old workflows |

---

## 7. Appendix

### 7.1 API Reference Manual

#### 7.1.1 Test Execution API

**Endpoint**: `POST /api/v1/workflows/<workflow_id>/nodes/script/test`

**Permission**: Requires workflow edit permission (`_check_base_edit_permission`)

**Request body**:

```json
{
  "language": "python",
  "script_source": "set_result(input)",
  "sample_input": {"key": "value"},
  "timeout": 30
}
```

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `language` | string | Yes | - | `"python"` |
| `script_source` | string | Yes | - | Script source code |
| `sample_input` | any | No | `null` | Simulated upstream input data |
| `timeout` | number | No | `30` | Timeout in seconds (1-300) |

**Response body**:

```json
{
  "status": "success",
  "result": {"key": "value"},
  "branch": null,
  "error": null,
  "duration_ms": 25,
  "stdout": ""
}
```

| Field | Type | Description |
|-------|------|-------------|
| `status` | string | `"success"` or `"error"` |
| `result` | any | Script output result (when successful) |
| `branch` | string \| null | Branch label (if `set_branch` was called) |
| `error` | string \| null | Error message (when failed, including traceback) |
| `duration_ms` | number | Execution duration in milliseconds |
| `stdout` | string | Script standard output (truncated to 5000 characters) |

**Characteristics**:

- Not persisted; does not create a workflow instance or execution log
- `context` is a minimal context (contains only data related to `sample_input`)
- `stdout` is truncated to 5000 characters

#### 7.1.2 Script Execution Service API (Internal)

**Invocation**: `ScriptExecutionService.execute(...)`

```python
from app.services.script_execution_service import ScriptExecutionService

result = ScriptExecutionService.execute(
    language='python',
    script_source='set_result(input)',
    input_data={'key': 'value'},
    context={'trigger': {}, 'record': {}, 'instance': {}, 'workflow': {}, 'loop': None, 'node_outputs': {}},
    timeout=30
)
```

**Return structure**: same as the test execution API response body.

### 7.2 Common Error Code Description

| Error Message | HTTP Status | Cause | Solution |
|---------------|-------------|-------|----------|
| `脚本语言必须为 'python'` | 400 | Illegal `language` field value | Check the language field |
| `脚本内容不能为空` | 400 | `script_source` is an empty string | Fill in the script code |
| `脚本内容不能超过 50000 字符` | 400 | Script is too long | Split into multiple nodes or simplify the code |
| `超时时间必须为 1-300 之间的正整数` | 400 | `timeout` is out of range | Adjust to an integer between 1 and 300 |
| `结果变量名必须为字母数字下划线...` | 400 | Illegal `result_variable` format | Use a valid variable name |
| `分支标签重复: xxx` | 400 | Duplicate labels in `branches` | Ensure labels are unique |
| `分支 xxx 的目标节点不存在: yyy` | 400 | `target_node_id` does not exist | Check the target node ID |
| `脚本执行超时（30秒）` | - | Script execution exceeded timeout | Optimize algorithm or increase timeout |
| `脚本输出超过 1MB 限制` | - | Serialized result exceeded 1MB | Simplify output data |
| `脚本输出无法 JSON 序列化` | - | Returned a non-JSON type | Return only basic types |
| `模块 'xxx' 被禁止导入` | - | Imported a non-whitelist module | Use only whitelist modules |
| `NameError: name 'open' is not defined` | - | Called a disabled built-in function | Use whitelist modules |

### 7.3 Toolchain and Ecosystem Integration

#### 7.3.1 Frontend Dependencies

| Dependency | Version | Purpose |
|------------|---------|---------|
| `codemirror` | 6.x | Code editor core |
| `@codemirror/lang-python` | 6.x | Python syntax support |
| `@codemirror/lint` | 6.x | Basic error hints (lint gutter) |
| `vue-codemirror` | 6.x | Vue 3 integration for CodeMirror |

#### 7.3.2 Backend Dependencies

| Dependency | Version | Purpose |
|------------|---------|---------|
| Python | ≥ 3.8 | Python script execution |

#### 7.3.3 Integration with Other Nodes

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  find_records │ ──→ │    script    │ ──→ │ update_record│
│  (data source)│     │ (transform)  │     │  (write back)│
└──────────────┘     └──────────────┘     └──────────────┘
                            ↓
                     ┌──────────────┐
                     │  send_email  │
                     │  (notify)    │
                     └──────────────┘
                            ↓
                     ┌──────────────┐
                     │   webhook    │
                     │(external call)│
                     └──────────────┘
                            ↓
                     ┌──────────────┐
                     │  condition   │
                     │(conditional) │
                     └──────────────┘
```

| Integrated Node | Data Flow | Reference Method |
|-----------------|-----------|------------------|
| find_records → script | Query result as `input` | Automatically injected or specified via `input_node_id` |
| script → update_record | Script output as update value | `{{script_result.field}}` or `{{node_outputs.<id>.result.field}}` |
| script → send_email | Script output as email content | `{{script_result.field}}` |
| script → webhook | Script output as request body | `{{script_result.field}}` |
| script → condition | Script output as condition basis | `{{script_result.field}}` |
| loop → script | Current loop data as `context.loop.current_data` | Read `context['loop']` inside the script |

#### 7.3.4 Database Migration

The database migration involved in adding the `'script'` node type:

- Migration file: `migrations/versions/20260801_0022_add_script_node_type.py`
- Compatibility: PostgreSQL uses `ALTER TYPE ... ADD VALUE`; SQLite uses `op.batch_alter_table(recreate='always')`
- Impact: extends the `workflow_nodes.node_type` enum; does not affect existing data

#### 7.3.5 Test Suite

| Test File | Test Content | Test Count |
|-----------|--------------|------------|
| `tests/test_script_execution_service.py` | Python sandbox unit tests | 8 |
| `tests/test_script_node_validation.py` | Node configuration validation tests | 8 |
| `tests/test_script_node_integration.py` | Execution engine integration tests | 15 |
| `src/components/workflow/__tests__/WorkflowNodeConfig.script.spec.ts` | Frontend configuration panel tests | 10 |
| `src/utils/__tests__/workflowNodeType.spec.ts` | Node registry tests | 10 |
| `src/services/api/__tests__/workflowApiService.spec.ts` | API service tests | 22 |

---

## Document Version

| Version | Date | Change Description |
|---------|------|--------------------|
| 1.1 | 2026-08-12 | Synced the complete Script node documentation: added configuration panel details (4.2), error handling and retry strategy (4.4), in-loop-body case (5.3), and appendix API/error codes/toolchain/migration/test suite (Chapter 7); added a configuration panel screenshot after "Adding a Script Node" |
| 1.0 | 2026-08-01 | Initial version covering the complete functionality of the Script node |
