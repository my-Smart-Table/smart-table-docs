# 工作流 API

工作流 API 用于管理 SmartTable 中的自动化工作流，并触发其执行、查询运行状态。

## 获取工作流列表

```http
GET /api/v1/workflows?page=1&page_size=20
```

**响应示例**：

```json
{
  "code": 0,
  "msg": "success",
  "data": {
    "items": [
      {
        "id": "wf_3001",
        "name": "任务状态变更通知",
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

## 创建工作流

```http
POST /api/v1/workflows
Content-Type: application/json

{
  "name": "任务状态变更通知",
  "table_id": "tbl_123456",
  "trigger": {
    "type": "record_updated",
    "config": { }
  },
  "nodes": [ ]
}
```

## 触发工作流

```http
POST /api/v1/workflows/{workflow_id}/trigger
Content-Type: application/json

{
  "record_id": "rec_1001"
}
```

## 获取执行日志

```http
GET /api/v1/workflows/{workflow_id}/logs?page=1&page_size=20
```

**响应示例**：

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

## 相关链接

- [API 概览](./overview.md)
- [工作流自动化](/zh-CN/user-guide/workflow.md)
