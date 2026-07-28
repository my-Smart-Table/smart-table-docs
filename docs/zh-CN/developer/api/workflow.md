# 工作流 API

本文档介绍如何通过 API 管理和触发工作流。

## 获取工作流列表

```http
GET /api/v1/workflows
Authorization: Bearer <token>
```

### 响应示例

```json
{
  "success": true,
  "data": {
    "workflows": [
      {
        "id": 1,
        "name": "任务完成通知",
        "description": "当任务完成时发送邮件通知",
        "enabled": true,
        "createdAt": "2024-01-01T00:00:00Z"
      }
    ]
  }
}
```

## 触发工作流

### 手动触发

```http
POST /api/v1/workflows/:workflowId/trigger
Authorization: Bearer <token>
Content-Type: application/json

{
  "tableId": 1,
  "recordId": 123,
  "params": {
    "customParam": "value"
  }
}
```

### 响应示例

```json
{
  "success": true,
  "data": {
    "executionId": "exec-123",
    "status": "running",
    "message": "工作流已触发"
  }
}
```

## 查询执行状态

```http
GET /api/v1/workflows/executions/:executionId
Authorization: Bearer <token>
```

### 响应示例

```json
{
  "success": true,
  "data": {
    "executionId": "exec-123",
    "workflowId": 1,
    "status": "completed",
    "startTime": "2024-01-01T00:00:00Z",
    "endTime": "2024-01-01T00:00:05Z",
    "logs": [
      {
        "step": "触发器",
        "status": "success",
        "message": "手动触发"
      },
      {
        "step": "动作",
        "status": "success",
        "message": "发送邮件成功"
      }
    ]
  }
}
```

## 工作流管理

### 创建工作流

```http
POST /api/v1/workflows
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "新工作流",
  "description": "工作流描述",
  "trigger": {
    "type": "record_created",
    "tableId": 1
  },
  "actions": [
    {
      "type": "send_email",
      "config": {
        "to": "user@example.com",
        "subject": "新记录创建",
        "body": "有新记录创建"
      }
    }
  ]
}
```

### 更新工作流

```http
PUT /api/v1/workflows/:workflowId
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "更新后的工作流名"
}
```

### 删除工作流

```http
DELETE /api/v1/workflows/:workflowId
Authorization: Bearer <token>
```

### 启用/禁用工作流

```http
PUT /api/v1/workflows/:workflowId/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "enabled": false
}
```

## 执行历史

### 获取执行历史

```http
GET /api/v1/workflows/:workflowId/executions
Authorization: Bearer <token>
```

## 错误处理

```json
{
  "success": false,
  "error": {
    "code": "WORKFLOW_NOT_FOUND",
    "message": "工作流不存在"
  }
}
```