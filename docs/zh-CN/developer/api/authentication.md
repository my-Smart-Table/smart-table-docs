# 认证

本文档介绍 SmartTable API 的认证机制。

## 获取访问令牌

### 登录接口

```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "your-password"
}
```

### 响应示例

```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": "7d",
    "user": {
      "id": 1,
      "email": "user@example.com",
      "name": "用户名"
    }
  }
}
```

## 使用令牌

在所有 API 请求的 Header 中添加认证令牌：

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 刷新令牌

当令牌即将过期时，可以使用刷新接口：

```http
POST /api/v1/auth/refresh
Authorization: Bearer <current-token>
```

## 注销登录

```http
POST /api/v1/auth/logout
Authorization: Bearer <token>
```

## 错误处理

### 401 未认证

```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "请先登录"
  }
}
```

### 403 权限不足

```json
{
  "success": false,
  "error": {
    "code": "FORBIDDEN",
    "message": "您没有权限访问此资源"
  }
}
```

## 安全建议

1. 不要在客户端暴露令牌
2. 使用 HTTPS 传输
3. 定期刷新令牌
4. 及时注销登录

## 下一步

- [数据表 API](/zh-CN/developer/api/table)
- [记录 API](/zh-CN/developer/api/record)