# Lookup Field

A Lookup field extracts a value from a field in another table and supports aggregation and filtering. It is the core field type for cross-table data linkage and summary analysis, often analogous to "Lookup / Rollup" field.

::: tip Real-time & read-only
A Lookup field's value is **computed in real time** by the system when a record is read, and the cell is **not manually editable**. After the source data, referenced field, or filter conditions change, the lookup result is recomputed automatically.
:::

## When to Use

- Display the customer name in the Orders table (looked up from the Customers table).
- Summarize the number of completed tasks linked to a project.
- Calculate the average supplier quote in the Products table.
- Count the total order amount for each customer in the Sales table.
- Reverse aggregation: the Tasks table links to the Projects table via a "Project" Link field; aggregate each project's total task hours in the Projects table.

## How It Works

The lookup calculation logic is as follows (backend `LookupService.compute_lookup_value`):

1. Load all non-deleted records from the **source table**.
2. Filter the source records using the **filter conditions** (returns all records if no filter is set).
3. Extract the value of the **referenced field** from those records.
4. Aggregate the extracted values using the **aggregation mode** (original / distinct keep a list).
5. Format the aggregated result using the **field format** before display.

> Key point: a Lookup field does **not** require the current table to already have a Link field pointing to the source table. It scans and filters the source table based on filter conditions, so it can be used independently of Link fields in many scenarios. When the source table has a Link field pointing back to the current table, the **Current record** value type enables reverse aggregation.

## Creating a Lookup Field

1. Click **Add Field** in a table and select the **Lookup** field type.
2. Configure the following parameters:

| Setting | Description |
| --- | --- |
| Source Table | The table to look up from. **Must be another table in the same Base** (cannot be the current table). |
| Referenced Field | The field in the source table to extract (includes hidden fields). |
| Filter Conditions | Optional, up to **5**; empty means all source records are returned. |
| Aggregation | How to aggregate the lookup result (8 modes, see below). |
| Field Format | Available in aggregation modes to format the result (original / distinct auto-follow the source field). |

3. Click **Preview Result** to see the computed value for the current record in real time (the field must be saved first).
4. Save.

## Aggregation Modes

There are 8 aggregation modes:

| Mode | Description | Result Shape |
| --- | --- | --- |
| Original | Directly display the referenced field value; shows as a list for one-to-many | Array / scalar |
| Distinct | Display values after removing duplicates | Array |
| Distinct Count | Count of unique values after deduplication | Number |
| Sum | Sum numeric referenced values | Number |
| Count | Count the number of matching source records | Number |
| Average | Average numeric referenced values | Number |
| Max | Maximum value (supports numbers and dates) | Number / Date |
| Min | Minimum value (supports numbers and dates) | Number / Date |

::: warning Empty result troubleshooting
If an aggregation is empty, check first whether the filter matches anything: switch to **Count** mode to verify how many records match, then switch to numeric aggregations such as **Sum**.
:::

## Filter Conditions

Lookup fields support multi-condition filtering on source records; only matching records participate in the calculation.

### Condition count and conjunction

- Up to **5** conditions (saving more than 5 is rejected).
- Multiple conditions support **AND / OR**:
  - Match all conditions (AND)
  - Match any condition (OR)

### Single condition structure

Each condition consists of three parts:

1. **Source field**: a field in the source table (the field being filtered).
2. **Operator**: the comparison method (see below).
3. **Compare value**: determined by the **value type** (see below).

> When switching the field, if the new field type does not support the current operator, the system falls back to "equals"; if the new field is not a Link field, the "Current record" value type falls back to "Current table field". Switching the operator to "is empty / is not empty" clears the compare value (these operators need no value).

### Operators (7)

There are **7** operators in total, enabled per source field type:

| Operator | Applicable field types |
| --- | --- |
| Equals | All field types |
| Not equals | All field types |
| Is empty | All field types |
| Is not empty | All field types |
| Contains | Text (single line / long / rich / email / phone / URL) + Select / Member / Link (single select / multi select / member / collaborator / Link) |
| Before | Date types (date / date time / created time / updated time) |
| After | Date types (date / date time / created time / updated time) |

::: tip
"Is empty / Is not empty" need no compare value; other operators require a compare value via the value type.
:::

### Three value sources (value type)

| Value Type | Description | Input control |
| --- | --- | --- |
| Current table field | Compare with the value of a field in the **current table** | Dropdown to select a current-table field |
| Custom value | Compare with a manually entered fixed value | Rendered by source field type (number → number input, date → date picker, others → text) |
| Current record | Compare with the **current record itself**. **Only available when the condition's source field is a Link field** | No input needed |

### Link fields and display-value matching

A Link field stores the **record ID of the target table** (a single ID or an array of IDs), not the display value. Therefore:

- To match "a Link field in the source table" against "the current record", set the value type to **Current record** (the system uses the current record ID and does an ID-intersection check against the link value).
- If you choose **Current table field** and pick a **text field** (e.g. Project Name), the display value is automatically resolved to the corresponding record ID before comparison.
- For Link fields, **equals / contains** are evaluated by record ID intersection: a source record matches as long as its link value contains the target record ID; **not equals** means no intersection.

Additionally, when one side of the comparison is a **select field (single / multi select, storing option IDs)** and the other is text (option name), the system automatically expands both into a candidate set of "option ID + option name" before matching, avoiding never-matching ID-vs-name comparisons.

## Field Formatting

For **non-original / non-distinct** modes (distinct count, sum, count, average, max, min), custom result formatting is supported; in **original / distinct** modes the format auto-follows the source field and cannot be changed.

| Format | Applicable aggregation | Options |
| --- | --- | --- |
| Number | distinct count / sum / count / average / max-min | Decimal places (0–10) |
| Currency | distinct count / sum / count / average / max-min | Currency symbol (e.g. ¥, $, €) + decimal places |
| Date | Only for **max / min** when the source field is a date type | Date format (YYYY-MM-DD, YYYY/MM/DD, YYYY年MM月DD日, YYYY-MM-DD HH:mm:ss) |

::: warning Format compatibility limits
- **Distinct count / sum / count / average**: format must be "Number" or "Currency".
- **Max / min**: format can be "Number" or "Currency"; "Date" is also available when the source field is a date type.
- **Percentage format is not supported**.
- Original / distinct display fully follows the referenced field's original type (see next section).
:::

## Display & Rendering

A Lookup field is a **read-only** cell; its presentation depends on the aggregation mode:

- **Original / Distinct modes**: rendered structurally by the referenced field's original type:
  - Single / Multi select → colored tags
  - Member / Collaborator → avatar + name
  - Attachment → thumbnail + name
  - Checkbox → Yes / No
  - Number → formatted by source field precision
  - Date → formatted by source field date format
- **Aggregation mode**: displays the formatted string (currency symbol, specified decimals, etc.).
- An empty result displays `-`.

## Preview

When configuring a lookup field, if the current record already has related data, click **Preview Result** to see the computed value in real time and verify the configuration. Preview requires:

- The field is saved (has a field ID).
- A current record ID is provided.
- The source table and referenced field are selected.

## Example: Sum Task Hours by Project

**Scenario**: Table A is "Projects", table B is "Tasks", and table B has a Link field "Project" pointing to table A. You want to show, on each project row, the total hours of all tasks belonging to that project.

**Configuration**:

1. In table A, click **Add Field** and select the **Lookup** field type.
2. **Source Table**: select table B (Tasks).
3. **Referenced Field**: select the "Hours" field of table B.
4. **Filter Conditions**: field = "Project" (the Link field in table B), operator = "equals", value type = **Current record**.
5. **Aggregation**: select **Sum**.
6. Save.

Once configured, each project row aggregates the hours of all tasks whose "Project" link points to it.

::: warning Common mistake
Do not configure the condition as "Project = Project Name". The Link field in table B stores the record ID of table A, while "Project Name" is plain text; comparing them directly never matches and the aggregation will be empty. Use **Current record** instead.
:::

## Relationship with Link Fields

- Lookup fields are usually used together with Link fields, but the current table is **not required** to have a Link field before choosing a source table.
- The source table must be **another table in the same Base, and cannot be the current table itself**.
- Usage 1 (forward scoping): when the current table has a Link field pointing to the source table, use the filter condition's **Current table field** value type to scope source records to those related to the current record.
- Usage 2 (reverse aggregation): when the source table has a Link field pointing back to the current table, use the **Current record** value type in the filter condition for reverse aggregation (see the example above).
- One Link field can be referenced by multiple Lookup fields.
- Deleting a source field that is referenced or used in filters will invalidate the Lookup fields that depend on it (empty result).

## Field Type Conversion

The Lookup field belongs to the "reference / computed" category and is **forbidden from being converted to other field types, and from having other types converted into it** (locked together with Link, Rollup, and Button). To change it, delete and recreate the field. See [Field Type Conversion Rules](/en-US/user-guide/field-types/field-type-conversion.html).

## Suggestions

- Use **Original** mode for simple references.
- For one-to-many relationships requiring summary statistics, use aggregation modes such as **Sum**, **Count**, or **Average**.
- Add filter conditions when you need to exclude some records.
- When the source table links back to the current table (e.g. Tasks link to Projects), use the **Current record** value type in the filter condition.
- If an aggregation returns empty, first verify with **Count**, then switch to numeric aggregations such as **Sum**.
