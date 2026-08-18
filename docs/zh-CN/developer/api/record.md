# 记录 API

记录 API 用于对数据表中的记录进行增删改查操作。

## 查询记录

```http
GET /api/v1/tables/{table_id}/records?page=1&page_size=20&filter={...}&sort={...}
```

**查询参数**：

| 参数 | 说明 |
| --- | --- |
| `page` | 页码，默认 1 |
| `page_size` | 每页数量，默认 20 |
| `filter` | 筛选条件（JSON 字符串） |
| `sort` | 排序规则（JSON 字符串） |

**响应示例**：

```json
{
  "code": 0,
  "msg": "success",
  "data": {
    "items": [
      {
        "id": "rec_1001",
        "fields": {
          "标题": "新任务",
          "状态": "待办",
          "负责人": "user_123"
        },
        "created_at": "2026-01-03T00:00:00Z"
      }
    ],
    "total": 1,
    "page": 1,
    "page_size": 20
  }
}
```

## 创建记录

```http
POST /api/v1/tables/{table_id}/records
Content-Type: application/json

{
  "fields": {
    "标题": "新任务",
    "状态": "待办",
    "负责人": "user_123"
  }
}
```

**响应示例**：

```json
{
  "code": 0,
  "msg": "success",
  "data": {
    "id": "rec_1002",
    "fields": {
      "标题": "新任务",
      "状态": "待办",
      "负责人": "user_123"
    }
  }
}
```

## 更新记录

```http
PUT /api/v1/tables/{table_id}/records/{record_id}
Content-Type: application/json

{
  "fields": {
    "状态": "进行中"
  }
}
```

## 删除记录

```http
DELETE /api/v1/tables/{table_id}/records/{record_id}
```

## 批量操作

```http
POST /api/v1/tables/{table_id}/records/batch
Content-Type: application/json

{
  "action": "create",
  "records": [
    { "fields": { "标题": "任务 A" } },
    { "fields": { "标题": "任务 B" } }
  ]
}
```

| 参数 | 说明 |
| --- | --- |
| `action` | 批量动作：`create` / `update` / `delete` |
| `records` | 记录数组，每条包含 `fields`（`create`/`update`）或 `id`（`update`/`delete`） |

## 相关链接

- [API 概览](./overview.md)
- [数据表 API](./table.md)
