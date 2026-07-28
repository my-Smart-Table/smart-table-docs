# 记录 API

记录 API 用于对数据表中的记录进行增删改查操作。

## 查询记录

```http
GET /api/v1/tables/{table_id}/records
```

**查询参数**：

- `page`: 页码，默认 1
- `page_size`: 每页数量，默认 20
- `filter`: 筛选条件 JSON
- `sort`: 排序字段

## 创建记录

```http
POST /api/v1/tables/{table_id}/records
```

**请求体**：

```json
{
  "fields": {
    "标题": "新任务",
    "状态": "待办",
    "负责人": "user_123"
  }
}
```

## 更新记录

```http
PUT /api/v1/tables/{table_id}/records/{record_id}
```

## 删除记录

```http
DELETE /api/v1/tables/{table_id}/records/{record_id}
```

## 批量操作

```http
POST /api/v1/tables/{table_id}/records/batch
```

## 相关链接

- [API 概览](/zh-CN/developer/api/overview)
- [数据表 API](/zh-CN/developer/api/table)
