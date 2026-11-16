---
title: Approval Flows
---

# Approval Flows

Approval Flows is a complete process orchestration and execution engine: administrators design flow nodes and routing rules on a visual canvas, end users initiate approvals from table records, and approvers process tasks in flow order. Approval flows are deeply bound to data tables — approval forms are generated automatically from the table structure, and each approval instance is linked to one table record.

> Approval Flows is a feature of the **Professional Edition**. Typical scenarios: leave requests, expense reimbursement, contract approval, onboarding approval, purchase requests, etc.

## Core Concepts Quick Reference

**Flow states**: Draft (freely editable) → Published (initiation allowed, configuration changes restricted) → Paused (no new instances, editable) → Archived.

**Node types** (6):

| Node | Description | Count requirement |
|---|---|---|
| Start node | Defines the form fields the initiator fills in | Exactly 1 |
| Approval node | Creates to-do tasks; approvers approve / reject / transfer | Multiple |
| CC node | Notifies relevant people; no action permission | Multiple |
| Condition branch | Routes the flow based on record field values | Multiple |
| Auto-fill | Writes values back to table fields automatically | Multiple |
| End node | Marks the end of the flow | Exactly 1 |

**Approval modes** (3):

| Mode | Logic |
|---|---|
| OR-sign (any) | Any one approver approving closes other to-dos and advances the flow |
| AND-sign (all) | All approvers must approve before the flow continues |
| Serial | Tasks are created one by one in order; after one approves, the next task is created |

**Approver sources** (5): fixed users, single-member field (e.g. "Direct Supervisor"), multi-member field, Base role, record creator.

## Quick Start

1. **Preparation**: prepare a data table with business fields (member fields can dynamically designate approvers) and make sure approvers have joined the Base
2. **Create**: Base sidebar → Approval Flow Management → New Approval Flow → choose the table and fill in the name
3. **Design nodes**: add approval / CC / condition / auto-fill nodes from the left panel and configure approver sources and modes in the right panel; connect nodes to set the routing path
4. **Configure the form**: click the start node → Form Fields tab → check fields to show at initiation and set required, title override, placeholder and display mode
5. **Publish**: click Publish; after integrity validation (start/end nodes, approver configuration, outgoing edges) a version snapshot is generated

## Flow Design in Depth

**Canvas operations**: add / select / move / connect nodes (drag from the right-side dot of a node), disconnect (Delete), zoom, minimap navigation.

**Node configuration essentials**:

- **Approval node**: approver source + approval mode + timeout and timeout action + field permissions (writable / read-only / hidden)
- **Condition branch**: set conditions per branch (field + operator + value, AND/OR supported); always configure a default branch
- **Auto-fill**: configure the mapping of target fields to written values (e.g. set "Contract Status" to "Effective" after approval)
- **Node edges**: every node must have at least one outgoing edge

**Field display modes at initiation**: normal (editable) / read-only / hidden.

## Version Management & Publishing

Every publish creates an **immutable version snapshot**. Core mechanism: **an instance freezes its version number at start**; later changes (pause → edit → re-publish) create new versions but do not affect running instances — running instances complete under the rules frozen at start, and new rules only apply to newly initiated approvals.

| Item | Draft | Published | Paused |
|---|---|---|---|
| Name / description | Editable | Editable | Editable |
| Linked table | Editable | Not editable | Not editable |
| Node / form configuration | Editable | Not editable | Editable |

"Version History" on the design page shows all versions with snapshot details and supports version diff comparison.

## Initiating Approvals

Three entries:

1. **From the grid**: select a record → More Actions → Initiate Approval → choose a published flow
2. **Initiation page**: Base sidebar → Initiate Flow, showing initiatable flows grouped by linked table
3. **Custom applications**: administrators can integrate the "Initiate Flow" page into an application (cross-Base aggregation supported)

The initiation form auto-fills record data (read-only); required fields are validated before submission, and the flow path can be previewed before submitting.

## Processing Approvals

**Entry**: sidebar → Approval Tasks → My To-dos.

- **Approve**: review the flow diagram (current node highlighted) and form data → add an optional comment → confirm. In OR-sign mode, one approval automatically closes other to-dos of the same node
- **Reject**: a **rejection comment is required**; rejection terminates the whole instance, closes all to-dos of the node, and creates a **return task** for the initiator
- **Transfer**: choose a new approver; flow progress unchanged
- **Resubmit**: the initiator processes the return task in "Initiated by Me", edits editable fields and resubmits; the flow restarts from the last completed node before the rejected node (already-approved nodes are not re-executed)
- **Void**: after rejection the initiator may void the instance, which becomes "Cancelled"
- **Editing fields during approval**: when the node allows writable fields, approvers can edit values directly and changes are written to the database

## Approval Tasks & Instance Details

Approval Tasks offers 4 views: **My To-dos / My Done / CC'd to Me / Initiated by Me** (CC items are view-only).

The instance detail dialog (fullscreen supported) provides:

- **Flow diagram**: real-time node status (current node orange, completed green, rejected red, returned orange, transferred blue, auto-closed grey, not-reached dashed)
- **Node round timeline**: multiple rounds caused by reject-resubmit cycles (arrival time, processing time, approver, comment)
- **Form data**: rendered smartly by field type; fields edited during approval show the modified values
- **Comments & history**: an approval-comment timeline, manual comments and a complete event log (start / approve / reject / transfer / return / resubmit / void / complete)

## Integration into Custom Applications

- **Flow initiation page**: binds one or more published flows (cross-Base supported), aggregated as card lists
- **Approval tasks page**: the same 4 sub-tabs as the Base version, showing only flows bound by the administrator and isolated by user permissions

## Notifications

| Trigger event | Notified party |
|---|---|
| New to-do created | Approver |
| Approved / rejected / flow completed | Initiator |
| Task transferred | New approver |
| CC | CC recipients |

With realtime collaboration enabled (`REALTIME_ENABLED=true`), new to-dos are pushed via SocketIO without refreshing the page.

## Permissions

| Role | Create/design flows | Initiate approvals | Process approvals |
|---|---|---|---|
| Owner / Editor | ✅ | ✅ | ✅ (when assigned as approver) |
| Viewer | ❌ | ✅ (with permission on the linked table) | ✅ (when assigned as approver) |

## FAQ

- **Publish button greyed out**: the flow is incomplete (missing start/end nodes or approver configuration) or the user lacks EDITOR permission
- **Does editing a flow affect running instances**: no, instances execute under the version frozen at start
- **No condition matches**: the default branch is taken; without one the flow stops and logs a warning — **always configure a default branch**
- **To-do list empty**: confirm the flow is published and that the approver source resolves to include the current user
- **Resubmission after rejection**: already-approved nodes are not re-executed; the rejected node and everything after it are re-created
