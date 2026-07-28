# 配置说明

本文档详细介绍 SmartTable 的配置选项。

## 环境变量配置

### 基础配置

```bash
# 服务端口
PORT=3000

# 数据库配置
DATABASE_URL=sqlite:///data/smarttable.db
# 或使用 PostgreSQL
# DATABASE_URL=postgresql://user:password@localhost:5432/smarttable

# 密钥配置（用于加密）
SECRET_KEY=your-secret-key-change-in-production
```

### 认证配置

```bash
# JWT 配置
JWT_SECRET=your-jwt-secret
JWT_EXPIRES_IN=7d

# 是否启用注册功能
ENABLE_REGISTRATION=true
```

### 文件存储配置

```bash
# 本地存储
STORAGE_TYPE=local
UPLOAD_DIR=./uploads

# 或使用云存储
# STORAGE_TYPE=s3
# S3_ENDPOINT=https://s3.amazonaws.com
# S3_BUCKET=smarttable
# S3_ACCESS_KEY=your-access-key
# S3_SECRET_KEY=your-secret-key
```

### 邮件配置

```bash
# SMTP 配置
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASSWORD=your-password
SMTP_FROM=noreply@example.com
```

## Docker 配置

### docker-compose.yml

```yaml
version: '3.8'
services:
  smarttable:
    image: smarttable:latest
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/smarttable
      - SECRET_KEY=${SECRET_KEY}
    volumes:
      - ./uploads:/app/uploads
      - ./data:/app/data
    depends_on:
      - db

  db:
    image: postgres:14
    environment:
      - POSTGRES_DB=smarttable
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres-data:/var/lib/postgresql/data

volumes:
  postgres-data:
```

## 性能优化

### 数据库优化

- 使用 PostgreSQL 替代 SQLite（推荐用于生产环境）
- 配置数据库连接池
- 定期备份数据库

### 应用优化

- 启用 Gzip 压缩
- 配置 CDN 加速
- 使用 Redis 缓存（可选）

## 安全建议

1. **修改默认密钥**：生产环境必须修改 `SECRET_KEY` 和 `JWT_SECRET`
2. **启用 HTTPS**：建议使用反向代理（如 Nginx）配置 SSL
3. **限制文件上传大小**：防止恶意上传
4. **定期备份**：确保数据安全

## 故障排查

### 常见问题

**数据库连接失败**

检查数据库配置和网络连接。

**文件上传失败**

检查上传目录权限和磁盘空间。

**邮件发送失败**

验证 SMTP 配置和邮件服务器状态。

## 下一步

- [API 概览](/zh-CN/developer/api/overview)
- [架构设计](/zh-CN/developer/architecture)