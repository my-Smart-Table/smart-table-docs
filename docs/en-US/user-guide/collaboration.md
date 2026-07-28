# Collaboration

SmartTable is designed for team work. Whether your team is in the same room or distributed, you can share data, manage permissions, and edit together in real time.

## Sharing

You can share SmartTable data at several levels:

| Sharing Level | What It Does |
|---------------|--------------|
| Base Sharing | Share the whole base via a link with permission control |
| Form Sharing | Share a form view publicly to collect submissions |
| Dashboard Sharing | Share a dashboard publicly for real-time data display |

## Member Management

Each base has its own member list. You can invite users by email or username and assign one of the following roles:

| Role | Permissions |
|------|-------------|
| Owner | Full control, including deletion |
| Admin | Management permissions except deletion |
| Editor | Can add, edit, and delete records |
| Commenter | Can view and add comments |
| Viewer | Read-only access |

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

## Comments and @Mentions

You can discuss records directly inside SmartTable:

1. Open a record's detail panel.
2. Add a comment in the comments area.
3. Type `@username` to mention a team member.
4. Mentioned users receive a notification.

## Notifications

Configure notifications to stay informed about:

- Record modifications
- @mentions
- Approaching deadlines
- Workflow execution results

## Request Tracking and Local Cache

SmartTable includes collaboration-supporting infrastructure:

- **Request Tracking System** — Request IDs trace requests end to end and standardize error handling.
- **Local Cache System** — IndexedDB caches collaboration state, auth, and config, reducing config requests by 90%+.

## Related Links

- [Table Operations](/en-US/user-guide/table-operations.html)
- [Workflow Automation](/en-US/user-guide/workflow.html)
- [Docker Deployment](/en-US/developer/deployment/docker.html)
