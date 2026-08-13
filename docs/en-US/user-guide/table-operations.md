# Table Operations

SmartTable organizes data into **Bases**, **Tables**, **Fields**, **Records**, and **Views**. This chapter explains how to manage tables and the data inside them.

## Base Management

A base is the top-level container for a project or dataset.

| Action | How To |
|--------|--------|
| Create a base | Click **+ New Base**, choose blank or template, and enter a name. |
| Rename / star | Open the base menu and choose **Rename** or **Star**. |
| Duplicate / delete | Use **Duplicate** to copy the base, or **Delete** to remove it. |
| Manage members | Open **Members** to invite users and assign roles. |
| Share | Enable **Base Sharing** to create a public or password-protected link. |

## Table Management

Each base can contain multiple tables.

| Action | Description |
|--------|-------------|
| Create table | Click **+** next to the table tabs and choose blank, template, or import. |
| Rename | Double-click the table tab name, or open the table menu. |
| Drag sort | Drag table tabs to reorder them. |
| Duplicate | Copy the table structure and optionally its data. |
| Delete | Remove the table from the base. |

::: tip Import Tip
You can create a new table by importing an Excel, CSV, or JSON file. Multi-sheet Excel files are supported.
:::

<img src="/images/user-guide/basic-features/table-operations/table-operations-excel-import.png" alt="Excel import creating a table" style="max-width: 100%; border: 1px solid #e0e0e0; border-radius: 4px;">

During import, the system displays a field mapping preview so you can confirm the data is parsed correctly:

<img src="/images/user-guide/basic-features/table-operations/table-operations-data-import-preview.png" alt="Data import preview" style="max-width: 100%; border: 1px solid #e0e0e0; border-radius: 4px;">

## Field Management

<img src="/images/user-guide/basic-features/table-operations/table-operations-field-config.png" alt="Field configuration panel" style="max-width: 100%; border: 1px solid #e0e0e0; border-radius: 4px;">

Fields define the structure of each table. SmartTable supports 26 field types. Single Line Text fields additionally support **regular expression validation**, with custom rules and validation hints, and built-in presets for domestic phone, postal code, ID number, IPv4, and more.

<img src="/images/user-guide/basic-features/txt_regx.jpeg" alt="Field regex validation configuration" style="max-width: 100%; border: 1px solid #e0e0e0; border-radius: 4px;">

| Task | How To |
|------|--------|
| Add a field | Click **+** at the right end of the header row and choose a type. |
| Configure | Open the field menu to set validation rules, formatting, default values, and options. |
| Sort fields | Drag the column header left or right. |
| Show / hide | Toggle visibility in the view settings. |
| Set default | Define a default value applied to new records. |

See [Field Types](/en-US/user-guide/field-types.html) for a complete reference.

## Record Management

<img src="/images/user-guide/basic-features/table-operations/table-operations-record-detail.png" alt="Record detail drawer" style="max-width: 100%; border: 1px solid #e0e0e0; border-radius: 4px;">

Records are the rows of your table.

| Operation | How To |
|-----------|--------|
| Add a record | Click the **+** row at the bottom, or press `Ctrl + N` / `Cmd + N`. |
| Edit a cell | Click a cell, type the value, and press `Enter` or click outside. |
| Open detail drawer | Click the row expander or double-click a record to view history and comments. |
| Delete | Select the row and press `Delete`, or right-click and choose **Delete**. |
| Batch actions | Select multiple rows with `Shift` or checkboxes, then apply a bulk operation. |
| Undo / redo | Use `Ctrl + Z` / `Cmd + Z` and `Ctrl + Y` / `Cmd + Shift + Z`. |

::: tip Change History
SmartTable tracks every record change. Open a record's detail panel to see who changed what and when.
:::

## View Management

<img src="/images/user-guide/basic-features/table-operations/table-operations-table-view.png" alt="Table view main interface" style="max-width: 100%; border: 1px solid #e0e0e0; border-radius: 4px;">

Views let the same table appear in different ways without changing the underlying data.

| Feature | Description |
|---------|-------------|
| Switch view | Use the view tabs or the view switcher in the upper right. |
| Filter | Add one or more conditions; combine with AND/OR logic. |
| Sort | Sort by one or more fields and drag to set priority. |
| Group | Group by up to 3 fields with collapsible sections. |
| Freeze columns | Lock key columns to the left while scrolling. |
| Hide / show fields | Customize which fields appear in the current view. |

## Next Steps

- [Field Types](/en-US/user-guide/field-types.html)
- [Table View](/en-US/user-guide/views/table-view.html)
- [Kanban View](/en-US/user-guide/views/kanban-view.html)
