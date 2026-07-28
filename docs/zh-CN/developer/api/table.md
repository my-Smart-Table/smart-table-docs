# 数据表 API

本文档介绍如何通过 API 管理数据表。

## 获取表格列表

```http
GET /api/v1/tables
Authorization: Bearer <token>
```

### 响应示例

```json
{
  "success": true,
  "data": {
    "tables": [
      {
        "id": 1,
        "name": "任务管理",
        "description": "项目任务跟踪表",
        "fields": [...],
        "createdAt": "2024-01-01T00:00:00Z"
      }
    ]
  }
}
```

## 创建表格

```http
POST /api/v1/tables
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "新表格",
  "description": "表格描述",
  "fields": [
    {
      "name": "标题",
      "type": "text",
      "required": true
    },
    {
      "name": "状态",
      "type": "select",
      "options": ["进行中", "已完成", "已暂停"]
    }
  ]
}
```

## 获取单个表格

```http
GET /api/v1/tables/:tableId
Authorization: Bearer <token>
```

## 更新表格

```http
PUT /api/v1/tables/:tableId
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "更新后的表格名",
  "description": "更新后的描述"
}
```

## 删除表格

```http
DELETE /api/v1/tables/:tableId
Authorization: Bearer <token>
```

## 字段管理

### 添加字段

```http
POST /api/v1/tables/:tableId/fields
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "新字段",
  "type": "text",
  "required": false
}
```

### 更新字段

```http
PUT /api/v1/tables/:tableId/fields/:fieldId
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "更新后的字段名"
}
```

### 删除字段

```http
DELETE /api/v1/tables/:tableId/fields/:fieldId
Authorization: Bearer <token>
```

## 下一步

- [记录 API](/zh-CN/developer/api/record)
- [工作流 API](/zh-CN/developer/api/workflow)