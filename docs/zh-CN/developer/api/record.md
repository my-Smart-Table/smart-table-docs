# 记录 API

本文档介绍如何通过 API 管理记录（数据行）。

## 获取记录列表

```http
GET /api/v1/tables/:tableId/records
Authorization: Bearer <token>
```

### 查询参数

- `page`: 页码（默认 1）
- `pageSize`: 每页数量（默认 50）
- `sort`: 排序字段
- `order`: 排序方向（asc/desc）
- `filter`: 筛选条件

### 响应示例

```json
{
  "success": true,
  "data": {
    "records": [
      {
        "id": 1,
        "fields": {
          "标题": "任务名称",
          "状态": "进行中",
          "负责人": "张三"
        },
        "createdAt": "2024-01-01T00:00:00Z"
      }
    ],
    "total": 100,
    "page": 1,
    "pageSize": 50
  }
}
```

## 创建记录

```http
POST /api/v1/tables/:tableId/records
Authorization: Bearer <token>
Content-Type: application/json

{
  "fields": {
    "标题": "新任务",
    "状态": "待开始",
    "负责人": "李四"
  }
}
```

## 获取单个记录

```http
GET /api/v1/tables/:tableId/records/:recordId
Authorization: Bearer <token>
```

## 更新记录

```http
PUT /api/v1/tables/:tableId/records/:recordId
Authorization: Bearer <token>
Content-Type: application/json

{
  "fields": {
    "状态": "已完成"
  }
}
```

## 删除记录

```http
DELETE /api/v1/tables/:tableId/records/:recordId
Authorization: Bearer <token>
```

## 批量操作

### 批量创建

```http
POST /api/v1/tables/:tableId/records/batch
Authorization: Bearer <token>
Content-Type: application/json

{
  "records": [
    { "fields": { ... } },
    { "fields": { ... } }
  ]
}
```

### 批量更新

```http
PUT /api/v1/tables/:tableId/records/batch
Authorization: Bearer <token>
Content-Type: application/json

{
  "recordIds": [1, 2, 3],
  "fields": {
    "状态": "已完成"
  }
}
```

### 批量删除

```http
DELETE /api/v1/tables/:tableId/records/batch
Authorization: Bearer <token>
Content-Type: application/json

{
  "recordIds": [1, 2, 3]
}
```

## 下一步

- [工作流 API](/zh-CN/developer/api/workflow)