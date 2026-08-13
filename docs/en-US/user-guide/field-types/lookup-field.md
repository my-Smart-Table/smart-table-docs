# Lookup Field

Lookup fields are used to extract values from linked records and support aggregation calculations. They are the core field type for cross-table data linkage and summary analysis, usually used together with Link fields.

## When to Use

- Display customer name in the Orders table (lookup from Customers table)
- Summarize the number of completed tasks linked to a project
- Calculate average supplier quote in the Products table
- Count total order amount for each customer in the Sales table

## Creating a Lookup Field

1. Click **Add Field** in a table.
2. Select the **Lookup** field type.
3. Configure lookup parameters:
   - **Source Table**: Select the target data table that already has a link relationship.
   - **Source Field**: Select the field to extract.
   - **Aggregation**: Select original value, distinct, or aggregation mode.
   - **Filter Conditions** (optional): Only lookup linked records that meet the conditions.
4. Click Save.

## Aggregation Modes

| Mode | Description |
| --- | --- |
| Original | Directly display the target field value of linked records; shows as a list for one-to-many |
| Distinct | Display values after removing duplicates from multiple linked records |
| Distinct Count | Count of unique values after deduplication |
| Sum | Sum numeric field values |
| Count | Count the number of linked records |
| Average | Average numeric field values |
| Max | Maximum field value (supports numbers and dates) |
| Min | Minimum field value (supports numbers and dates) |

## Filter Conditions

Lookup fields support setting filter conditions on linked records:

- Supports multi-condition filtering by source table fields.
- Supports AND / OR combined logic.
- Supports 20+ operators (equals, not equals, contains, is empty, etc.).
- After setting filters, only linked records meeting the conditions participate in the calculation.

## Field Formatting

For non-original/distinct modes, lookup fields support custom result formatting:

| Format Type | Applicable Scenario |
| --- | --- |
| Number | Aggregation result is numeric; decimal places configurable |
| Currency | Display currency symbol, such as ¥ |
| Percentage | Display as percentage |
| Date | For max/min date values; date format configurable |

In original and distinct modes, lookup results follow the source field's original type rendering (such as thumbnails for attachments, avatars for members, colored tags for Single/Multi Select, etc.).

## Preview

When configuring a lookup field, if the current record already has linked data, you can preview the calculation result in real time to verify the configuration.

## Relationship with Link Fields

Lookup fields depend on Link fields:

- A Link field must be created first before the corresponding source table can be selected.
- One Link field can be referenced by multiple Lookup fields.
- Deleting a Link field will invalidate the Lookup fields that depend on it.

## Suggestions

- Use **Original** mode for simple references.
- For one-to-many relationships requiring summary statistics, use aggregation modes such as **Sum**, **Count**, or **Average**.
- Add filter conditions when you need to exclude some linked records.
