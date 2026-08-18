# Field API

The Field API manages the field structure of a table, including querying, creating, updating, deleting and configuring field types.

## Get Field List

```http
GET /api/v1/tables/{table_id}/fields?page=1&page_size=50
```

**Response example**:

```json
{
  "code": 0,
  "msg": "success",
  "data": {
    "items": [
      {
        "id": "fld_2001",
        "name": "Title",
        "type": "text",
        "required": true,
        "options": null
      },
      {
        "id": "fld_2002",
        "name": "Status",
        "type": "single_select",
        "required": false,
        "options": ["To Do", "In Progress", "Done"]
      }
    ],
    "total": 2,
    "page": 1,
    "page_size": 50
  }
}
```

## Create Field

```http
POST /api/v1/tables/{table_id}/fields
Content-Type: application/json

{
  "name": "Due Date",
  "type": "date",
  "required": false
}
```

**Response example**:

```json
{
  "code": 0,
  "msg": "success",
  "data": {
    "id": "fld_2003",
    "name": "Due Date",
    "type": "date",
    "required": false,
    "options": null
  }
}
```

## Update Field

```http
PUT /api/v1/tables/{table_id}/fields/{field_id}
Content-Type: application/json

{
  "name": "Due Date (revised)",
  "required": true
}
```

## Delete Field

```http
DELETE /api/v1/tables/{table_id}/fields/{field_id}
```

> Deleting a field also removes all of its data; this operation is irreversible.

## Field Types

Common field types include: `text`, `number`, `date`, `single_select`, `multi_select`, `checkbox`, `user`, `link`, and more. Some types (e.g. single/multi select) configure their options via the `options` field.

## Related Links

- [API Overview](./overview.md)
- [Table API](./table.md)
- [Record API](./record.md)
