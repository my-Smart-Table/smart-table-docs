# Field Type Conversion Rules

This document describes the complete decision logic and implementation rules for changing the type of an already-created field in SmartTable, for both product and development reference. The implementation lives in the backend `app/services/field_service.py` (`_is_valid_type_conversion`, `_evaluate_conversion`, `get_convertible_types`, `update_field`).

## 1. When It Triggers & The Three Outcomes

Changing the **field type** of an existing field makes the system evaluate the conversion based on:

- Whether the field **already contains data**;
- Whether the field is the **primary field** (record title);
- The source and target types.

The result is one of three verdicts:

| Verdict | Meaning | Frontend behavior |
| --- | --- | --- |
| `allowed` | Directly allowed (lossless) | Option clickable, converts immediately |
| `lossy` | Lossy, requires confirmation | Option clickable, confirmation dialog before submit |
| `forbidden` | Conversion prohibited | Option greyed out, with a prohibition reason |

The interface `get_convertible_types(field)` returns `{ hasData, allowed[], blocked[] }`, which the frontend uses to enable/disable options and show reasons and notices.

## 2. Overall Decision Order (`_is_valid_type_conversion`)

Evaluated top-to-bottom; **the first match wins**:

1. **Same type**: `from == to` → `allowed`.
2. **Primary auto-number demoted to text**: `is_primary && from == auto_number && to ∈ text types` → `allowed` (see Section 5).
3. **Field has no data**: `!has_data` → `allowed` (can be freely converted to any type, including system/reference/formula types; the target type's required config is validated and filled in by `update_field` during conversion).
4. **Text with data → contact types**: `from ∈ text types && to ∈ {phone, email, url}` → `forbidden` (see Section 6).
5. **System/reference/computed types forbidden both ways**: `from` or `to` hits `CONVERT_FORBIDDEN_TYPES` → `forbidden`.
6. **Target is formula**: `to == formula` → `forbidden` (a formula needs an expression; it is conceptually a new computed field).
7. **Lossless allowlist hit**: `to ∈ LOSSLESS_CONVERSIONS[from]` → `allowed`.
8. **Lossy allowlist hit**: `to ∈ LOSSY_CONVERSIONS[from]` → `lossy`.
9. **Everything else** → `forbidden`.

> Note: Step 3 ("no data → allowed") precedes steps 4–9, so an **empty field** can still be converted to phone/email/url (see Section 6). Step 2's auto-number exception only applies to "primary + auto_number → text".

## 3. Lossless Conversion Allowlist (field has data)

These conversions are all `allowed`; the original value information is fully preserved:

| From | Can convert to | Handling |
| --- | --- | --- |
| Single Line Text | Long Text, Rich Text | Original value preserved |
| Long Text | Rich Text | Original value preserved |
| Single Select | Multi Select; or text types | Single value wrapped as array `[value]` / option ID string preserved |
| Multi Select | Single/long/rich text | Option ID string preserved |
| Email / Phone / URL / Barcode | Single/long/rich text | Original string preserved |
| Number / Currency / Percent / Rating / Duration | Each other; or text types | Value preserved, only display format changes |
| Date | Date Time (with `T00:00:00Z`); or text types | Date / original value preserved |
| Date Time | Single/long/rich text | Original value preserved (→ Date is lossy, see below) |
| Member | Single/long/rich text | Member ID preserved (no longer linked to a member) |
| Formula | Text types, Number, Currency, Percent, Rating, Duration, Date, Date Time | Current computed result is frozen and stops recalculating |

> When a reference type (Member, Single/Multi Select) is converted to text, the **original ID string is preserved** (strictly lossless). Resolving it to a name or option label is lossy and is never done; a notice informs the user that "the ID is kept and the link to the member/option is removed".

## 4. Lossy Conversion (the single global exception)

| From | To | Note |
| --- | --- | --- |
| Date Time | Date | Only the date part is kept and the time part is discarded, **unrecoverably**. Verdict is `lossy`; a confirmation clearly states "the time part will be discarded and cannot be recovered" before proceeding. |

All other lossy conversions are forbidden (e.g., truncating long text, dropping options when converting multi-select to single select, resolving references to names), so data is never changed unexpectedly.

## 5. Primary Field Special Rules

Because the primary field is also the record title, it has extra constraints (evaluated in `_evaluate_conversion`, before `_is_valid_type_conversion`):

- **Primary (non-auto-number) field with data**: only conversions **among text types** are allowed; converting to any other type is `forbidden` with reason `field_type_conversion_primary_text_only`.
- **Primary auto-number field with data**: allowed to be **demoted to text types** (single/long/rich text). Auto-number values are integers, so converting to text is lossless and the primary field remains usable as the title.
- **Reverse (primary text with data → auto_number)**: remains `forbidden` (auto-number requires system-generated increments; existing text cannot serve as a number source).
- **Primary field with no data**: not subject to the above; can convert to any type (falls under "no data → allowed").

## 6. Text → Phone / Email / URL Prohibition

- **Rule**: when a **Single Line Text, Long Text, or Rich Text** field **already has data**, converting it to **Phone, Email, or URL** is `forbidden`, with reason `field_type_conversion_text_to_contact_blocked`.
- **Why**: existing text values often fail the target type's format validation (e.g., text `abc` is not a valid email/phone/URL), which would produce invalid data if allowed.
- **Empty-field exception**: when the field has no data, text can still be freely converted to phone/email/url under the general restrictions — there is no existing text to validate, consistent with the overall "no data → allowed" design.
- **Reverse is unaffected**: Phone/Email/URL → text types remain lossless and `allowed` (any valid phone/email/url is valid text).

## 7. Pre-conversion Value Compatibility Check

Even when the allowlist permits a conversion, `update_field` runs a compatibility pre-check (`_precheck_values`) over **all existing record values** before writing:

- For each record it takes the original value and validates it with `_value_fits_type(converted_value, target_type)`;
- If **any** value is incompatible, the entire field conversion is rejected, returning the incompatible count and samples;
- Values are **never** silently rewritten or cleared.

This pre-check is a safety net: when a conversion is permitted by the rules but individual data cannot be carried over, it prevents dirty data from being persisted.

## 8. Prohibition Reason Mapping

Different prohibition scenarios show a corresponding reason in the UI (i18n key):

| Scenario | i18n key |
| --- | --- |
| System field types (Created By / Updated By / Auto Number, etc.) | `field_type_conversion_blocked_system_type` |
| Reference/computed types (Link / Lookup / Rollup / Button, etc.) | `field_type_conversion_blocked_reference_type` |
| Target is Formula | `field_type_conversion_blocked_target_formula` |
| Primary (non-auto-number) field with data → non-text type | `field_type_conversion_primary_text_only` |
| Text with data → Phone / Email / URL | `field_type_conversion_text_to_contact_blocked` |
| Other lossy / not on allowlist | `field_type_conversion_blocked_lossy` |

## 9. Notice Scenarios

Some `allowed` conversions are lossless but change behavior; the frontend shows a notice (`notice` field of `_evaluate_conversion`):

| Conversion | Notice key |
| --- | --- |
| Lossy: Date Time → Date | `field_type_conversion_lossy_datetime_to_date` |
| Formula → other types (result frozen) | `field_type_conversion_notice_formula_freeze` |
| Member → text types (keep member ID) | `field_type_conversion_notice_keep_member_id` |
| Single/Multi Select → text types (keep option ID) | `field_type_conversion_notice_keep_option_id` |

## 10. Integration with Other Modules

- **`get_convertible_types(field)`**: provides the `allowed` / `blocked` list for the type selector, including the `lossy` flag and `notice` text, so the frontend can disable options, prompt confirmation, or show notices.
- **`update_field`**: first calls `_evaluate_conversion`. A `forbidden` verdict rejects immediately (returning `errorKey` for the frontend to identify the reason). A `lossy` verdict requires the client to resubmit with `confirmLossy`. After passing, it runs the value compatibility pre-check, then calls `_convert_record_values` to migrate all record values.

## Related Links

- [Field Types Overview](/en-US/user-guide/field-types.html)
- [Link Field](/en-US/user-guide/field-types/link-field.html)
- [Lookup Field](/en-US/user-guide/field-types/lookup-field.html)
- [Formula Field](/en-US/user-guide/field-types/formula-field.html)
