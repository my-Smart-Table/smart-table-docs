# 数据表 API

数据表 API 用于管理 SmartTable 中的数据表结构。

## 获取数据表列表

```http
GET /api/v1/tables
```

**响应示例**：

```json
{
  "items": [
    {
      "id": "tbl_123456",
      "name": "项目管理",
      "description": "项目任务跟踪表",
      "created_at": "2026-01-01T00:00:00Z"
    }
  ],
  "total": 1
}
```

## 创建数据表

```http
POST /api/v1/tables
```

**请求体**：

```json
{
  "name": "客户管理",
  "description": "客户信息表"
}
```

## 获取数据表详情

```http
GET /api/v1/tables/{table_id}
```

## 更新数据表

```http
PUT /api/v1/tables/{table_id}
```

## 删除数据表

```http
DELETE /api/v1/tables/{table_id}
```

## 相关链接

- [API 概览](/zh-CN/developer/api/overview)
- [记录 API](/zh-CN/developer/api/record)
