# 字段 API

字段 API 用于管理数据表的字段结构，包括字段的查询、创建、更新、删除与类型配置。

## 获取字段列表

```http
GET /api/v1/tables/{table_id}/fields?page=1&page_size=50
```

**响应示例**：

```json
{
  "code": 0,
  "msg": "success",
  "data": {
    "items": [
      {
        "id": "fld_2001",
        "name": "标题",
        "type": "text",
        "required": true,
        "options": null
      },
      {
        "id": "fld_2002",
        "name": "状态",
        "type": "single_select",
        "required": false,
        "options": ["待办", "进行中", "已完成"]
      }
    ],
    "total": 2,
    "page": 1,
    "page_size": 50
  }
}
```

## 创建字段

```http
POST /api/v1/tables/{table_id}/fields
Content-Type: application/json

{
  "name": "截止日期",
  "type": "date",
  "required": false
}
```

**响应示例**：

```json
{
  "code": 0,
  "msg": "success",
  "data": {
    "id": "fld_2003",
    "name": "截止日期",
    "type": "date",
    "required": false,
    "options": null
  }
}
```

## 更新字段

```http
PUT /api/v1/tables/{table_id}/fields/{field_id}
Content-Type: application/json

{
  "name": "截止日期（修订）",
  "required": true
}
```

## 删除字段

```http
DELETE /api/v1/tables/{table_id}/fields/{field_id}
```

> 删除字段将同时清除该字段下的所有数据，操作不可逆。

## 字段类型

常见字段类型包括：`text`（文本）、`number`（数字）、`date`（日期）、`single_select`（单选）、`multi_select`（多选）、`checkbox`（复选）、`user`（成员）、`link`（关联）等。部分类型（如单选 / 多选）通过 `options` 配置可选项。

## 相关链接

- [API 概览](./overview.md)
- [数据表 API](./table.md)
- [记录 API](./record.md)
