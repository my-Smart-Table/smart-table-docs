# Collaboration

SmartTable is designed for team work. Whether your team is in the same room or distributed, you can share data, manage permissions, and edit together in real time.

## Sharing

<img src="/images/user-guide/basic-features/collaboration/collaboration-sharing.png" alt="Base sharing" style="max-width: 100%; border: 1px solid #e0e0e0; border-radius: 4px;">

You can share SmartTable data at several levels:

| Sharing Level | What It Does |
|---------------|--------------|
| Base Sharing | Share the whole base via a link with permission control |
| Table Sharing | Share a single table via a link without inviting users to the whole base |
| Form Sharing | Share a form view publicly to collect submissions |
| Dashboard Sharing | Share a dashboard publicly for real-time data display |

<img src="/images/user-guide/basic-features/collaboration/collaboration-form-sharing.png" alt="Form sharing" style="max-width: 100%; border: 1px solid #e0e0e0; border-radius: 4px;">

### Table Sharing

Besides base-level sharing, you can share a single table via a link. Recipients can access that table without joining the whole base — ideal when you only need to share part of your data.

#### Enabling and Configuring

1. Open the target table and click the **Share** button next to the view switcher (visible to the base owner/admins only).
2. Click **Enable Share** in the "Share Table" dialog to generate a dedicated link.
3. Copy the link and send it to others.

Available options:

| Option | Description |
|--------|-------------|
| **Who Can Join** | Permission granted to joiners: Editor / Commenter / Viewer. |
| **View Scope** | All views, or restrict the share to specific views (multi-select). |
| **Validity** | Permanent, 7 days, 30 days, or a custom expiration date; the link expires automatically afterwards. |

The link can be toggled **active/inactive** at any time — an inactive link stops working immediately. The dialog also shows the total visit count. Clicking **Delete** permanently removes the share link and revokes access for all joined users.

#### Joining and Access

- Opening the link shows a landing page with the table name, its base, and the included views; clicking **Enter Table** joins the share.
- After joining, the table automatically appears in the user's home table list and the **Shared with me** list, so it can be reopened from the list without the link.
- Users who joined only via a table share have **restricted access**: they can only see the shared table and its visible views, never other tables in the base, and base-level management features (member management, plugins, etc.) are unavailable to them.

#### Managing Joined Users

The **Joined Users** list at the bottom of the "Share Table" dialog shows everyone who joined via the link (avatar, name, email, and join time):

- The base owner or admins can click the **Remove** button at the end of a user row and confirm to remove that user from the share, revoking all their table-sharing access.
- You cannot remove yourself; users without permission cannot remove members.
- Once removed, the user disappears from the member list and their "Shared with me" list immediately and loses access; if the link is still active and unexpired, they can rejoin via the original link.

::: tip Relation to Base Sharing
Table sharing is independent of base sharing. A recipient can access a single table without joining the base; if they are later added as a base member, they automatically get access by their member role instead of the table share.
:::

## Member Management

Each base has its own member list. You can invite users by email or username and assign one of the following roles:

| Role | Permissions |
|------|-------------|
| Owner | Full control, including deletion |
| Admin | Management permissions except deletion |
| Editor | Can add, edit, and delete records |
| Commenter | Can view and add comments |
| Viewer | Read-only access |

### Transferring Ownership

Base ownership can be transferred to another user, which is useful for handovers and organizational changes. Only the **current owner** can perform the transfer:

1. Open the member management dialog and click the **Transfer Ownership** button on the owner row.
2. Search and select the target user by name or email (the user doesn't have to be an existing base member).
3. Choose what happens to your own access after the transfer:
   - **Keep my collaboration permission**: pick a role among Admin / Editor / Commenter / Viewer; the previous owner will be downgraded to that role.
   - **Don't keep my collaboration permission**: the previous owner immediately loses all access to the base.
4. Click **Transfer** to confirm.

After the transfer:

- The target user becomes the new owner immediately, with full control (including transferring ownership again and deleting the base).
- The previous owner is downgraded to the selected role or removed from the base, depending on the configuration chosen at transfer time.
- Both parties receive in-app and email notifications.

::: warning Caution
The transfer takes effect immediately and cannot be undone — the new owner must transfer it back if you want ownership restored. If you choose not to keep your collaboration permission, you lose access to the base immediately.
:::

## Real-time Collaborative Editing

When real-time collaboration is enabled, multiple users can edit the same table at the same time:

- **Online Presence** — See who is currently viewing or editing.
- **View Sync** — Follow collaborators' view switches and scroll positions.
- **Cell Locking** — Cells being edited are locked to prevent conflicts.
- **Conflict Detection** — Optimistic locking detects and reports collisions.
- **Offline Queue** — Changes are cached locally and replayed after reconnection.
- **Graceful Degradation** — Falls back to normal mode if WebSocket is unavailable.

::: tip Enabling Real-time
Real-time collaboration is optional and is enabled on the backend with `ENABLE_REALTIME=true` or `--enable-realtime`. See [Docker Deployment](/en-US/developer/deployment/docker.html) for configuration details.
:::

## Record Comments & @Mentions

SmartTable lets teams discuss records in place: members can comment on a record, reply to others to build a thread, use `@` to mention teammates, and follow important records to receive updates. Comments live in the **Comments** tab at the top of the record detail drawer.

### Overview

- **Record comments** — View and add comments from the record detail drawer, with pagination and chronological ordering.
- **Replies** — Reply to any comment to build a threaded discussion.
- **@Mentions** — Type `@name` to mention a member who can access the record; mentioned users are notified.
- **Follow records** — Follow a record to be notified when it receives new comments.
- **Notifications** — @mentions, replies, and new comments on followed records trigger in-app and email notifications (configurable in Notification Settings).

> For step-by-step instructions, see the [Comments & @Mentions User Manual](/en-US/user-guide/comments.html).

### Who Can Comment

Comment permissions follow Base member roles and table-share roles:

| Role | Read | Comment | Edit/Delete own | Delete any |
| --- | :---: | :---: | :---: | :---: |
| **Owner / Admin** | ✅ | ✅ | ✅ | ✅ |
| **Editor** | ✅ | ✅ | ✅ | ✅ |
| **Commenter** | ✅ | ✅ | ✅ | — |
| **Viewer** | ✅ | — | — | — |

Users who join via a table share get the permissions of the role they joined with (editor / commenter / viewer).

### Notification Settings

Comment-related notifications can be toggled individually in personal Notification Settings (all enabled by default):

- **Notify on @mention** — when you are mentioned in a comment.
- **Notify on reply** — when someone replies to your comment.
- **Notify on new record comment** — when a record you follow gets a new comment.

Notifications use an "in-app first" strategy: they are written to the in-app message center, and an email is also sent when an email service is configured. See [In-App Notifications](/en-US/user-guide/notification.html) for other notification types.

## Request Tracking and Local Cache

SmartTable includes collaboration-supporting infrastructure:

- **Request Tracking System** — Request IDs trace requests end to end and standardize error handling.
- **Local Cache System** — IndexedDB caches collaboration state, auth, and config, reducing config requests by 90%+.

## Related Links

- [Comments & @Mentions User Manual](/en-US/user-guide/comments.html)
- [Table Operations](/en-US/user-guide/table-operations.html)
- [Workflow Automation](/en-US/user-guide/workflow.html)
- [Docker Deployment](/en-US/developer/deployment/docker.html)
