# 配置说明

SmartTable 支持通过环境变量和配置文件进行灵活配置。

## 基础配置

### 应用配置

| 环境变量 | 说明 | 默认值 |
|---------|------|--------|
| `APP_ENV` | 运行环境 | `development` |
| `APP_PORT` | 服务端口 | `3000` |
| `APP_HOST` | 服务主机 | `0.0.0.0` |
| `APP_SECRET_KEY` | 应用密钥 | 必填 |

### 数据库配置

| 环境变量 | 说明 | 默认值 |
|---------|------|--------|
| `DATABASE_URL` | 数据库连接字符串 | 必填 |
| `DATABASE_POOL_SIZE` | 连接池大小 | `20` |

示例：
```env
DATABASE_URL=postgresql://user:password@localhost:5432/smarttable
```

### 缓存配置

| 环境变量 | 说明 | 默认值 |
|---------|------|--------|
| `REDIS_URL` | Redis 连接地址 | 可选 |
| `CACHE_TTL` | 缓存过期时间（秒） | `3600` |

## 安全配置

### JWT 配置

| 环境变量 | 说明 | 默认值 |
|---------|------|--------|
| `JWT_ACCESS_TOKEN_EXPIRE_MINUTES` | 访问令牌过期时间 | `30` |
| `JWT_REFRESH_TOKEN_EXPIRE_DAYS` | 刷新令牌过期时间 | `7` |

### 邮件配置

| 环境变量 | 说明 | 默认值 |
|---------|------|--------|
| `SMTP_HOST` | SMTP 服务器地址 | 可选 |
| `SMTP_PORT` | SMTP 端口 | `587` |
| `SMTP_USER` | SMTP 用户名 | 可选 |
| `SMTP_PASSWORD` | SMTP 密码 | 可选 |

## 高级配置

### 文件存储

| 环境变量 | 说明 | 默认值 |
|---------|------|--------|
| `STORAGE_TYPE` | 存储类型（local/s3） | `local` |
| `STORAGE_LOCAL_PATH` | 本地存储路径 | `./uploads` |
| `S3_BUCKET` | S3 存储桶名称 | 可选 |
| `S3_REGION` | S3 区域 | 可选 |

### Webhook 配置

| 环境变量 | 说明 | 默认值 |
|---------|------|--------|
| `WEBHOOK_TIMEOUT` | Webhook 超时时间（秒） | `30` |
| `WEBHOOK_RETRY_COUNT` | Webhook 重试次数 | `3` |

## 相关链接

- [Docker 部署](/zh-CN/developer/deployment/docker)
- [手动部署](/zh-CN/developer/deployment/manual)
