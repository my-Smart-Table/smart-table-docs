# Record API

The Record API performs CRUD operations on records within a table.

## Query Records

```http
GET /api/v1/tables/{table_id}/records?page=1&page_size=20&filter={...}&sort={...}
```

**Query parameters**:

| Parameter | Description |
| --- | --- |
| `page` | Page number, default 1 |
| `page_size` | Items per page, default 20 |
| `filter` | Filter conditions (JSON string) |
| `sort` | Sort rules (JSON string) |

**Response example**:

```json
{
  "code": 0,
  "msg": "success",
  "data": {
    "items": [
      {
        "id": "rec_1001",
        "fields": {
          "Title": "New Task",
          "Status": "To Do",
          "Owner": "user_123"
        },
        "created_at": "2026-01-03T00:00:00Z"
      }
    ],
    "total": 1,
    "page": 1,
    "page_size": 20
  }
}
```

## Create Record

```http
POST /api/v1/tables/{table_id}/records
Content-Type: application/json

{
  "fields": {
    "Title": "New Task",
    "Status": "To Do",
    "Owner": "user_123"
  }
}
```

**Response example**:

```json
{
  "code": 0,
  "msg": "success",
  "data": {
    "id": "rec_1002",
    "fields": {
      "Title": "New Task",
      "Status": "To Do",
      "Owner": "user_123"
    }
  }
}
```

## Update Record

```http
PUT /api/v1/tables/{table_id}/records/{record_id}
Content-Type: application/json

{
  "fields": {
    "Status": "In Progress"
  }
}
```

## Delete Record

```http
DELETE /api/v1/tables/{table_id}/records/{record_id}
```

## Batch Operations

```http
POST /api/v1/tables/{table_id}/records/batch
Content-Type: application/json

{
  "action": "create",
  "records": [
    { "fields": { "Title": "Task A" } },
    { "fields": { "Title": "Task B" } }
  ]
}
```

| Parameter | Description |
| --- | --- |
| `action` | Batch action: `create` / `update` / `delete` |
| `records` | Array of records, each containing `fields` (`create`/`update`) or `id` (`update`/`delete`) |

## Related Links

- [API Overview](./overview.md)
- [Table API](./table.md)
