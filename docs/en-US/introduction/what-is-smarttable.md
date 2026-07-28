# What is SmartTable?

SmartTable is an open-source, smart multi-dimensional table system built with Vue 3 and Flask. Inspired by products like Airtable and Lark Base, it combines the flexibility of a spreadsheet with the power of a database, making it easy for individuals and teams to organize, analyze, and collaborate on structured data.

At its heart, a SmartTable **Base** is a collection of interrelated **Tables**. Each table stores **Records** (rows), defined by rich **Fields** (columns), and can be viewed through multiple **Views** such as grid, kanban, Gantt, calendar, form, and gallery.

## What You Can Do

SmartTable covers the full data lifecycle:

| Capability | Description |
|------------|-------------|
| Base Management | Create, edit, delete, and star bases; manage members and sharing settings. |
| Table Management | Work with multiple tables per base; drag-sort, rename, duplicate, or delete tables. |
| Field Management | Choose from 26 field types, configure options, set defaults, and control visibility. |
| Record Management | Add, edit, delete, and batch-update records; open record details and track change history. |
| View Management | Build 6+ view types, each with independent filters, sorts, groups, and frozen columns. |
| Document Management | Write rich-text or Markdown documents, export to PDF, and keep version history. |

## Supported Views

SmartTable lets you look at the same data in different ways:

| View | Best For |
|------|----------|
| Table View | Spreadsheet-style bulk editing and analysis |
| Grouped View | Multi-level grouping and grouped statistics |
| Kanban View | Task and workflow tracking |
| Calendar View | Time-based event and deadline management |
| Gantt View | Project timelines and task dependencies |
| Form View | Public data collection and sharing |
| Gallery View | Image and media content display |

## Deployment Options

SmartTable can run in several modes to match your environment:

| Mode | Stack | Use Case |
|------|-------|----------|
| Pure Frontend | Dexie (IndexedDB) | Personal or offline use; no server required |
| Backend | SQLite + Flask | Lightweight self-hosted setup |
| Production | PostgreSQL + Flask | Multi-user and high-availability deployments |

::: tip Get Started
To create your first base, see [Getting Started](/en-US/user-guide/getting-started.html). For a complete feature tour, read [Core Features](/en-US/introduction/core-features.html).
:::

## Open Source License

SmartTable is released under the [MIT License](https://opensource.org/licenses/MIT).
