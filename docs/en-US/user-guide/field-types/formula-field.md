# Formula Field (Formula)

Formula fields automatically calculate and display results through expressions, supporting references to other fields in the current record, built-in functions, and nested calculations — plus **`[Table].[Field]` column references** for cross-table aggregation over data in other tables within the same Base. They are suitable for scenarios requiring automatic calculation, such as total price, completion rate, overdue reminders, and cross-table summaries.

## When to Use

- Calculate order total: Quantity × Unit Price
- Calculate task completion rate: Completed ÷ Total
- Concatenate display text: First Name + Last Name
- Determine date status: `IF({Due Date} < TODAY(), "Overdue", "On Track")`
- Cross-table summary: sum a column in another table `SUM([Sales].[Amount])`
- Conditional counting: count matching records in another table `COUNTIF([Sales].[City], "Beijing")`

## Creating a Formula Field

1. Click **Add Field** in a table.
2. Select the **Formula** field type.
3. Enter an expression in the formula editor:
   - Reference fields in the current table: click a field name in the **Available Fields** area to insert `{Field Name}`;
   - Reference other tables: pick a table in the **Cross-Table References** area, then click a field name to insert `[Table Name].[Field Name]`.
4. Configure the result format (such as number precision, date format, etc.).
5. Click Save. The system validates syntax and references on save (whether fields exist, whether column references are valid) and reports problems immediately.

## Formula Editor

SmartTable provides a formula helper component to lower the barrier of writing formulas:

- **Available Fields**: Click to insert a reference to a field in the current record, `{Field Name}`.
- **Cross-Table References**: Choose another table in the same Base, then click a field name to insert a `[Table Name].[Field Name]` column reference.
- **Function List**: Displays all 76 built-in functions by category; hover to view syntax, parameters and examples; click to insert.
- **Syntax Validation**: Validates syntax, field references and column references before saving.
- **Real-time Preview**: Preview calculation results before saving.

## Syntax Rules

### Field References

Reference a field value of the current record using braces:

```
{Quantity} * {Unit Price}
```

- Field names are case-insensitive.
- Missing fields evaluate to null.

### Column References (Cross-Table References)

Use `[Table Name].[Field Name]` to reference the **entire column of values** (an array) of a field in another table:

```
SUM([Sales].[Amount])
```

| Rule | Description |
| --- | --- |
| Scope | Only tables **within the same Base**; cross-Base or missing tables evaluate to 0 / null |
| Case | Table and field names are **case-insensitive**; leading/trailing spaces are ignored |
| Current table | References to the current table must still include the full table name (e.g. `[Tasks].[Hours]`) |
| Referenceable columns | Any raw-value field (number, text, date, single select, checkbox, etc.) |
| Non-referenceable columns | Formula, lookup and link fields (their computed values are not stored, so column references return nothing) |
| Renaming | Renaming a table or field does **not** automatically update column references in formulas — update them manually |
| Evaluation | Computed in real time by the server when records are read, so results always match the source table |

### CurrentValue (Condition Traversal)

In the criteria argument of condition functions (`FILTER` / `COUNTIF` / `SUMIF` / `AVERAGEIF`), `CurrentValue` represents the **current element** being visited in the column:

```
COUNTIF([Sales].[Amount], CurrentValue > 100)
```

- `CurrentValue` is only allowed in the criteria argument of the four functions above.
- Only the cell-value form is supported (e.g. `CurrentValue > 100`, `CurrentValue = "Beijing"`); `CurrentValue.[Field]` is not supported yet.

### Operators and Precedence

| Precedence | Operator | Description | Example |
| --- | --- | --- | --- |
| 1 (highest) | `( )` | Parentheses first | `({a} + {b}) * 2` |
| 2 | `^` | Exponentiation | `2 ^ 10` |
| 3 | `*` `/` | Multiply, divide | `{Unit Price} * {Quantity}` |
| 4 | `+` `-` | Add, subtract | `{a} + {b}` |
| 5 | `=` `<>` `>` `<` `>=` `<=` | Comparison, returns boolean | `{Score} >= 60` |

- Operators of the same precedence associate left to right.
- Strings compare lexicographically; when a number is compared with a numeric string, the string is automatically converted to a number (e.g. a stored value of `"150.5"` still compares correctly with `> 100`).

## Built-in Functions

The SmartTable formula engine provides **76 built-in functions** (identical on both the client and server engines) and supports common operators, covering five categories:

### Operators

Besides functions, the formula helper also offers common **operators** under the "Operators" category:

| Operator | Symbol | Description | Example |
| --- | --- | --- | --- |
| ADD | ＋ | Addition | `{Unit Price} + {Shipping}` |
| SUBTRACT | － | Subtraction | `{Revenue} - {Cost}` |
| MULTIPLY | × | Multiplication | `{Unit Price} * {Quantity}` |
| DIVIDE | ÷ | Division (fails on zero divisor) | `{Total} / {Quantity}` |
| PARENTHESES | ( ) | Parentheses control precedence | `({Field A} + {Field B}) * 2` |

::: tip
Operators are displayed as symbols (＋ － × ÷ ( )) in the formula helper; use parentheses to adjust evaluation order.
:::

### Math Functions (18)

| Function | Description | Example |
| --- | --- | --- |
| SUM | Sum, supports column references | `SUM(1, 2, 3)`, `SUM([Sales].[Amount])` |
| AVG | Average, supports column references | `AVG({Chinese}, {Math})` |
| MAX / MIN | Maximum / minimum, supports column references | `MAX({Value1}, {Value2})` |
| ROUND | Round | `ROUND({Value}, 2)` |
| CEILING / FLOOR | Round up / down | `CEILING({Value})` |
| ABS | Absolute value | `ABS({Value})` |
| MOD | Modulo | `MOD(17, 5)` |
| POWER | Power | `POWER(2, 10)` |
| SQRT | Square root | `SQRT(16)` |
| LN / LOG / EXP | Logarithm and exponential | `LN({Value})` |
| PI / E | Constants | `PI()` |
| RAND / RANDBETWEEN | Random numbers | `RANDBETWEEN(1, 10)` |

### Text Functions (14)

| Function | Description | Example |
| --- | --- | --- |
| CONCAT | Concatenate | `CONCAT({First}, {Last})` |
| LEFT / RIGHT / MID | Substring | `LEFT({Text}, 3)` |
| LEN | Length | `LEN({Text})` |
| UPPER / LOWER | Case conversion | `UPPER({Text})` |
| TRIM | Trim spaces | `TRIM({Text})` |
| SUBSTITUTE / REPLACE | Replace | `SUBSTITUTE({Text}, "old", "new")` |
| FIND | Find substring | `FIND("keyword", {Text})` |
| REPT | Repeat text | `REPT("★", {Rating})` |
| TEXT | Format as text | `TEXT({Value}, "0.00")` |
| VALUE | Text to number | `VALUE({Text})` |

### Date Functions (15)

| Function | Description | Example |
| --- | --- | --- |
| TODAY / NOW | Current date / datetime | `TODAY()` |
| YEAR / MONTH / DAY | Extract year/month/day | `YEAR({Date})` |
| HOUR / MINUTE / SECOND | Extract time parts | `HOUR({DateTime})` |
| WEEKDAY | Day of week | `WEEKDAY({Date})` |
| DATEADD | Add to date | `DATEADD({Date}, 3, "days")` |
| DATEDIF / DATEDIFF | Date difference | `DATEDIFF({End}, {Start}, "days")` |
| DATETIME_FORMAT | Format datetime | `DATETIME_FORMAT({Date}, "YYYY-MM-DD")` |
| FROMUNIXTIME / UNIXTIMESTAMP | Unix timestamp conversions | `UNIXTIMESTAMP({Date})` |

### Logic Functions (16)

| Function | Description | Example |
| --- | --- | --- |
| IF | Conditional | `IF({Status}="Done", 100, 0)` |
| IFS / SWITCH | Multi-branch | `SWITCH({Level}, "A", 90, "B", 80, 0)` |
| AND / OR / XOR | Logical combination | `AND({Cond1}, {Cond2})` |
| NOT | Negation | `NOT({Cond})` |
| IFERROR | Catch error, return fallback | `IFERROR({a}/{b}, 0)` |
| ISBLANK / ISERROR / ISNUMBER / ISTEXT / ISDATE | Type checks | `ISBLANK({Field})` |
| BLANK / NA / ERROR | Special values | `BLANK()` |

### Statistical Functions (13)

**FILTER / COUNTIF / SUMIF / AVERAGEIF** support cross-table conditional aggregation combined with column references and `CurrentValue`:

| Function | Description | Example |
| --- | --- | --- |
| COUNT | Numeric count, supports column references | `COUNT([Sales].[Amount])` |
| COUNTA | Non-empty count, supports column references | `COUNTA([Sales].[Amount])` |
| COUNTBLANK | Empty count | `COUNTBLANK({Field1}, {Field2})` |
| COUNTIF | Conditional count | `COUNTIF([Sales].[City], "Beijing")` |
| SUMIF | Conditional sum | `SUMIF([Sales].[City], CurrentValue = "Beijing", [Sales].[Amount])` |
| AVERAGEIF | Conditional average | `AVERAGEIF([Sales].[Amount], CurrentValue > 100)` |
| FILTER | Conditional filter (returns array, usually nested with SUM/COUNT) | `SUM(FILTER([Sales].[Amount], CurrentValue > 100))` |
| STDEV / VAR | Standard deviation / variance | `STDEV([Sales].[Amount])` |
| MEDIAN / MODE | Median / mode | `MEDIAN([Sales].[Amount])` |
| RANK | Ranking | `RANK({Score}, [Exam].[Score])` |
| UNIQUE | Deduplicate | `UNIQUE([Sales].[City])` |

## Cross-Table References and Conditional Aggregation

Combining `[Table].[Field]` column references, `CurrentValue` traversal and statistical functions, formula fields can perform report-style cross-table calculations. The following examples use two tables:

- **Sales** with fields `City` (text), `Amount` (number), `Status` (single select: Completed / In Progress)

| City | Amount | Status |
| --- | --- | --- |
| Beijing | 100 | Completed |
| Shanghai | 200 | In Progress |
| Beijing | 300 | Completed |
| Guangzhou | 400 | Completed |

- **Summary** holding the cross-table formula fields.

### Example 1: Cross-Table Sum

```
SUM([Sales].[Amount])
```

Sums the entire Amount column. **Expected result: 1000**.

### Example 2: Conditional Count (String Criteria)

```
COUNTIF([Sales].[City], "Beijing")
```

Counts rows whose City equals "Beijing". **Expected result: 2**.

### Example 3: Conditional Sum (CurrentValue Criteria)

```
SUMIF([Sales].[City], CurrentValue = "Beijing", [Sales].[Amount])
```

Visits the City column; when `CurrentValue` (the current city) equals "Beijing", the corresponding Amount is added. **Expected result: 400** (100 + 300).

### Example 4: FILTER Then Aggregate

```
SUM(FILTER([Sales].[Amount], CurrentValue > 150))
```

`FILTER` first picks values greater than 150 (`[200, 300, 400]`), then `SUM` adds them up. **Expected result: 900**.

### Example 5: Multi-Condition Aggregation

```
SUM(FILTER([Sales].[Amount], AND(CurrentValue > 100, CurrentValue < 400)))
```

Sums values greater than 100 and less than 400. **Expected result: 500** (200 + 300).

::: warning Capability Boundary
Multi-condition aggregation currently supports multiple `CurrentValue` conditions on the **same column** only (as above). Referencing another column inside a FILTER condition for row-by-row matching (e.g. "Amount > 100 AND Status = Completed") is not supported yet. `SUMIFS` / `COUNTIFS` are also not supported — use `FILTER` + `AND` instead.
:::

### Example 6: Conditional Average and Text Concatenation

```
AVERAGEIF([Sales].[Amount], CurrentValue >= 200)
CONCAT("Beijing deals: ", COUNTIF([Sales].[City], "Beijing"), " orders")
```

The first formula averages amounts ≥ 200 (**expected result: 300**); the second outputs `Beijing deals: 2 orders`.

### Example 7: Mixing Row-Level and Column References

```
{Quantity} * {Unit Price} + SUM([Sales].[Amount])
```

Row-level calculation and cross-table aggregation combine freely: the current row's quantity times unit price, plus the entire Amount column of the Sales table.

## Result Formatting

Formula fields support several result formats:

- **Number**: decimal precision, thousand separators.
- **Currency**: currency symbol (¥, $, etc.).
- **Percent**: multiplies by 100 and appends %.
- **Date/DateTime**: date display format.

::: tip
Formats can be changed after saving. If the formula returns a timestamp, choose a date format to avoid displaying a long number.
:::

## Basic Examples

### Total Price

```
{Quantity} * {Unit Price}
```

### Completion Rate

```
IF({Total} > 0, {Completed} / {Total} * 100, 0)
```

### Overdue Check

```
IF({Due Date} < TODAY(), "Overdue", "On Track")
```

### Status Label

```
IF({Progress} = 100, "Done", IF({Progress} > 0, "In Progress", "Not Started"))
```

## FAQ

**Q: The cross-table reference always returns 0?**
A: Check: ① the referenced table must be **in the same Base** (cross-Base is not supported); ② table/field names must match the actual names (renames do not propagate into formulas); ③ the referenced column must not be a formula, lookup or link field; ④ refresh the page after fixing — formula values are recomputed by the server in real time.

**Q: The formula shows `#ERROR`?**
A: `#ERROR` means evaluation failed. Common causes: division by zero (use `IFERROR({a}/{b}, 0)`), misspelled function names, or wrong argument count/types. Hover over a function in the helper to see its correct syntax and examples.

**Q: Are `SUMIFS` / `COUNTIFS` supported?**
A: Not yet. Use `FILTER` + `AND` instead, e.g. `SUM(FILTER([Sales].[Amount], AND(CurrentValue > 100, CurrentValue < 400)))`.

**Q: What is `CurrentValue` and where can it be used?**
A: It represents the current element while a condition function traverses a column. It is only allowed in the criteria argument of `FILTER` / `COUNTIF` / `SUMIF` / `AVERAGEIF`, e.g. `COUNTIF([Sales].[Amount], CurrentValue > 100)`.

**Q: Will the formula update when the referenced table changes?**
A: Yes. Cross-table formulas are computed in real time by the server when records are read. Refresh to see the latest results — no manual recalculation needed.

**Q: Numbers stored as text (e.g. `"1.3"`) — do they break calculations?**
A: No. Aggregation and numeric comparison automatically strip currency symbols (¥, $, etc.) and thousand separators, converting strings to numbers. Non-numeric text is skipped or treated as non-matching.

## Debugging Tips

1. **Use editor validation**: saving validates syntax, field references and column references, with error messages pinpointing problems (e.g. "unknown column reference").
2. **Start small**: write the innermost expression first (e.g. `[Sales].[Amount]`), then wrap functions layer by layer (`SUM(...)` → `SUM(FILTER(...))`).
3. **Validate conditions with FILTER alone**: when unsure about a condition, check `FILTER([Sales].[Amount], CurrentValue > 100)` first, then nest the aggregate.
4. **Watch for empty values**: empty cells appear as nulls in a column; `COUNT` / `SUM` skip them automatically; use `ISBLANK` for explicit checks.
5. **Match result format to output**: if a timestamp shows as a long number, switch the field format to Date; if a ratio shows as an integer, multiply by 100 and choose Percent.
6. **Avoid circular references**: when referencing other formula fields, make sure the chain never loops back to itself.

## Notes

- Formula fields are read-only; results cannot be edited manually.
- Results recalculate automatically when referenced field values change.
- Formula fields can reference other formula fields, but avoid circular references.
- The referenced table must be in the same Base as the current table.
