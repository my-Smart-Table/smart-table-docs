# Link Field

Link fields are used to establish relationships between two tables, supporting one-to-one, one-to-many, and many-to-many relationship modes. Through link fields, you can achieve cross-table data linkage, referencing, and summary analysis.

## When to Use

- Projects table linked to Tasks table: one project contains multiple tasks
- Customers table linked to Orders table: one customer has multiple orders
- Employees table linked to Departments table: multiple employees belong to one department
- Products table linked to Suppliers table: one product can be supplied by multiple suppliers

## Creating a Link Field

1. Click **Add Field** in a table.
2. Select the **Link** field type.
3. Configure link parameters:
   - **Target Table**: Select another table to link to.
   - **Relationship Type**: Choose one-to-one, one-to-many, or many-to-many.
   - **Display Field**: Select which field value from the target table to display in the current table.
   - **Bidirectional Link**: Whether to automatically create a reverse link field in the target table.
4. Click Save.

## Relationship Types

| Relationship Type | Description | Example |
| --- | --- | --- |
| One-to-one | One record in the current table links to only one record in the target table | Employee ↔ Desk |
| One-to-many | One record in the current table can link to multiple records in the target table | Project → Multiple Tasks |
| Many-to-many | Records in both tables can link to multiple records in the other table | Product ↔ Multiple Suppliers |

## Link Record Operations

### Adding a Link

- Click the **+** or search icon in the cell.
- Search and select target records in the record selector popup.
- Supports selecting multiple records at once (in one-to-many/many-to-many modes).

### Removing a Link

- Hover over the linked record tag.
- Click the **×** on the right side of the tag to remove the link.
- Removing a link does not delete the target table record; it only disconnects the relationship.

### Viewing Linked Record Details

- Click a linked record tag to open the target record detail drawer.
- The detail drawer shows all fields of the linked record, read-only by default.

## Bidirectional Link

When bidirectional link is enabled, SmartTable automatically creates a reverse link field in the target table pointing back to the current table. This means:

- Table A can see linked records from Table B.
- Table B can also see linked records from Table A.
- Adding or removing a link on either side will sync to the other side.

::: tip Suggestion
When designing table structures, enable bidirectional links for relationships that need to be viewed from both sides, avoiding the need to manually maintain two link fields later.
:::

## Using with Lookup Fields

Link fields are often used together with Lookup fields:

1. First, use a Link field to establish the table relationship.
2. Then, use a Lookup field to extract target field values from linked records.
3. You can also aggregate the lookup results (such as sum, count, etc.).

## Notes

- Link fields only store record IDs, not duplicate target data.
- After a target table record is deleted, the corresponding link in the link field disappears automatically.
- Changing the relationship type may affect existing data; please operate with caution.
