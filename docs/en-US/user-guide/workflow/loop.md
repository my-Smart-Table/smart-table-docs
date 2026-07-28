# Loop Node

The Loop node is used to iterate over a set of data, suitable for batch processing scenarios. The loop body can nest Create Record, Update Record, Find Records, Send Email, Webhook, and other nodes.

## When to Use

- Batch create subtasks
- Send notification emails to multiple customers
- Batch update records that meet conditions
- Iterate over Find Records results and process them one by one

## Configuration

### Data Source Types

The Loop node supports the following data sources:

| Data Source Type | Description |
| --- | --- |
| Find Records All | Iterate all results from a previous Find Records node |
| Find Records Column | Iterate multiple values of a field from a previous Find Records node |
| Trigger Field | Iterate a member, multi-select, link, or attachment field in the trigger record |
| Webhook Array | Iterate array data returned by a previous Webhook node |

### Max Iterations

Limit the maximum number of loop iterations, range 1 ~ 1000, default 100. The loop automatically stops after exceeding the maximum.

### Error Handling

- **Skip**: When an iteration fails, skip it and continue with the next.
- **Terminate**: When an iteration fails, terminate the entire loop.

### Empty Result Handling

- **Skip Loop**: Skip the loop node when the data source is empty.
- **Error**: Report an error when the data source is empty.

## Loop Body

The loop body is the list of child nodes inside the loop node. Each iteration executes the nodes in the loop body in order.

### Available Nodes in Loop Body

- Create Record
- Update Record
- Find Records
- Send Email
- Webhook
- Loop (supports nesting)

### Unavailable Nodes in Loop Body

- Condition Node
- Trigger

## Loop Variables

During loop execution, the following variables are injected into the context and can be used by nodes inside the loop body:

| Variable | Description |
| --- | --- |
| `{{loop.current_data}}` | Data object of the current iteration |
| `{{loop.index}}` | Index of the current iteration (starting from 0) |
| `{{loop.round}}` | Round number of the current iteration (starting from 1) |
| `{{loop.total}}` | Total number of data items |

Examples:

```
{{loop.current_data.customer_name}}
{{loop.current_data[0].field_id}}
```

## Loop Limits

- A single workflow can contain up to 5 loop nodes.
- Maximum loop nesting depth is 3 levels.
- Loop nodes can be used inside loop bodies, but pay attention to performance and logic complexity.

## Example

### Example: Batch send emails to order customers

1. Find Records node: Query orders with status "Pending Shipment", result variable `orders`.
2. Loop node: Select "Find Records Results - orders" as the data source.
3. Add Send Email node inside the loop body:
   - Recipient: `{{loop.current_data.customer_email}}`
   - Subject: `Your order {{loop.current_data.order_no}} has been shipped`

## Notes

- When the loop data source is empty, the loop will skip or error based on configuration.
- Avoid referencing results from nodes outside the loop body inside the loop unless logically necessary.
- For large data loops, it is recommended to set a reasonable maximum iteration count to avoid timeout.
