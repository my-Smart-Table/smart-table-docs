# Workflow API

The Workflow API is used to manage and trigger automated workflows in SmartTable.

## Get Workflow List

```http
GET /api/v1/workflows
```

## Create Workflow

```http
POST /api/v1/workflows
```

**Request Body**:

```json
{
  "name": "Task Status Change Notification",
  "table_id": "tbl_123456",
  "trigger": {
    "type": "record_updated",
    "config": {}
  },
  "nodes": []
}
```

## Trigger Workflow

```http
POST /api/v1/workflows/{workflow_id}/trigger
```

## Get Execution Logs

```http
GET /api/v1/workflows/{workflow_id}/logs
```

## Related Links

- [API Overview](/en-US/developer/api/overview)
- [Workflow Automation](/en-US/user-guide/workflow)
