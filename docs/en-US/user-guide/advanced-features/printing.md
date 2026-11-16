---
title: Printing
---

# Printing

Printing provides "**visual template design + data-filled printing**": design print templates by drag and drop, and record data is filled in automatically at print time with display values consistent with the grid view. It supports template sharing, import/export, two batch printing modes (record-wise / summary), and overprinting on pre-printed forms.

> Printing is a feature of the **Standard Edition and above**. Rendering is purely front-end (hiprint engine) and printing is done via the browser print dialog — no client installation required.

## Entry & Permissions

Enter the **grid view** of a Base workspace; the **Print** dropdown is visible in the top toolbar (next to the import/export buttons):

| Menu item | Description |
|---|---|
| Quick Print | Choose a template and data scope, preview, then print |
| Manage Print Templates | Create / edit / delete / share / import / export templates |

Permission rules: printing with a template requires Base membership (Viewer and above); creating a template requires Editor and above; editing/deleting other people's templates requires Base Admin/Owner. Template visibility is either **private** (creator only) or **shared** (roles no lower than the configured "minimum role").

## Template Management

Click "Manage Print Templates" to open the management dialog; the list is grouped into **My Templates** and **Shared Templates**.

- **Create / Edit design**: opens the full-screen designer; drag elements, fill in the name and save. The system protects against accidental overwrites: if the canvas is unexpectedly empty while the original template has content, saving asks for confirmation
- **Permission settings**: choose private / shared (and set the minimum role)
- **Export**: downloads a `.json` file (shared across Bases / instances); the designer's top-bar "Export" exports the current unsaved design
- **Import**: choose a `.json` file; the system validates file type (`smart-table-print-template`), version and size (≤1MB). If bound fields do not exist in the current table, a yellow notice is shown without blocking the import; imported templates are created as private
- **Copy / Delete**: copy creates a private copy; delete requires confirmation

## Template Designer

The designer is a full-screen interface: title area (template name / visibility / description) + toolbar + left panel + design canvas + right property panel.

**Toolbar**:

- Paper type: A3 / A4 / A5 / B3 / B4 / B5 / custom (width & height in mm, 10–500); page-number toggle
- Zoom (50%–200%, affects the design view only), rotate (portrait/landscape), clear
- Preview (uses the first table record as sample data and matches the final print exactly), export, save template

**Left panel** (three collapsible groups):

| Group | Content |
|---|---|
| Common elements | Text, multi-line text, **data table**, image, barcode / QR code, horizontal / vertical line, rectangle, ellipse |
| System fields | Created time, updated time, created by, updated by — drag in directly |
| Table fields | All fields of the current table, icons matching field types |

### Data Table Element (core of summary printing)

The "summary" mode renders all records into one large table, which requires the **data table** element:

1. Drag a data table in from the common elements area (3 placeholder columns by default)
2. **Click a column to select → double-click the header text** → pick a field from the inline dropdown; the column binds automatically (the header updates to the field's display name)
3. Save the template and choose the "Summary" mode in Quick Print

::: warning Use the field name, not the field ID
The column `field` must exactly match the field's **name** (e.g. `amount`); using a field ID (e.g. `fld_abc123`) leaves the column blank. Keep the element-level `field` property of the data table at its default `table` value.
:::

**Mode selection guide**:

| Scenario | Recommendation |
|---|---|
| Contracts, invoices, labels (one record per page) | Record-wise printing + normal field elements |
| Reports, lists, statements (many records per page) | Summary printing + data table element |
| More than 10 columns | Prefer record-wise printing |

## Quick Print

Click "Print → Quick Print":

1. **Choose a template**: all templates visible to you under the current table
2. **Data scope**: the N selected records (select rows in the grid first) / all records of the current view
3. **Print mode**: record-wise (one page per record) / summary (single-page list; the template must contain a data table element)
4. Preview renders in chunks (every 10 records, up to the first 50 records); after confirmation it is sent to the browser print dialog

**Recommended browser print settings**: margins "Default or None"; scale fixed at **100%** (do not choose "Fit to page", which breaks millimeter positioning).

## Field Display Value Rules

Printed values match the grid view: single/multi-select show option names, members show user names, links show record titles, attachments show "N attachments", formulas show computed results, and dates are formatted in the table's timezone. **Signature fields** are printed as image elements (attachments are pre-fetched as base64 DataURLs); empty signatures leave the area blank.

## Overprinting (Pre-printed Forms)

Print only variable data onto pre-printed forms:

1. Scan the blank form as an image and insert it as a picture element filling the page, placed at the bottom as an alignment guide
2. Drag in field elements and align precisely against the guide using rulers + grid + zoom
3. **Delete the guide image and save** (the guide is not printed)
4. Printer offset calibration: adjust `leftOffset` / `topOffset` in paper settings; set margins to "None" and scale to 100% in the browser print dialog

Browser print precision is typically ±1mm; for invoices and multi-part dot-matrix forms, connect the electron-hiprint desktop print client (integration is built in).

## FAQ

- **Printed ids instead of names**: make sure elements are bound via fields from the field panel rather than hand-typed field values
- **Page numbers unwanted**: untick "Show page numbers" in the toolbar
- **Some fields empty after importing a template**: the yellow notice lists bound fields missing in the current table; rebind them in the designer and save
- **Preview differs from print output**: set printer margins to "None" and scale to 100%, then retry
- **Silent printing**: browser printing must go through the system dialog; use electron-hiprint for silent printing
- **Time off by hours**: dates are formatted in the table's timezone; check the workspace timezone setting
- **Designer preview shows only the first record**: the designer preview always uses the first record; to check multiple records use Quick Print and choose a data scope
