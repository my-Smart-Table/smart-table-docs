# Formula Field

Formula fields automatically calculate and display results through expressions, supporting references to other fields in the current record, built-in functions, and nested calculations. They are suitable for scenarios requiring automatic calculation, such as total price, completion rate, and overdue reminders.

## When to Use

- Calculate order total: Quantity × Unit Price
- Calculate task completion rate: Completed ÷ Total
- Concatenate display text: First Name + Last Name
- Determine date status: IF(Due Date < TODAY(), "Overdue", "On Track")

## Creating a Formula Field

1. Click **Add Field** in a table.
2. Select the **Formula** field type.
3. Enter an expression in the formula editor.
4. Configure the result format (such as number precision, date format, etc.).
5. Click Save.

## Formula Editor

SmartTable provides a formula helper component to lower the barrier of writing formulas:

- **Field Selection**: Click to insert a reference to a field in the current record.
- **Function List**: Displays all available functions by category; click to insert.
- **Syntax Hints**: Shows parameter descriptions when entering functions.
- **Real-time Preview**: Preview calculation results before saving.

## Referencing Fields

When referencing fields in a formula, use field names or identifiers, for example:

```
{Quantity} * {Unit Price}
```

You can also directly enter field names:

```
Quantity * Unit Price
```

The system automatically parses and associates the corresponding fields when saving.

## Built-in Functions

The SmartTable formula engine provides **47 built-in functions** covering the following categories:

### Math Functions

| Function | Description | Example |
| --- | --- | --- |
| SUM | Sum | `SUM(1, 2, 3)` |
| AVERAGE | Average | `AVERAGE({Chinese}, {Math})` |
| MAX | Maximum | `MAX({Value1}, {Value2})` |
| MIN | Minimum | `MIN({Value1}, {Value2})` |
| ROUND | Round | `ROUND({Value}, 2)` |
| ABS | Absolute value | `ABS({Value})` |

### Text Functions

| Function | Description | Example |
| --- | --- | --- |
| CONCAT | Concatenate text | `CONCAT({First}, {Last})` |
| LEFT | Extract from left | `LEFT({Text}, 3)` |
| RIGHT | Extract from right | `RIGHT({Text}, 3)` |
| LEN | Text length | `LEN({Text})` |
| TRIM | Remove surrounding spaces | `TRIM({Text})` |

### Date Functions

| Function | Description | Example |
| --- | --- | --- |
| TODAY | Current date | `TODAY()` |
| NOW | Current date and time | `NOW()` |
| DATEADD | Add/subtract date | `DATEADD({Date}, 3, "days")` |
| DATEDIFF | Date difference | `DATEDIFF({End}, {Start}, "days")` |
| YEAR / MONTH / DAY | Extract year/month/day | `YEAR({Date})` |

### Logic Functions

| Function | Description | Example |
| --- | --- | --- |
| IF | Conditional judgment | `IF({Status}="Done", 100, 0)` |
| AND | All conditions true | `AND({Cond1}, {Cond2})` |
| OR | Any condition true | `OR({Cond1}, {Cond2})` |
| NOT | Negation | `NOT({Cond})` |
| ISBLANK | Is empty | `ISBLANK({Field})` |

## Result Formatting

Formula fields support multiple result formats:

- **Number**: Configure decimal places and thousands separator.
- **Currency**: Select currency symbol (¥, $, etc.).
- **Percentage**: Automatically multiplied by 100 and displayed with %.
- **Date/DateTime**: Select date display format.

::: tip Format Selection
You can still change the format after saving the formula. If the formula returns a date timestamp, select a date format to avoid displaying a long number.
:::

## Common Examples

### Calculate Total Price

```
{Quantity} * {Unit Price}
```

### Calculate Completion Rate

```
IF({Total} > 0, {Completed} / {Total} * 100, 0)
```

### Overdue Check

```
IF({Due Date} < TODAY(), "Overdue", "On Track")
```

### Status Label

```
IF({Progress} = 100, "Completed", IF({Progress} > 0, "In Progress", "Not Started"))
```

## Notes

- Formula fields are read-only; calculation results cannot be manually edited.
- When the value of a referenced field changes, the formula result is automatically recalculated.
- If the formula syntax is incorrect, the field displays **Calculation Error**; please check function names and parameters.
- Formula fields can reference other formula fields, but avoid circular references.
