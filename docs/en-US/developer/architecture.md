# Architecture

This document introduces SmartTable's system architecture, technology stack, and data model.

## Technology Stack

### Frontend

| Category | Technology | Version | Purpose |
|----------|------------|---------|---------|
| Framework | Vue 3 | ^3.5.30 | Composition API |
| Language | TypeScript | ~5.9.3 | Type safety |
| Build Tool | Vite | ^8.0.1 | Fast builds |
| State Management | Pinia | ^2.3.1 | Lightweight state |
| Router | Vue Router | ^4.6.4 | SPA routing |
| UI Library | Element Plus | ^2.13.6 | Enterprise components |
| Table Component | vxe-table / vtable | ^4.18.7 / ^1.26.3 | Virtual scroll (v1.4-) / canvas table (v1.5+) |
| Charts | echarts + vue-echarts | ^5.6.0 / ^6.7.3 | Data visualization |
| Date Processing | dayjs | ^1.11.20 | Date utilities |
| Drag Sorting | sortablejs | ^1.15.7 | Drag interactions |
| HTTP Client | axios | ^1.14.0 | API requests |
| Local Database | Dexie | ^3.2.7 | IndexedDB wrapper |
| WebSocket | socket.io-client | ^4.8.3 | Real-time collaboration |
| Rich Text | tinyeditor | ^4.0.0 | Rich text editing |
| Spreadsheet | xlsx | ^0.18.5 | Excel parsing/generation |
| Testing | Vitest | ^3.2.4 | Unit testing |

### Backend

| Category | Technology | Version | Purpose |
|----------|------------|---------|---------|
| Framework | Flask | 3.0.0 | Python web framework |
| Database | SQLite / PostgreSQL | 3.x / 16+ | Relational data |
| ORM | SQLAlchemy | 2.0.23 | Database abstraction |
| Migrations | Alembic (Flask-Migrate) | 4.0.5 | Schema versioning |
| Authentication | Flask-JWT-Extended | 4.6.0 | JWT tokens |
| Password Hashing | Flask-Bcrypt / bcrypt | 1.0.1 / 4.1.2 | Secure passwords |
| CSRF Protection | Flask-WTF | 1.2.1 | Form validation |
| CORS | Flask-CORS | 4.0.0 | Cross-origin support |
| Caching | Flask-Caching (+ Redis) | 2.1.0 | Cache acceleration |
| WebSocket | Flask-SocketIO | 5.3.6 | Real-time communication |
| Async | eventlet | 0.36.1 | Async processing |
| Serialization | marshmallow | 3.20.1 | Validation/serialization |
| Import/Export | pandas, openpyxl, xlrd | 2.1.4 / 3.1.2 / 2.0.1 | Data processing |
| Images | Pillow | 10.4.0 | Thumbnails |
| Object Storage | MinIO (optional) | — | File storage |
| Encryption | cryptography | 42.0.5 | Encryption algorithms |
| API Docs | Flasgger | 0.9.7b2 | Swagger UI |
| WSGI Server | Eventlet WSGI Server | 0.36.1 | Production server |
| Deployment | Docker, Nginx | — | Containerized deployment |

## Data Storage Options

| Mode | Technology | Description |
|------|------------|-------------|
| Pure Frontend | Dexie (IndexedDB) | Data stored locally in the browser; no server required; ideal for personal or offline use |
| Backend | SQLite + Flask | Default lightweight setup with no additional database installation |
| Production | PostgreSQL + Flask | Supports multi-user concurrent access and production workloads |

## System Architecture Diagram

```
┌─────────────┐
│   Browser   │
└──────┬──────┘
       │
       ├─ HTTP / WebSocket
       │
┌──────▼──────┐      ┌─────────────┐
│    Nginx    │─────▶│  Frontend   │
└──────┬──────┘      └─────────────┘
       │
       │ HTTP API
       │
┌──────▼──────┐      ┌─────────────┐
│   Backend   │─────▶│  Database   │
│   (Flask)   │      │(PostgreSQL) │
└──────┬──────┘      └─────────────┘
       │
       │
┌──────▼──────┐
│File Storage │
│  (Local/S3) │
└─────────────┘
```

## Core Data Models

SmartTable's entities are organized as follows:

```
User
  ├── owns many Base
  ├── is member of many Base (via BaseMember)
  └── has many OperationLog

Base
  ├── has many Table
  ├── has many Dashboard
  ├── has many BaseShare
  ├── has many BaseMember
  ├── has many CollaborationSession
  └── has many Workflow

Table
  ├── has many Field
  ├── has many Record
  ├── has many View
  ├── has many LinkRelation
  ├── has many Workflow
  └── belongs to Base

Field
  ├── has options (field options)
  └── belongs to Table

Record
  ├── has many RecordHistory
  ├── has values for each Field
  └── belongs to Table

View
  ├── has filter/sort/group configs
  └── belongs to Table

Workflow
  ├── has many WorkflowVersion
  ├── has many WebhookConfig
  └── belongs to Base/Table

WebhookConfig
  ├── has many WebhookDelivery
  └── belongs to Workflow
```

### Main Model Descriptions

| Entity | Description |
|--------|-------------|
| User | Authentication info, email verification, roles, avatar, and profile |
| Base | Top-level multi-dimensional table unit with icons, colors, members, and sharing |
| Table | Contains field definitions and records; supports drag-sort and starring |
| Field | Defines column types and properties; supports 26 field types |
| Record | Stores actual data rows with full change history |
| View | Display method with independent filter, sort, group, and field settings |
| Document | Rich-text or Markdown documents linked to a base; supports versioning and PDF export |
| DocumentVersion | Version snapshots with rollback and comparison |
| CollaborationSession | Tracks real-time collaboration sessions and user presence |
| Workflow | Automation definition bound to a base or table |
| WorkflowVersion | Saved snapshots of workflow configurations |
| WebhookConfig | Outgoing webhook configuration |
| WebhookDelivery | Delivery logs for webhook calls |

## Core Modules

### Permission System

- Role-Based Access Control (RBAC) with Owner, Admin, Editor, Commenter, and Viewer roles.
- Table-level, view-level, and field-level access control.

### Real-time Collaboration

- WebSocket connection management via Socket.IO.
- Operation broadcast, cell locking, and automatic conflict detection.
- Offline queue and graceful degradation.

### Workflow Engine

- Trigger management, conditional branching, and action execution.
- Node sorting and execution logs.

## Performance & Scalability

- **Frontend** — Virtual scrolling, lazy loading, and code splitting.
- **Backend** — Database indexes, query optimization, and connection pooling.
- **Cache** — Redis and browser cache layers.

## Security Design

- JWT-based authentication with refresh tokens.
- HTTPS, CORS, XSS/CSRF protection, security headers, and API rate limiting.
- Sensitive data sanitization in logs.

## Related Links

- [Docker Deployment](/en-US/developer/deployment/docker.html)
- [Configuration](/en-US/developer/deployment/configuration.html)
