# Update Record Node

The Update Record node is used to automatically modify field values of existing records during workflow execution. It is commonly used to update status, flags, timestamps, etc. based on business rules.

## When to Use

- Automatically update status to "Approved" after approval passes
- Automatically mark tasks as "Overdue" when they are past due
- Update shipping time after an order is shipped
- Automatically tag records when conditions are met

## Configuration

### Update Target

By default, the Update Record node updates the trigger record. You can also specify another record ID through an expression.

### Field Update Mappings

Configure the fields to update and their new values:

| Configuration | Description |
| --- | --- |
| Field | The target field to update |
| Value Template | Static value or reference expression |

### Static Value

Enter a fixed value directly, such as:

- Status = "Completed"
- Processing Time = `2026-07-28`
- Archived = true

### Reference Expression

Reference context variables through `{{}}`:

```
{{trigger.record.<field_id>}}
{{node_<node_id>.<field_id>}}
{{loop.current_data.<field_id>}}
```

## Example

### Example: Update project progress after task completion

| Field | Value Template |
| --- | --- |
| Status | Static value: Completed |
| Completion Time | `{{NOW}}` |
| Completed By | `{{trigger.record.updated_by}}` |

## Notes

- By default, the trigger record is updated. To update another record, provide the correct record ID.
- System fields (such as created by, created time) are usually not updatable.
- Update operations trigger record update events. If the workflow has a record update trigger, be careful to avoid circular triggering.
