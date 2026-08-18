# Workflow API

The Workflow API manages automated workflows in SmartTable, triggers their execution, and queries run status.

## Get Workflow List

```http
GET /api/v1/workflows?page=1&page_size=20
```

**Response example**:

```json
{
  "code": 0,
  "msg": "success",
  "data": {
    "items": [
      {
        "id": "wf_3001",
        "name": "Task Status Change Notification",
        "table_id": "tbl_123456",
        "enabled": true
      }
    ],
    "total": 1,
    "page": 1,
    "page_size": 20
  }
}
```

## Create Workflow

```http
POST /api/v1/workflows
Content-Type: application/json

{
  "name": "Task Status Change Notification",
  "table_id": "tbl_123456",
  "trigger": {
    "type": "record_updated",
    "config": { }
  },
  "nodes": [ ]
}
```

## Trigger Workflow

```http
POST /api/v1/workflows/{workflow_id}/trigger
Content-Type: application/json

{
  "record_id": "rec_1001"
}
```

## Get Execution Logs

```http
GET /api/v1/workflows/{workflow_id}/logs?page=1&page_size=20
```

**Response example**:

```json
{
  "code": 0,
  "msg": "success",
  "data": {
    "items": [
      {
        "run_id": "run_9001",
        "status": "success",
        "started_at": "2026-01-04T00:00:00Z",
        "finished_at": "2026-01-04T00:00:05Z"
      }
    ],
    "total": 1,
    "page": 1,
    "page_size": 20
  }
}
```

## Related Links

- [API Overview](./overview.md)
- [Workflow Automation](/en-US/user-guide/workflow.md)
