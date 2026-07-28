# Field Types

SmartTable provides rich field types to meet different data storage and display needs. Each field type has its specific purpose and configuration options.

## Basic Field Types

### Text Field

Used to store short text content such as names, titles, etc.

**Features**:
- Maximum length: 255 characters
- Supports text formatting
- Can set default values

**Configuration Options**:
- Maximum length limit
- Required option
- Regular expression validation

### Long Text Field

Used to store longer text content such as descriptions, notes, etc.

**Features**:
- No length limit
- Supports line breaks
- Supports Markdown format

**Applicable Scenarios**:
- Product descriptions
- Task notes
- Meeting records

### Number Field

Used to store numerical data such as prices, quantities, etc.

**Features**:
- Supports integers and decimals
- Can set numeric range
- Supports number formatting

**Configuration Options**:
- Decimal places
- Minimum/maximum value
- Number format (currency, percentage, etc.)

### Date Field

Used to store date and time information.

**Features**:
- Supports date picker
- Supports time selection
- Supports date range

**Format Options**:
- YYYY-MM-DD
- YYYY/MM/DD
- MM/DD/YYYY

## Advanced Field Types

### Select Field

Select one or more values from preset options.

**Types**:
- **Single Select**: Only one option can be selected
- **Multi Select**: Multiple options can be selected

**Configuration**:
- Define option list
- Set default option
- Set option colors

### Member Field

Associate system users or team members.

**Features**:
- Supports single and multiple selection
- Display user avatars
- Support notification function

**Applicable Scenarios**:
- Task owners
- Project members
- Approvers

### Link Field

Associate records from other tables.

**Features**:
- Establish relationships between tables
- Support bidirectional association
- Support rollup statistics

**Examples**:
- Orders associated with customers
- Tasks associated with projects
- Comments associated with articles

### Formula Field

Automatically calculate field values through formulas.

**Supported Operations**:
- Mathematical operations: +, -, *, /
- Text operations: concatenate, substring
- Date calculations: date difference, date add/subtract
- Logical operations: IF, AND, OR

**Example Formulas**:
```
// Calculate total price
{Unit Price} * {Quantity}

// Calculate completion percentage
{Completed Tasks} / {Total Tasks} * 100

// Generate unique number
"TASK-" + YEAR(TODAY()) + "-" + ROW()
```

## Special Field Types

### Attachment Field

Upload and manage file attachments.

**Features**:
- Supports multiple file formats
- File size limit: 10MB
- Supports image preview

**Supported Formats**:
- Images: jpg, png, gif
- Documents: pdf, doc, xls
- Archives: zip, rar

### URL Field

Store external link addresses.

**Features**:
- Automatically recognize link format
- Support link title
- Open in new window

### Checkbox Field

Used to represent yes/no status.

**Features**:
- Two states: checked/unchecked
- Can set default state
- Support filtering and statistics

## Field Configuration

### Common Configuration

All fields support the following configurations:

- **Field Name**: Display name of the field
- **Field Description**: Description text of the field
- **Required Option**: Whether it must be filled
- **Default Value**: Default value when creating new records

### Field Permissions

You can set field access permissions:

- **Editable**: All users can edit
- **Read-only**: All users can only view
- **Hidden**: Hidden for specific user groups

## Related Links

- [Table Operations](/en-US/user-guide/table-operations)
- [Workflow Automation](/en-US/user-guide/workflow)
