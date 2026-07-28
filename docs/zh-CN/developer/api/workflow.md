# 工作流 API

工作流 API 用于管理和触发 SmartTable 中的自动化工作流。

## 获取工作流列表

```http
GET /api/v1/workflows
```

## 创建工作流

```http
POST /api/v1/workflows
```

**请求体**：

```json
{
  "name": "任务状态变更通知",
  "table_id": "tbl_123456",
  "trigger": {
    "type": "record_updated",
    "config": {}
  },
  "nodes": []
}
```

## 触发工作流

```http
POST /api/v1/workflows/{workflow_id}/trigger
```

## 获取执行日志

```http
GET /api/v1/workflows/{workflow_id}/logs
```

## 相关链接

- [API 概览](/zh-CN/developer/api/overview)
- [工作流自动化](/zh-CN/user-guide/workflow)
