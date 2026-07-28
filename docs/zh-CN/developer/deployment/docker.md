# Docker 部署

SmartTable 提供多种 Docker 部署方式，从官方镜像一键启动到源码构建，满足开发测试和生产环境的不同需求。

## 前置要求

- Docker 20.10+
- Docker Compose 2.0+（可选，用于编排部署）

## 方式一：官方镜像一键启动（推荐）

使用官方镜像可以快速启动 SmartTable，无需构建源码，镜像会自动适配当前架构。

### 直接启动

```bash
docker run -d \
  --name smarttable \
  -p 80:80 \
  -v smarttable_data:/app/data \
  -v smarttable_uploads:/app/uploads \
  -v smarttable_redis:/data/redis \
  ygbinac/smarttable:latest
```

### 使用 Docker Compose

创建 `docker-compose.yml` 文件：

```yaml
services:
  smarttable:
    image: ygbinac/smarttable:latest
    container_name: smarttable
    ports:
      - "80:80"
    volumes:
      - smarttable_data:/app/data
      - smarttable_uploads:/app/uploads
      - smarttable_redis:/data/redis
    restart: unless-stopped

volumes:
  smarttable_data:
  smarttable_uploads:
  smarttable_redis:
```

然后启动：

```bash
docker-compose up -d
```

::: tip 数据持久化
官方镜像默认使用 SQLite，数据通过卷挂载持久化到宿主机。升级镜像时，只要保留卷数据即可保留已有数据。
:::

## 方式二：源码部署

如果您需要自定义构建或二次开发，可以使用源码部署。

### 1. 克隆仓库

```bash
git clone https://github.com/ldbinac/smart_table.git
cd smart-table-spec
```

### 2. 配置环境变量

```bash
cp .env.example .env
```

根据实际情况编辑 `.env` 文件，配置数据库、密钥等参数。

### 3. 启动服务

```bash
# 一键启动所有服务（前端 + 后端 + SQLite 数据库）
docker-compose up -d

# 查看服务状态
docker-compose ps

# 查看日志
docker-compose logs -f
```

### 4. 访问应用

- 前端应用：http://localhost
- 后端 API：http://localhost:5000/api
- API 文档：http://localhost:5000/apidocs

## 生产环境部署（PostgreSQL + Redis）

对于生产环境或多用户并发场景，建议使用 PostgreSQL 和 Redis：

```bash
# 使用生产环境完整配置
docker-compose -f docker-compose.full.yml up -d

# 或使用开发环境 PostgreSQL + Redis 配置
docker-compose -f docker-compose.dev.yml up -d
```

## Docker Compose 服务架构

```
smart-table-spec/
├── docker-compose.yml              # 开发环境（SQLite）
├── docker-compose.full.yml         # 生产环境（PostgreSQL + Redis + MinIO）
├── docker-compose.dev.yml          # 开发环境（PostgreSQL + Redis）
├── Dockerfile                      # 前端构建 + Nginx
├── smarttable-backend/
│   ├── Dockerfile                  # 后端应用
│   └── docker-compose.yml          # 后端独立编排
└── docker/
    ├── nginx/
    │   └── nginx.conf              # Nginx 配置
    └── supervisor/
        └── supervisord.conf        # 进程管理配置
```

## 环境变量配置说明

关键环境变量说明：

| 变量名 | 说明 | 默认值 | 必填 |
| --- | --- | --- | --- |
| `SECRET_KEY` | Flask 密钥 | - | 生产环境必填 |
| `JWT_SECRET_KEY` | JWT 密钥 | - | 生产环境必填 |
| `DATABASE_URL` | 数据库连接 | `sqlite:///smarttable.db` | 否 |
| `REDIS_URL` | Redis 地址 | `redis://localhost:6379/0` | 否 |
| `ENABLE_REALTIME` | 启用实时协作 | `false` | 否 |
| `MAIL_SERVER` | SMTP 服务器 | - | 邮件功能需要 |
| `MINIO_ENDPOINT` | MinIO 地址 | - | 对象存储需要 |

完整的配置说明请参考 [.env.example](https://github.com/ldbinac/smart_table/blob/main/.env.example) 和 [smarttable-backend/.env.example](https://github.com/ldbinac/smart_table/blob/main/smarttable-backend/.env.example)。

## 启用实时协作

如需在 Docker 中启用实时协作功能，在 `docker-compose.yml` 或 `.env` 中添加：

```yaml
environment:
  - ENABLE_REALTIME=true
  - SOCKETIO_MESSAGE_QUEUE=redis://redis:6379/1
```

## 故障排查

### 端口冲突

如果 80 端口被占用，修改 `docker-compose.yml` 中的端口映射，例如：

```yaml
ports:
  - "8080:80"
```

### 数据库连接失败

- 检查 `DATABASE_URL` 配置是否正确。
- 确认数据库容器已正常启动。
- 查看后端日志排查详细错误。

### 文件上传失败

- 检查 `smarttable_uploads` 卷是否已正确挂载。
- 确认容器对上传目录有写入权限。

## 相关链接

- [配置说明](/zh-CN/developer/deployment/configuration.html)
- [手动部署](/zh-CN/developer/deployment/manual.html)
- [架构设计](/zh-CN/developer/architecture.html)
