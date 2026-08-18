# Table API

The Table API manages tables and their structure in SmartTable. All endpoints require an access token in the Header.

## Get Table List

```http
GET /api/v1/tables?page=1&page_size=20
```

**Response example**:

```json
{
  "code": 0,
  "msg": "success",
  "data": {
    "items": [
      {
        "id": "tbl_123456",
        "name": "Project Management",
        "description": "Project task tracking table",
        "created_at": "2026-01-01T00:00:00Z"
      }
    ],
    "total": 1,
    "page": 1,
    "page_size": 20
  }
}
```

## Create Table

```http
POST /api/v1/tables
Content-Type: application/json

{
  "name": "Customer Management",
  "description": "Customer information table"
}
```

**Response example**:

```json
{
  "code": 0,
  "msg": "success",
  "data": {
    "id": "tbl_789012",
    "name": "Customer Management",
    "description": "Customer information table",
    "created_at": "2026-01-02T00:00:00Z"
  }
}
```

## Get Table Details

```http
GET /api/v1/tables/{table_id}
```

**Response example**:

```json
{
  "code": 0,
  "msg": "success",
  "data": {
    "id": "tbl_123456",
    "name": "Project Management",
    "description": "Project task tracking table",
    "created_at": "2026-01-01T00:00:00Z"
  }
}
```

## Update Table

```http
PUT /api/v1/tables/{table_id}
Content-Type: application/json

{
  "name": "Project Management (v2)",
  "description": "Updated description"
}
```

## Delete Table

```http
DELETE /api/v1/tables/{table_id}
```

> This operation is irreversible; call it with caution.

## Related Links

- [API Overview](./overview.md)
- [Record API](./record.md)
- [Field API](./field.md)
