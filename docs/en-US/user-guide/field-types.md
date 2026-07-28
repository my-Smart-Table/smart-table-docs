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

- [Link Field](/en-US/user-guide/field-types/link-field.html)
- [Lookup Field](/en-US/user-guide/field-types/lookup-field.html)
- [Formula Field](/en-US/user-guide/field-types/formula-field.html)
- [Table Operations](/en-US/user-guide/table-operations.html)
- [Workflow Automation](/en-US/user-guide/workflow.html)
