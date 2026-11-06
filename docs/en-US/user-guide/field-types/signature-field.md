# Signature Field

The Signature field lets users record a handwritten or electronic signature — perfect for contracts, approvals, receipts, attendance sign-offs, and any scenario that requires a responsible party to leave a mark. Once saved, the signature is stored as a **PNG image attachment** and displayed uniformly as a thumbnail across all views.

## Core Features

- **Two signing modes**: handwritten sign directly on a Canvas (mouse or touch), or type a name rendered in a print or handwriting font.
- **HiDPI Canvas**: sharp strokes on high-DPI displays.
- **Attachment-backed storage**: the generated PNG is uploaded via the attachment service; the field value is the attachment ID (`attachment_id`).
- **Cross-view rendering**: thumbnail in the table view, read-only in Kanban cards, editable in detail drawers and forms, supported in public form shares.
- **Safe deletion**: a confirmation dialog prevents accidental wipes; the backend attachment is cleaned up together with the record value.
- **Filter support**: exposes "is empty" / "is not empty" operators so you can filter records by whether they have been signed.

## How to Use

### Create a Signature field

Add a new field in the field manager and choose **Signature**. Signature fields do **not** support default values — a signature must always come from a real user action.

### Signing

In any editable view (table, form, detail drawer, add-record dialog):

1. Click the **Sign** button (first time) or the signature thumbnail's **pencil** icon (to re-sign).
2. In the popup panel, pick a mode:
   - **Handwritten**: draw directly on the Canvas with mouse or finger. Adjust stroke thickness, color, and background below.
   - **Typed**: enter a name and choose between print and handwriting fonts; preview updates in real time.
3. Click **Clear** to start over, **Cancel** to discard, or **Save** to finalize.

### Deleting a signature

In any editable view:

- Click the 🗑 delete icon that appears in the top-right corner of an existing signature thumbnail. Confirm in the dialog.
- The attachment is permanently deleted from storage and cannot be recovered.

### Behavior by view

| View | Behavior |
| --- | --- |
| Table view (VTable) | Renders as a 32×32 thumbnail; click the cell to open the signing panel |
| Kanban view | Read-only thumbnail in the card; click the card to open the detail drawer |
| Detail drawer | Full SignatureField component: thumbnail + Sign button + hover overlay |
| Form view | Same as detail drawer — sign and save directly |
| Public form share | Same as form view, with anonymous sign-in support |
| Gallery view | Displayed as an image card |

## Data structure

A Signature field stores a **string (attachment ID)** in the record's `values`:

```json
{
  "signature": "att_xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
}
```

That ID points to a PNG image row in the attachment table. Use the attachment service to download the Blob or get a thumbnail preview URL.

## Backend validation

`FieldService` enforces the following for Signature fields:

- **No default value**: configuring a default value on a Signature field fails with `Field "xxx" is a Signature field and does not support default values`.
- **Value type**: the value must be `string | null` (attachment ID or empty); other types are rejected.
- **Attachment lifecycle**: old attachments are automatically cleaned from storage when the signature is updated, preventing orphan files.

## Import and export

- **Import**: Signature fields cannot be populated from Excel/CSV imports, since a signature image cannot be reconstructed from a text column.
- **Export**: the field is exported as empty (or as the raw attachment ID, depending on the format). Signature images are **not** bundled with the table export — download them individually from the attachment manager.

## Notes

1. **No undo**: once saved, a signature is effective. Use "Re-sign" to change it.
2. **Storage**: each signature generates a PNG (usually tens of KB) against your attachment storage quota.
3. **Keyboard-safe**: the Signature field **does not listen to global Delete/Backspace** events to avoid conflicting with text inputs elsewhere on the page.
4. **Anonymous shares**: signatures submitted via a public form are downloaded from the backend on viewing — they do not rely on IndexedDB local cache.

## Related links

- [Field Types Overview](/en-US/user-guide/field-types.html)
- [Field Type Conversion Rules](/en-US/user-guide/field-types/field-type-conversion.html)
