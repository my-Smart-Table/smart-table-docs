---
title: Advanced Permissions
---

# Advanced Permissions

Advanced Permissions builds on the basic permission system (Owner / Admin / Editor / Commenter / Viewer) to provide finer-grained access control: **permission rule groups** aggregate multi-dimensional permissions across fields, data, dashboards and documents into reusable units, which are then assigned to users or roles.

> Advanced Permissions is a feature of the **Standard Edition and above**.

## Permission Hierarchy

```
Basic permission system (Base level)
  ├── Owner — full control
  ├── Admin — management permissions
  ├── Editor — read-write permissions
  ├── Commenter — comment permissions
  └── Viewer — read-only permissions
        ↓
Advanced permission system (rule group level) — overrides / refines basic permissions
  ├── Field-level permissions — control view/edit of individual fields
  ├── Data permissions — control visible data scope
  ├── Dashboard permissions — control dashboard access
  └── Document permissions — control document access
```

## Permission Rule Group Management

**Path**: enter a Base → Permission Management → Rule Groups

| Operation | Description |
|---|---|
| Create rule group | Fill in name (required, ≤100 characters) and description, then save |
| Edit | Modify name and description |
| Enable / Disable | Toggle the switch in the list; a disabled rule group takes no effect but keeps its configuration |
| Copy | Copies all rule details and data conditions (assignments are not copied) |
| Delete | Cascades deletion of rule details, data conditions and assignments; irreversible |

## Field-level Permissions

Precisely control access to specific field columns — useful for hiding sensitive fields (salary, ID numbers) or restricting edits to key fields.

**Configuration**: rule group editor → Field Permissions tab. The UI shows all tables → fields of the Base as a tree, with batch setting supported.

| Permission value | Description |
|---|---|
| `none` | No access, field invisible |
| `read` | Read-only, viewable but not editable |
| `write` / `edit` | Viewable and editable |

Field permissions have the highest priority: after setting `none` on a field, the user cannot see it even as a Base Editor; after setting `write`, even a Viewer can edit that field.

## Data Permissions

Control the visible scope of records with two modes:

### Created by Me

Rule group editor → Data Permissions tab → select "Data created by me". Users only see records they created; Owner / Admin are not restricted.

### Conditional Filtering

Dynamically filter visible data by conditions:

- **Operators**: text (eq / ne / contains / not contains), number and date (gt / lt / gte / lte), boolean and member (eq / ne), generic (is empty / is not empty)
- **Dynamic variables**: `{current_user.id}`, `{current_user.name}`, `{current_user.email}`
- **Logic combinations**: multiple conditions support AND / OR, e.g. `Department = "Sales" AND Owner = {current_user.id}`

When field and data permissions both exist: field permissions filter columns first, then data permissions filter rows — the user sees the intersection of "visible fields × visible records".

## Dashboard & Document Permissions

| Resource | Permission values | Description |
|---|---|---|
| Dashboard | `none` / `view` / `edit` | No access / viewable / editable layout and components |
| Document | `none` / `view` / `edit` | No access / viewable / editable content |

Configuration: rule group editor → Dashboard Permissions / Document Permissions tab, set a permission value for each dashboard or document.

## Custom Roles

Every Base is initialized with 5 **system preset roles** (Owner / Admin / Editor / Commenter / Viewer) on creation: they cannot be deleted and only their description can be modified.

**Create a custom role**: Base → Permission Management → Role Management → New Role, fill in name and description and save.

**Assign rule groups to a role**: role detail → Permission Rule Groups area → select rule groups → assign. All users of the role inherit the permissions automatically.

## Permission Assignment

| Method | Description |
|---|---|
| Direct user assignment | Permission Management → Permission Assignment → assign rule groups to a user |
| Role inheritance | Rule groups assigned to a role are inherited by its members |
| Batch assignment | Permission Assignment → batch assignment, assigning the same rule group to multiple users at once |

**Effective permission preview**: select a user → Permission Preview to see the user's final field permissions, data permissions, and dashboard / document permissions.

## Permission Priority

```
Field permissions  >  Data permissions  >  Basic Base permissions
  (highest)                ↓                  (lowest)
              Dashboard / Document permissions
```

- Field permissions override all other levels (a field set to `read` for an Editor becomes read-only; a field set to `write` for a Viewer becomes editable)
- Data permissions restrict the visible scope of basic permissions
- Without rule group configuration, the system falls back to basic Base role permissions
- When multiple rule groups configure the same resource, the highest permission value wins (`write > edit > read > view > none`)

## FAQ

**Permissions not taking effect?** Check in order: ① whether the rule group is disabled; ② whether the user has received the rule group via direct assignment or role assignment; ③ whether the permission cache (up to 1 hour) has not refreshed — an administrator can clear the cache.

**Data permission conditions not working?** Check whether field IDs are correct, whether condition values match field types, dynamic variable spelling, and AND/OR logic.

**Cannot delete a role?** System preset roles cannot be deleted; only custom roles can, which cascades clearing of their rule group assignments and member references.

**Performance tips**: keep rule groups under 50 and custom roles under 20 per Base. Permission check results are cached for 1 hour; caches of affected users are automatically invalidated after permission changes.
