# 数据表 API

数据表 API 用于管理 SmartTable 中的数据表及其结构。所有接口需在 Header 携带访问令牌。

## 获取数据表列表

```http
GET /api/v1/tables?page=1&page_size=20
```

**响应示例**：

```json
{
  "code": 0,
  "msg": "success",
  "data": {
    "items": [
      {
        "id": "tbl_123456",
        "name": "项目管理",
        "description": "项目任务跟踪表",
        "created_at": "2026-01-01T00:00:00Z"
      }
    ],
    "total": 1,
    "page": 1,
    "page_size": 20
  }
}
```

## 创建数据表

```http
POST /api/v1/tables
Content-Type: application/json

{
  "name": "客户管理",
  "description": "客户信息表"
}
```

**响应示例**：

```json
{
  "code": 0,
  "msg": "success",
  "data": {
    "id": "tbl_789012",
    "name": "客户管理",
    "description": "客户信息表",
    "created_at": "2026-01-02T00:00:00Z"
  }
}
```

## 获取数据表详情

```http
GET /api/v1/tables/{table_id}
```

**响应示例**：

```json
{
  "code": 0,
  "msg": "success",
  "data": {
    "id": "tbl_123456",
    "name": "项目管理",
    "description": "项目任务跟踪表",
    "created_at": "2026-01-01T00:00:00Z"
  }
}
```

## 更新数据表

```http
PUT /api/v1/tables/{table_id}
Content-Type: application/json

{
  "name": "项目管理（新版）",
  "description": "更新后的描述"
}
```

## 删除数据表

```http
DELETE /api/v1/tables/{table_id}
```

> 删除操作不可逆，请谨慎调用。

## 相关链接

- [API 概览](./overview.md)
- [记录 API](./record.md)
- [字段 API](./field.md)
