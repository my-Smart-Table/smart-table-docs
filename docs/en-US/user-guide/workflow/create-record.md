# Create Record Node

The Create Record node is used to automatically create one or more new records in a specified target table during workflow execution. It is commonly used to generate related data based on trigger record information.

## When to Use

- Automatically generate a delivery record in the "Delivery Slips" table when a new order is created
- Automatically create default subtasks in the "Subtasks" table when a new task is created
- Automatically create a contract record in the "Contracts" table when a customer status becomes "Signed"

## Configuration

### Target Table

Select the table in which to create records. You can choose any table under the current Base.

### Field Mappings

Configure the source of values for target table fields. Each mapping contains:

| Configuration | Description |
| --- | --- |
| Target Field | The field in the target table to write the value to |
| Value Source | Static value or expression/field reference |

### Static Value

Enter a fixed value directly. Suitable for fields that do not need to change dynamically, such as:

- Status = "Pending"
- Notify = true
- Default Value = "System auto-created"

### Reference Expression

Reference the trigger record or other node results using `{{}}` syntax, for example:

```
{{trigger.record.customer_name}}
```

Supported context variables include:

- `{{trigger.record.<field_id>}}`: Trigger record field
- `{{node_<node_id>.record.<field_id>}}`: Field from a previous node result
- `{{loop.current_data.<field_id>}}`: Current iteration data in a loop node

## Example

### Example: Auto-generate a delivery slip from a new order

| Target Field | Value Source |
| --- | --- |
| Order Number | `{{trigger.record.order_no}}` |
| Consignee | `{{trigger.record.customer_name}}` |
| Status | Static value: Pending Shipment |
| Created Time | `{{NOW}}` |

## Notes

- The target table must exist and have write permissions.
- Required fields need mappings; otherwise creation will fail.
- Link fields can be populated by referencing target record IDs in expressions.
- The Create Record node can be used inside a loop body to batch-create records.
