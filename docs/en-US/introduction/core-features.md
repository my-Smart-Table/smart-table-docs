# Core Features

SmartTable provides a complete set of tools for personal productivity and team collaboration. This page summarizes the main capabilities you will use every day.

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

SmartTable offers 26 field types across 9 categories. See [Field Types](/en-US/user-guide/field-types.html) for full details.

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
