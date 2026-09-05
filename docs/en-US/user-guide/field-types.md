# Field Types

SmartTable provides a rich set of field types across 9 categories. Each type is designed for a specific kind of data and comes with its own configuration options.

## Field Type Overview

| Category | Field Type | Description |
|----------|------------|-------------|
| **Text Types** | Single Line Text | Short text input with validation rules |
| **Text Types** | Long Text | Long text/paragraph input with multi-line editing |
| **Text Types** | Rich Text | HTML rich text editor with formatting support |
| **Numeric Types** | Number | Integer/decimal with number/currency/percent formatting |
| **Date Types** | Date | Date picker supporting multiple date formats |
| **Date Types** | Date Time | DateTime picker accurate to seconds |
| **Selection Types** | Single Select | Dropdown single select with custom options and colors |
| **Selection Types** | Multi Select | Tag-style multi select with custom options |
| **Selection Types** | Checkbox | Boolean toggle |
| **People Types** | Member | User selection with current-user default value |
| **Contact Types** | Phone | Phone number input and formatted display |
| **Contact Types** | Email | Email address input and validation |
| **Contact Types** | URL | URL link with click-to-navigate |
| **Media Types** | Attachment | File upload/download with image preview and thumbnails |
| **Computed Types** | Formula | 47 built-in functions with field references and nested calculations |
| **Relation Types** | Link | Table relationships supporting one-to-one/one-to-many/many-to-many |
| **Lookup Types** | Lookup | Cross-table queries with aggregation (sum/avg/count/etc.) |
| **System Types** | Created By | Auto-record record creator |
| **System Types** | Created Time | Auto-record creation timestamp |
| **System Types** | Updated By | Auto-record last modifier |
| **System Types** | Updated Time | Auto-record last modification time |
| **System Types** | Auto Number | Auto-increment with prefix/suffix/date format/padding |
| **Others** | Rating | Star rating component |
| **Others** | Progress | Progress bar/percentage display |

::: tip Choosing a Field Type
Pick the type that matches how the data will be entered, displayed, and calculated. For example, use **Single Select** for statuses, **Link** for relationships, and **Formula** for computed values.
:::

## Changing the Field Type of an Existing Field

After a field is created, you can still change its **field type**. The system automatically determines the allowed conversion scope based on **whether the field already contains data**, and safely migrates existing values to avoid silent data loss.

### 1. Field has no data: free conversion

When a field has not yet been written to, it can be freely converted to any other type (subject to the universal restrictions below).

> Empty-value rule: `null`, an empty string, or an empty array are treated as "no data"; `0` and `false` are valid business values and count as having data.

### 2. Field has data: lossless only (one exception: Date ↔ Date Time)

When a field already contains data, only **lossless conversions** are allowed — the target type must fully preserve the original value. Beyond that, exactly one lossy conversion is permitted:

- `Date` → `Date Time`: **lossless** — the time part is auto-completed (e.g., `2023-05-01` → `2023-05-01T00:00:00Z`).
- `Date Time` → `Date`: **lossy** — only the date part is kept and the time part is discarded, **unrecoverably**. A confirmation dialog clearly states "the time part will be discarded and cannot be recovered" before the conversion can proceed.

All other lossy conversions are forbidden (e.g., truncating long text, dropping options when converting multi-select to single select, resolving references to names), so data is never changed unexpectedly without your knowledge.

### 3. Lossless conversion rules (field has data)

| From | Can convert to | Data handling |
| --- | --- | --- |
| Single Line Text | Long Text, Rich Text | Original value preserved |
| Long Text | Rich Text | Original value preserved |
| Single Select | Multi Select | Single value wrapped as array `[value]` |
| Email / Phone / URL / Barcode | Single Line Text, Long Text, Rich Text | Original string preserved |
| Number / Currency / Percent / Rating / Duration | Each other; or text types | Value preserved, only display format changes |
| Percent (Progress) | Number | Value preserved |
| Date | Date Time (with `T00:00:00Z`); or text types | Date / original value preserved |
| Member | Single Line Text, Long Text, Rich Text | Member ID preserved (no longer linked to a member) |
| Formula | Other types (frozen as a static value) | Current computed result is fixed and stops recalculating |

> When a reference type (Member, Single/Multi Select) is converted to text, the **original ID string is preserved** (strictly lossless). Resolving it to a name or option label is lossy and is never done; the UI shows a notice: "the ID is kept and the link to the member/option is removed."

### 4. Pre-conversion value compatibility check

Even when a conversion is on the allowlist, all existing values are validated against the target type before saving. If any record cannot be carried by the target type and cannot be migrated losslessly, the system **rejects the entire conversion** and returns the number of incompatible records plus samples — values are never silently rewritten or cleared.

### 5. Prohibited conversions

The following types are prohibited in both directions and appear greyed-out with a reason in the type selector:

- **System-maintained types**: Created By, Created Time, Updated By, Updated Time, Auto Number.
- **Reference / computed types**: Link, Lookup, Rollup, Button.
- **Target is Formula**: a formula requires an expression, so converting another field "into" a formula is forbidden.
- **Primary field restriction**: the primary field (used as the record title) may only be converted among text types. **Exception**: a primary auto-number field with data may be demoted to a text type (single/long/rich text); the reverse (primary text → auto-number) remains forbidden.
- **Text → Phone/Email/URL**: when a single/long/rich text field already has data, converting it to Phone, Email, or URL is forbidden, otherwise existing text may fail the target format validation and produce invalid data. (Empty fields are not restricted.)

> For the full decision order, lossless/lossy allowlists, and reason mapping, see [Field Type Conversion Rules](/en-US/user-guide/field-types/field-type-conversion.html).

## Common Configuration

Most fields support the following settings:

- **Field Name** — Display name of the column.
- **Field Description** — Help text shown to collaborators.
- **Required** — Whether the field must contain a value.
- **Default Value** — Value applied automatically to new records.
- **Validation Rules** — Length, range, regex, or format checks.

## Text and Numeric Fields

### Single Line Text
Short text such as names or titles. Supports maximum length and regex validation.

### Long Text
Multi-line text for descriptions and notes. Supports line breaks and Markdown rendering.

### Rich Text
HTML rich text with formatting such as bold, lists, links, and tables.

### Number
Integers or decimals. Configure decimal places, minimum/maximum values, and display format (number, currency, or percentage).

## Date and Selection Fields

### Date / Date Time
Choose dates or date-times from a picker. Support multiple display formats.

### Single Select / Multi Select
Choose from predefined options. Set custom colors and default options. Multi Select displays values as tags.

### Checkbox
A simple true/false toggle. Useful for completion flags.

## People, Contact, and Media

### Member
Reference system users or team members. Supports single or multiple selection and can default to the current user.

### Phone / Email / URL
Validated contact fields. URLs are clickable and open in a new tab.

### Attachment
Upload images, documents, and other files. Supports previews, thumbnails, and downloads.

## Computed and Relational Fields

### Formula
Calculate values using 47 built-in functions. Reference other fields and nest functions for math, text, date, logic, and statistics.

```javascript
{Unit Price} * {Quantity}

IF({Score} >= 90, "Excellent", IF({Score} >= 60, "Pass", "Fail"))
```

### Link
Create relationships between records in the same or different tables. Supports one-to-one, one-to-many, and many-to-many relationships.

### Lookup
Pull values from linked records and aggregate them with sum, average, count, and more.

## System Fields

System fields are managed automatically:

| Field | Purpose |
|-------|---------|
| Created By | User who created the record |
| Created Time | Timestamp when the record was created |
| Updated By | User who last modified the record |
| Updated Time | Timestamp of the last modification |
| Auto Number | Auto-incrementing ID with optional prefix, suffix, date format, and padding |

## Related Links

- [Field Type Conversion Rules](/en-US/user-guide/field-types/field-type-conversion.html)
- [Link Field](/en-US/user-guide/field-types/link-field.html)
- [Lookup Field](/en-US/user-guide/field-types/lookup-field.html)
- [Formula Field](/en-US/user-guide/field-types/formula-field.html)
- [Table Operations](/en-US/user-guide/table-operations.html)
- [Workflow Automation](/en-US/user-guide/workflow.html)
