# Master-Detail Tables

The master-detail feature lets you expand any row in a master table to view and manage the linked sub-table data directly, without switching to the target table page. It is automatically enabled based on link fields (LINK fields) and supports one-to-one, one-to-many, many-to-one, and many-to-many relationship types.

## Core Capabilities

- **Linked master-detail display**: Expanding a master row embeds a sub-table showing the full data of the linked records.
- **Lazy loading**: Sub-table data is loaded only when a row is expanded, so the initial load performance of the master table is unaffected.
- **Sub-table CRUD**: View linked record details, edit record values, and add or remove links.
- **Multiple link field switching**: When a table has several link fields, you can switch between them in the sub-table to view different linked data.
- **Data synchronization**: Operations in the sub-table automatically update the link field display in the master table.

## Prerequisites

1. The current table contains at least one **link field** (a LINK type field).
2. The link field has a properly configured target table and relationship type.
3. You have view permission on the target table (editing operations require edit permission).

## Usage Steps

### 1. Expand a Master Row to View the Sub-Table

In the master table, an expand/collapse icon appears on the left of each row (it appears automatically when the table has link fields). Click the icon to expand the current row and display the linked sub-table data.

### 2. View Linked Records

Once expanded, the sub-table shows all records linked to that row, with a column structure matching the fields of the target table. The sub-table supports:

- Scrolling through all linked records
- Sorting by clicking column headers
- Double-clicking a cell to edit the record value (requires edit permission)

### 3. Switch Link Fields

When the table has multiple link fields, a field switcher dropdown appears in the sub-table toolbar. Select a different link field to view the linked records for that field.

### 4. Add Linked Records

Click the "Add Link" button in the sub-table toolbar to open the linked record selector:

- **Select an existing record**: Choose an existing record from the target table to link.
- **Create a new record**: Create a new record in the target table and link it automatically.

::: tip Relationship Type Restriction
The one-to-one relationship type supports linking only one record. When a record already exists, the "Add Link" button is automatically disabled.
:::

### 5. Remove a Link

In the sub-table, you can remove a record link in the following ways:

- **Context menu**: Right-click a row in the sub-table and select "Remove Link".
- **Keyboard shortcut**: Select a row in the sub-table and press the Delete key.

Removing a link only breaks the relationship between records; it does not delete the record itself.

### 6. Refresh the Sub-Table

Click the "Refresh" button in the sub-table toolbar to reload the sub-table data for the current link field.

## Interaction Details

### Expand Icon Position

The expand/collapse icon is located at the far left of each row (before the row number column) and is independent of the checkbox column.

### Sub-Table Styles

| Style Item | Value |
| --- | --- |
| Sub-table row height | 32px |
| Sub-table header row height | 36px |
| Sub-table container padding | 8px |
| Sub-table fixed height | 240px (displays approximately 6-7 rows) |
| Sub-table theme | Consistent with the master table |

### Data Synchronization

| Operation | Master Table Update | Sub-Table Update |
| --- | --- | --- |
| Add a linked record | LINK field shows "N linked" | A new row is added |
| Remove a link | LINK field count decreases by 1 | The row is removed |
| Edit a sub-table record value | Not affected | Cell display is updated |
| Modify the LINK field in the master table | — | Automatically refreshed (if expanded) |

### Bidirectional Link Synchronization

When a link field is configured as bidirectional, removing the link to a record in table B from the sub-table of master table A also automatically removes the reverse link from that record in table B back to table A.

## Notes

- **Read-only mode**: When the table is in read-only mode, the sub-table supports viewing only; editing, adding, and removing links are disabled.
- **Performance considerations**: The sub-table uses a lazy loading strategy and requests data only when a row is expanded. We recommend keeping the number of linked records per row under 100 for a smooth experience.
- **Field caching**: Target table field definitions are cached for 5 minutes. If the sub-table columns are not updated after the target table structure changes, refresh the page.
- **Permission requirements**: Adding linked records requires create permission on the target table, and editing sub-table records requires edit permission on the target table.
- **Empty state**: When an expanded row has no linked records, the sub-table shows "No linked records", but you can still add links through the toolbar.
