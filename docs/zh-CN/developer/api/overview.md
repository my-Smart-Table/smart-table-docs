# API 概览

SmartTable 提供完整的 RESTful Open API，便于第三方应用与系统对接。所有接口均基于标准 HTTP 协议，返回 JSON 格式数据。

## 基础说明

### 基础 URL

所有 API 均以前缀 `/api/v1` 开头：

```
https://your-domain.com/api/v1
```

### 认证方式

所有 API 请求需在 Header 中携带通过 OAuth2 获取的访问令牌（详见 [认证](./authentication.md)）：

```http
Authorization: Bearer <access_token>
```

### 响应格式

所有响应均为 JSON 格式，统一包含 `code`、`msg` 字段；`data` 为业务数据：

```json
{
  "code": 0,
  "msg": "success",
  "data": { }
}
```

> `code = 0` 表示成功，非 0 表示失败，失败信息见 `msg`。

### 分页

列表类接口统一使用 `page`（页码，从 1 开始）与 `page_size`（每页数量，默认 20）参数，响应中包含 `total`（总条数）、`page`、`page_size`：

```json
{
  "code": 0,
  "msg": "success",
  "data": {
    "items": [ ],
    "total": 100,
    "page": 1,
    "page_size": 20
  }
}
```

### 时间格式

所有时间字段统一使用 UTC，ISO 8601 格式：

```
2026-01-01T12:00:00Z
```

## API 分类

- [认证](./authentication.md)：OAuth2 客户端模式获取访问令牌
- [数据表 API](./table.md)：数据表的查询、创建、更新、删除
- [记录 API](./record.md)：记录的增删改查与批量操作
- [字段 API](./field.md)：字段的查询、创建、更新、删除与类型配置
- [工作流 API](./workflow.md)：工作流的触发与执行查询

## 错误处理

接口调用失败时，响应 `code` 非 0，`msg` 给出错误描述，`data` 通常为 `null`：

```json
{
  "code": 40100,
  "msg": "invalid_client",
  "data": null
}
```

### 错误码表

| 错误码 | 含义 |
| --- | --- |
| 40000 | 参数错误 |
| 40100 | 客户端认证失败（client_id / client_secret 错误） |
| 40101 | 授权类型不支持 |
| 40102 | 访问令牌缺失或格式错误 |
| 40103 | 访问令牌无效或已过期 |
| 40104 | 刷新令牌无效或已过期 |
| 40300 | 权限不足（scope 不匹配或无权访问资源） |
| 40400 | 资源不存在 |
| 40900 | 资源冲突 |
| 42900 | 请求过于频繁（触发限流） |
| 50000 | 服务器内部错误 |

## 下一步

- [认证](./authentication.md)
- [数据表 API](./table.md)
