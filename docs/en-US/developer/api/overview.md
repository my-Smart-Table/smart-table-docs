# API Overview

SmartTable provides a complete RESTful Open API for integrating with third-party applications and external systems. All endpoints are based on standard HTTP and return JSON.

## Basics

### Base URL

All API paths are prefixed with `/api/v1`:

```
https://your-domain.com/api/v1
```

### Authentication

All API requests must carry an access token obtained via OAuth2 in the Header (see [Authentication](./authentication.md)):

```http
Authorization: Bearer <access_token>
```

### Response Format

All responses are JSON and uniformly contain the `code` and `msg` fields, while `data` holds the business payload:

```json
{
  "code": 0,
  "msg": "success",
  "data": { }
}
```

> `code = 0` indicates success; a non-zero `code` indicates failure and `msg` carries the error description.

### Pagination

List endpoints uniformly use `page` (page number, starting at 1) and `page_size` (items per page, default 20). Responses include `total`, `page`, and `page_size`:

```json
{
  "code": 0,
  "msg": "success",
  "data": {
    "items": [ ],
    "total": 100,
    "page": 1,
    "page_size": 20
  }
}
```

### Time Format

All time fields use UTC in ISO 8601 format:

```
2026-01-01T12:00:00Z
```

## API Categories

- [Authentication](./authentication.md): obtain an access token via OAuth2 client credentials
- [Table API](./table.md): query, create, update and delete tables
- [Record API](./record.md): CRUD and batch operations on records
- [Field API](./field.md): query, create, update, delete and configure fields
- [Workflow API](./workflow.md): trigger workflows and query executions

## Error Handling

On failure, the response `code` is non-zero, `msg` describes the error, and `data` is usually `null`:

```json
{
  "code": 40100,
  "msg": "invalid_client",
  "data": null
}
```

### Error Code Table

| Code | Meaning |
| --- | --- |
| 40000 | Invalid parameters |
| 40100 | Client authentication failed (wrong client_id / client_secret) |
| 40101 | Unsupported grant type |
| 40102 | Access token missing or malformed |
| 40103 | Access token invalid or expired |
| 40104 | Refresh token invalid or expired |
| 40300 | Insufficient permission (scope mismatch or no access to resource) |
| 40400 | Resource not found |
| 40900 | Resource conflict |
| 42900 | Too many requests (rate limited) |
| 50000 | Internal server error |

## Next Steps

- [Authentication](./authentication.md)
- [Table API](./table.md)
