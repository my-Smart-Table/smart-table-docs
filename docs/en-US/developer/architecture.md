# Architecture

This document introduces the system architecture design of SmartTable.

## Technology Stack

### Frontend

- **Framework**: Vue 3 + TypeScript
- **Build Tool**: Vite
- **State Management**: Pinia
- **UI Components**: Custom component library
- **Real-time Communication**: WebSocket

### Backend

- **Framework**: Flask
- **ORM**: SQLAlchemy
- **Authentication**: JWT
- **Task Queue**: Celery (optional)

### Database

- **Development**: SQLite
- **Production**: PostgreSQL (recommended)
- **Cache**: Redis (optional)

### Deployment

- **Containerization**: Docker + Docker Compose
- **Reverse Proxy**: Nginx
- **File Storage**: Local storage / Cloud storage

## System Architecture Diagram

```
┌─────────────┐
│   Browser   │
└──────┬──────┘
       │
       ├─ HTTP/WebSocket
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

## Core Modules

### Data Model

- **Table**: Data container
- **Field**: Data structure definition
- **Record**: Actual data row
- **View**: Data display method

### Permission System

- Role-Based Access Control (RBAC)
- Table-level permissions
- Record-level permissions
- Field-level permissions

### Real-time Collaboration

- WebSocket connection management
- Operation broadcast mechanism
- Automatic conflict resolution
- Operation history tracking

### Workflow Engine

- Trigger management
- Conditional judgment
- Action execution
- Execution logs

## Performance Optimization

### Database Optimization

- Index optimization
- Query optimization
- Connection pool management

### Caching Strategy

- Redis cache
- Browser cache
- CDN acceleration

### Frontend Optimization

- Code splitting
- Lazy loading
- Virtual scrolling

## Scalability Design

### Plugin System

- Custom field types
- Custom views
- Custom workflow actions

### API Extension

- Webhook integration
- Third-party API integration
- Custom authentication plugins

## Security Design

### Data Security

- Sensitive data encryption
- Backup mechanism
- Data isolation

### Network Security

- HTTPS encryption
- CORS configuration
- XSS/CSRF protection

### Authentication and Authorization

- JWT tokens
- Session management
- Permission verification
