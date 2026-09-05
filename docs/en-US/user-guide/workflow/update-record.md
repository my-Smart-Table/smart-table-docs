# Update Record Node

The Update Record node is used to automatically modify field values of existing records during workflow execution. It can update the **triggering record (current record)** itself, and it can also update one or more related records in another table — commonly used to update status, flags, timestamps based on business rules, or to sync changes from the current record to related data.

## When to Use

- Automatically set status to "Approved" after approval passes
- Update shipping time after an order ships, and sync it to the related "logistics" records
- When a customer is updated, batch-update that customer's incomplete orders in the "orders" table
- Automatically tag a record or write a completion time when conditions are met

## Configuration

<img src="/images/user-guide/basic-features/workflow/workflow-instance.png" alt="Update Record node" style="max-width: 100%; border: 1px solid #e0e0e0; border-radius: 4px;">

The Update Record node provides two kinds of update capability:

1. **Self field updates**: update fields of the current triggering record (see "Field Update Mappings").
2. **Related-table sync updates**: update one or more related records across tables (see "Related Table Sync Updates").

### Update Target

By default, the Update Record node updates the triggering record. You can also specify another record ID through an expression (advanced usage; see reference expressions below).

### Field Update Mappings (self)

Configure the field to update and its new value:

| Configuration | Description |
| --- | --- |
| Field | The target field to update (current table) |
| Value Template | Static value or reference expression |

- **Static value**: enter a fixed value directly, e.g. Status = "Completed", Archived = true.
- **Reference expression**: reference context variables through `{{}}`, e.g.:

```
{{trigger.record.<field_id>}}
{{node_<node_id>.<field_id>}}
{{loop.current_data.<field_id>}}
{{NOW}}
```

### Related Table Sync Updates

> Related-table sync updates are used to automatically update records in **another table** that are related to the current record when the current record changes. You can add multiple sync tasks; each task runs independently.

Click "Add Related Table Update" to add a sync task. Each task contains the following configuration items.

#### Target Table

Select the target table to be synced. When the current record changes, the system applies the conditions below and updates the relevant records in this table.

#### Link Field (optional)

Use a link field to locate the related records to update.

- When a link field is selected, only the related record(s) **pointed to by that link field on the current record** are updated.
- When left empty, no link-based locating is performed; instead the **entire target table** is filtered by the "Related Table Filter Conditions" below — useful for conditionally batch-updating the whole related table.

> A link field is typically a "link / two-way link" type field on the current table whose value is the related record's ID.

#### Related Table Filter Conditions

Only related records that **satisfy the following conditions** are updated; if no condition is set, **all** candidate records are updated (the candidate scope is determined by the "Link Field": the record(s) it points to if set, or the entire target table if empty).

> The fields in the conditions come from the **related table** itself. You can choose an "AND / OR" relationship for this condition group:

- **AND (all match)**: a record is updated only if all conditions are met.
- **OR (any match)**: a record is updated if any condition is met.

#### Sync Trigger Mode

Decides when this sync update is executed:

| Option | Description |
| --- | --- |
| Always sync | Execute this sync task on every change of the current record |
| Sync when condition met | Execute only when the "Sync Trigger Condition" is satisfied |

#### Sync Trigger Condition

Shown when "Sync when condition met" is selected. It decides whether to execute this sync: after the current record changes, the sync runs **only if there exists a related record satisfying the following conditions**.

> The fields in the conditions come from the **related table**. Multiple conditions support an "AND / OR" combination:
> - **AND (all match)**: the sync runs only if a single related record satisfies all conditions.
> - **OR (any match)**: the sync runs as long as any related record satisfies at least one condition.

::: tip Difference from "Related Table Filter Conditions"
- **Sync Trigger Condition** decides whether the sync should run at all (based on whether a matching related record exists); if not met, the whole related update is skipped.
- **Related Table Filter Conditions** decides which related records get updated (filters each candidate record one by one).
- Both use fields from the related table and can each be set to "AND / OR" independently.
:::

#### Field Mappings

Configure which values are written to which fields of the related record (multiple mappings allowed):

| Configuration | Description |
| --- | --- |
| Target Field | The field in the related table to write to |
| Value Template | Static value, or a reference expression (can reference the current record, the related record, etc.) |

Example reference expressions available in field mappings:

```
{{trigger.record.<field_id>}}    # field of the current triggering record
{{target_record.<field_id>}}    # field of the related record being updated
{{NOW}}                         # current time
```

> Each related-table sync task must have at least one field mapping, otherwise the task performs no update.

## Execution Logic

When the Update Record node is triggered, it runs in this order:

1. Resolve the "self field updates" mappings and render the values to write to the main record.
2. Process each "related-table sync update" task in turn:
   - If the sync trigger mode is "Sync when condition met", validate the sync trigger condition first; if not met, skip the task.
   - Resolve candidate related records (located via the link field, or the whole target table).
   - Filter candidate records one by one using the "Related Table Filter Conditions" (only matching ones are included).
   - Render the "Field Mappings" and write them to the matched related records.
3. **The main record and all related records are committed in a single database transaction**: if any step fails, everything rolls back, guaranteeing multi-table consistency.

## Examples

### Example 1: Update own status

After approval passes, set the current record's status to "Approved" and write the completion time as now:

| Field | Value Template |
| --- | --- |
| Status | Static value: Approved |
| Completion Time | `{{NOW}}` |

### Example 2: Conditional batch sync to related table (whole-table filter)

Scenario: when a "customer" record is marked "VIP", uniformly mark its "in-progress" orders in the "orders" table as "Priority".

- Target table: orders
- Link field: (empty, filter the whole table by conditions)
- Related table filter conditions: `customer_id = {{trigger.record.id}}` **AND** `status = in-progress`
- Sync trigger mode: Always sync
- Field mapping: status → static value "Priority"

### Example 3: Sync only when the current record meets a condition

Scenario: only when the "current record" status becomes "Shipped", update the related logistics record to "Picked up".

- Target table: logistics
- Link field: logistics order (points to the logistics record)
- Sync trigger mode: Sync when condition met
- Sync trigger condition: `status = Shipped` (AND)
- Field mapping: logistics status → static value "Picked up"

## Notes

- By default the triggering record is updated; to update another record, provide the correct record ID (advanced usage).
- System fields (such as created by, created time) are usually not updatable.
- Update operations trigger record-update events: if the workflow has a "record updated" trigger, be careful to avoid circular triggering.
- Multiple sync tasks are independent; failure of any task rolls back the whole update (both main and related records are not written).
- Both "Related Table Filter Conditions" and "Sync Trigger Condition" support an "AND / OR" toggle, defaulting to "AND".
