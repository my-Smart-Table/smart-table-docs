# Table API

The Table API is used to manage the structure of tables in SmartTable.

## Get Table List

```http
GET /api/v1/tables
```

**Response Example**:

```json
{
  "items": [
    {
      "id": "tbl_123456",
      "name": "Project Management",
      "description": "Project task tracking table",
      "created_at": "2026-01-01T00:00:00Z"
    }
  ],
  "total": 1
}
```

## Create Table

```http
POST /api/v1/tables
```

**Request Body**:

```json
{
  "name": "Customer Management",
  "description": "Customer information table"
}
```

## Get Table Details

```http
GET /api/v1/tables/{table_id}
```

## Update Table

```http
PUT /api/v1/tables/{table_id}
```

## Delete Table

```http
DELETE /api/v1/tables/{table_id}
```

## Related Links

- [API Overview](/en-US/developer/api/overview)
- [Record API](/en-US/developer/api/record)
