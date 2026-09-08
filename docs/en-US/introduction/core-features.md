# Core Features

SmartTable provides a complete set of tools for personal productivity, team collaboration and plugin-based extensibility. This page summarizes the main capabilities you will use every day.

## Multiple Views

SmartTable supports 7 view types. Each view is a different lens on the same table data, with its own filters, sorts, and display options:

| View | Description |
|------|-------------|
| Table View | Classic grid with virtual scroll, column freeze, and field filtering |
| Grouped View | Group records by one or more fields with collapsible sections |
| Kanban View | Card-based board with drag-and-drop column movement |
| Calendar View | Date-based layout for events and deadlines |
| Gantt View | Project timeline with task bars and dependencies |
| Form View | Public-facing data collection form |
| Gallery View | Image and media card grid |

## Rich Field Types

SmartTable offers 27 field types across 10 categories. See [Field Types](/en-US/user-guide/field-types.html) for full details.

| Category | Examples |
|----------|----------|
| Text | Single Line Text, Long Text, Rich Text |
| Numeric | Number (integer/decimal/currency/percent) |
| Date | Date, Date Time |
| Selection | Single Select, Multi Select, Checkbox |
| People & Contact | Member, Phone, Email, URL |
| Media | Attachment (images, files, thumbnails) |
| Computed | Formula with 47 built-in functions |
| Relation | Link, Lookup with aggregation |
| System | Created By, Created Time, Updated By, Updated Time, Auto Number |
| Geolocation | Geolocation (province/city/district, country/region, lat-lng, map picker, multi-language) |
| Others | Rating, Progress |

## Data Processing

Work with large datasets using advanced data tools:

- **Filtering** — Combine multiple conditions with AND/OR logic and 20+ operators.
- **Sorting** — Sort by multiple fields and drag to change priority.
- **Grouping** — Group by up to 3 fields with group-level statistics.
- **Formula Engine** — Reference fields and nest 47 functions for math, text, date, logic, and statistics.
- **Streaming Data Loading** — First screen renders in seconds for 10,000+ rows; remaining pages load asynchronously in the background.
- **Import & Export** — Move data in and out using Excel, CSV, or JSON.

## Workflow Automation

The visual workflow engine (new in v1.6.0) helps you automate repetitive tasks:

- **Triggers** — Specified time, record creation, or record update.
- **Action Nodes** — Create record, update record, call webhook, or branch on conditions.
- **Versioning** — Save snapshots, view history, and roll back changes.
- **Management** — Pause, resume, edit, and bind workflows to tables.

Read more in [Workflow Automation](/en-US/user-guide/workflow.html).

## Plugin System (Extensibility)

SmartTable ships with a plugin mechanism that extends the table beyond built-in features while keeping clear security boundaries:

- **Two plugin types**
  - **UI plugins** run inside a sandboxed iframe (`sandbox="allow-scripts"`, opaque origin — no access to host cookies, localStorage or DOM). The host injects a Vue 3 runtime, so plugins can be written with standard Vue template syntax (`v-model`, `v-for`, `@click`, reactive data) as a single file — no build step required.
  - **Script plugins** run in a restricted subprocess (module allowlist, dangerous builtins removed); data operations are proxied and authorized as the triggering user.
- **Lifecycle**: upload/install, global enable/disable, base-level install/enable/remove, upgrade, rollback to a previous version, and uninstall — all from the plugin management page. Base pages have no install entry: enabled plugins are ready to use.
- **Two-level configuration**: `global` and `base` scopes (base is deep-merged over global), validated against the plugin's `configSchema`.
- **Two-layer permissions**: plugin manifest declarations plus user RBAC, deny by default, enforced per method on the host side.
- **Selection channel**: records selected in the table are passed to the plugin as an open-time snapshot (IDs only, capped at 1000, with select-all/truncated flags). Extension points may declare `requiresSelection` / `maxSelection`; the host disables the entry with a hint when unsatisfied.
- **Safety**: short-lived signed URLs for the sandbox, zip path-traversal and zip-bomb protection, script timeouts and concurrency limits, automatic `error` state after consecutive failures.
- **Run logs**: status, duration, output, result and stack traces, queryable per base with a result dialog and log detail view.

## Collaboration & Sharing

SmartTable is built for teams:

- **Sharing** — Share an entire base, a form view, or a dashboard with fine-grained permissions.
- **Member Management** — Invite members and assign roles from Owner to Viewer.
- **Real-time Collaboration** — Optional WebSocket collaboration with presence, view sync, cell locking, conflict detection, and offline replay.
- **Request Tracking** — Full-chain request IDs and standardized API responses.
- **Local Cache** — IndexedDB caching reduces configuration requests by 90%+.

For details, see [Collaboration](/en-US/user-guide/collaboration.html).

## Permissions & Security

- **Authentication** — JWT tokens with refresh tokens, email verification, and password reset.
- **RBAC Roles** — Owner, Admin, Editor, Commenter, Viewer.
- **Security Controls** — Dynamic password rules, session timeout, public config endpoint.
- **Protection** — XSS/CSRF protection, security headers, API rate limiting, file upload validation, and sanitized logs.

## User Experience

- Drag sorting for tables, fields, views, and kanban cards.
- Star bases and dashboards for quick access.
- Global search across table names and record content.
- Element Plus icon system and keyboard shortcuts.

## Related Links

- [What is SmartTable?](/en-US/introduction/what-is-smarttable.html)
- [Use Cases](/en-US/introduction/use-cases.html)
- [Getting Started](/en-US/user-guide/getting-started.html)
