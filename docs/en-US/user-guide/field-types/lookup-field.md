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

### Value Source

When configuring a filter condition, the compared value can come from three sources:

| Value Type | Description |
| --- | --- |
| Current table field | Compare with the value of a field in the current table |
| Custom value | Compare with a manually entered fixed value |
| Current record | Compare with the current record itself. **Only available when the selected source field is a Link field** |

::: tip How Link fields are matched
A Link field stores the **record ID of the target table** (a single ID or an array of IDs), not the display value. Therefore:

- To match "a Link field in the source table" against "the current record", set the value type to **Current record**.
- If you choose **Current table field** and pick a text field (e.g. Project Name), the display value is automatically resolved to the corresponding record ID before comparison.
- For Link fields, **equals** is evaluated by record ID intersection: a source record matches as long as its link value contains the target record ID.
:::

## Example: Sum Task Hours by Project

**Scenario**: Table A is "Projects", table B is "Tasks", and table B has a Link field "Project" pointing to table A. You want to show, on each project row, the total hours of all tasks belonging to that project.

**Configuration**:

1. In table A, click **Add Field** and select the **Lookup** field type.
2. **Source Table**: select table B (Tasks).
3. **Source Field**: select the "Hours" field of table B.
4. **Filter Conditions**: field = "Project" (the Link field in table B), operator = "equals", value type = **Current record**.
5. **Aggregation**: select **Sum**.
6. Click Save.

Once configured, each project row aggregates the hours of all tasks whose "Project" link points to it.

::: warning Common mistake
Do not configure the condition as "Project = Project Name". The Link field in table B stores the record ID of table A, while "Project Name" is plain text; comparing them directly never matches and the aggregation will be empty. Use **Current record** instead.
:::

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

Lookup fields are usually used together with Link fields, but the current table is not required to have a Link field before choosing a source table:

- The source table can be any other data table in the same Base.
- Usage 1: When the current table has a Link field pointing to the source table, use filter conditions (value type **Current table field**) to limit the scope.
- Usage 2: When the source table has a Link field pointing back to the current table, use the **Current record** value type in filter conditions for reverse aggregation (see "Example: Sum Task Hours by Project").
- One Link field can be referenced by multiple Lookup fields.
- Deleting a source field that is referenced or used in filters will invalidate the Lookup fields that depend on it.

## Suggestions

- Use **Original** mode for simple references.
- For one-to-many relationships requiring summary statistics, use aggregation modes such as **Sum**, **Count**, or **Average**.
- Add filter conditions when you need to exclude some linked records.
- When the source table links back to the current table (e.g. Tasks link to Projects), use the **Current record** value type in the filter condition.
- If an aggregation returns empty, check whether the filter matches anything first: verify with **Count**, then switch to numeric aggregations such as **Sum**.
