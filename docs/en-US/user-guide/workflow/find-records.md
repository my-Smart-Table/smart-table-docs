# Find Records Node

The Find Records node is used to query records in a target table during workflow execution and save the results to a variable for use by subsequent nodes. It is a key node for dynamic data queries and batch processing.

## When to Use

- Query all orders for a customer
- Find task lists with status "Pending"
- Get target records that meet conditions for subsequent updates or notifications
- Provide a data source for loop nodes

## Configuration

<img src="/images/user-guide/basic-features/workflow/workflow-instance.png" alt="Find Records node" style="max-width: 100%; border: 1px solid #e0e0e0; border-radius: 4px;">

### Target Table

Select the table to query.

### Query Conditions

Configure filter conditions to screen records:

- Select field, operator, and value.
- Support multiple condition combinations.
- Support AND / OR logic.
- Values support static values and reference expressions.

### Sorting

- **Sort Field**: Select the field to sort by.
- **Sort Direction**: Ascending or descending.

### Limit

Set the maximum number of records returned, range 1 ~ 1000, default 100.

### Result Variable Name

Specify a variable name for the query results, default `records`. Subsequent nodes can reference results through the variable name:

```
{{find_records.records}}
```

Specific field reference:

```
{{find_records.records[0].<field_id>}}
```

### Empty Result Handling

- **Continue**: Continue executing subsequent nodes when no records are found.
- **Stop**: Terminate the workflow when no records are found.

## Example

### Example: Find unprocessed orders for a customer

| Configuration | Value |
| --- | --- |
| Target Table | Orders |
| Condition 1 | Customer ID = `{{trigger.record.customer_id}}` |
| Condition 2 | Status = "Pending" |
| Sort | Created Time Descending |
| Limit | 50 |
| Result Variable Name | pending_orders |

Subsequent nodes can reference the query results via `{{find_records.pending_orders}}`.

## Using with Loop Nodes

The Find Records node is often used as a data source for loop nodes:

1. The Find Records node queries a batch of records.
2. The Loop node selects "Find Records Results" as the data source.
3. The loop body performs create, update, send email, etc. operations on each record.

## Notes

- Field values in query conditions support expressions, but ensure the expression returns the correct data type.
- Too many returned results may affect performance; it is recommended to set a reasonable limit.
- The Find Records node can also be used inside a loop body, but avoid excessive nesting.
