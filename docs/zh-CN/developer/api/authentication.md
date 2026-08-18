# 认证

SmartTable Open API 使用 OAuth2 的 **客户端模式（client_credentials）** 进行第三方应用认证。应用凭证由开放平台颁发，调用方需先换取访问令牌，再携带令牌访问业务接口。

> 若需代表用户在浏览器 / 移动端完成授权（如网页端登录对接），请参考 [应用接入 - OAuth2 第三方应用接入](/zh-CN/developer/app-integration/oauth2-integration.md) 了解授权码模式与 PKCE。

## 创建应用

在 SmartTable 开放平台创建应用后，平台会分配以下凭证：

- `client_id`：应用唯一标识
- `client_secret`：应用密钥（请妥善保管，切勿泄露）

## 授权模式

当前 API 调用采用 OAuth2 客户端模式：

```
grant_type = client_credentials
```

## 获取访问令牌

```http
POST /api/v1/auth/oauth2/token
Content-Type: application/json

{
  "client_id": "your-client-id",
  "client_secret": "your-client-secret",
  "grant_type": "client_credentials"
}
```

**响应示例**：

```json
{
  "code": 0,
  "msg": "success",
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh_token": "def50200...",
    "token_type": "Bearer",
    "expires_in": 7200,
    "scope": "table:read table:write record:read record:write"
  }
}
```

| 字段 | 说明 |
| --- | --- |
| `access_token` | 访问令牌，用于业务接口鉴权 |
| `refresh_token` | 刷新令牌，用于获取新的访问令牌 |
| `token_type` | 令牌类型，固定为 `Bearer` |
| `expires_in` | 访问令牌有效期（秒） |
| `scope` | 令牌被授予的权限范围 |

## 使用令牌

在所有业务 API 请求的 Header 中携带访问令牌：

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 刷新令牌

当访问令牌即将过期时，使用刷新令牌换取新令牌：

```http
POST /api/v1/auth/oauth2/token
Content-Type: application/json

{
  "client_id": "your-client-id",
  "client_secret": "your-client-secret",
  "grant_type": "refresh_token",
  "refresh_token": "your-refresh-token"
}
```

## 注销

主动注销可撤销令牌：

```http
POST /api/v1/auth/oauth2/revoke
Content-Type: application/json

{
  "client_id": "your-client-id",
  "token": "your-access-token-or-refresh-token"
}
```

## 安全建议

1. `client_secret` 与令牌请勿存放在前端代码或公开仓库中
2. 始终通过 HTTPS 传输
3. 访问令牌过期后使用刷新令牌续期，避免频繁重新授权
4. 应用下线或密钥泄露时及时注销并重置凭证

## 下一步

- [数据表 API](./table.md)
- [记录 API](./record.md)
