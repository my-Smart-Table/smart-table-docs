# Record API

The Record API is used to perform CRUD operations on records in tables.

## Query Records

```http
GET /api/v1/tables/{table_id}/records
```

**Query Parameters**:

- `page`: Page number, default 1
- `page_size`: Number per page, default 20
- `filter`: Filter conditions JSON
- `sort`: Sort field

## Create Record

```http
POST /api/v1/tables/{table_id}/records
```

**Request Body**:

```json
{
  "fields": {
    "Title": "New Task",
    "Status": "To Do",
    "Owner": "user_123"
  }
}
```

## Update Record

```http
PUT /api/v1/tables/{table_id}/records/{record_id}
```

## Delete Record

```http
DELETE /api/v1/tables/{table_id}/records/{record_id}
```

## Batch Operations

```http
POST /api/v1/tables/{table_id}/records/batch
```

## Related Links

- [API Overview](/en-US/developer/api/overview)
- [Table API](/en-US/developer/api/table)
