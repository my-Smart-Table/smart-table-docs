# API Overview

SmartTable provides a complete RESTful API for easy integration with other systems.

## API Basics

### Base URL

```
https://your-domain.com/api/v1
```

### Authentication

All API requests need to carry an authentication token in the Header:

```http
Authorization: Bearer <your-token>
```

### Response Format

All responses are in JSON format:

```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

## API Categories

### Table API

- Get table list
- Create/update/delete tables
- Get table structure

### Record API

- Get record list
- Create/update/delete records
- Batch operations

### Field API

- Get field list
- Create/update/delete fields
- Field type configuration

### Workflow API

- Trigger workflows
- Query execution status
- Workflow management

## Rate Limiting

- Default 100 requests per minute
- Support batch request optimization
- Recommended to use caching

## Error Handling

### Error Response Format

```json
{
  "success": false,
  "error": {
    "code": "INVALID_TOKEN",
    "message": "Invalid authentication token"
  }
}
```

### Common Error Codes

- `INVALID_TOKEN`: Authentication failed
- `PERMISSION_DENIED`: Insufficient permissions
- `NOT_FOUND`: Resource does not exist
- `VALIDATION_ERROR`: Parameter validation failed

## Next Steps

- [Authentication](/en-US/developer/api/authentication)
- [Table API](/en-US/developer/api/table)
