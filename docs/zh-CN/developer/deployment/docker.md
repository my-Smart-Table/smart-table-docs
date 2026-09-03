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
      - ./logs:/app/logs
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
官方镜像默认使用 SQLite，数据通过卷挂载持久化到宿主机。升级镜像时，只要保留卷数据即可保留已有数据。上文额外挂载的 `./logs:/app/logs` 会把应用日志直接落到宿主机当前目录，方便排查问题，详见 [查看日志](#查看日志)。
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

## 查看日志

容器内由 Supervisor 统一管理 `nginx`、`app-server`、`redis` 三个进程，日志分为四层：

| 层级 | 位置 | 内容 |
| --- | --- | --- |
| 容器标准输出 | `docker logs` | 容器启动、数据库迁移、Supervisor 输出 |
| Supervisor 进程日志 | 容器内 `/var/log/supervisor/*.log` | 后端异常堆栈、各进程运行输出 |
| 应用业务日志 | `/app/logs/smarttable.log`（可挂载到宿主机 `./logs`） | Flask `app.logger` 输出的业务日志 |
| Nginx 日志 | 容器内 `/var/log/nginx/` | HTTP 访问记录、反向代理错误 |

### 1. 容器标准输出

```bash
docker logs smarttable                 # 全量日志
docker logs -f smarttable              # 实时跟随
docker logs --tail=200 smarttable      # 最近 200 行
docker logs --previous smarttable      # 容器崩溃重启时，查看上一次启动的日志
docker logs --since 30m smarttable     # 最近 30 分钟
```

使用 Docker Compose 启动时：

```bash
docker compose -f docker-compose.yml logs -f smarttable
docker compose -f docker-compose.full.yml logs -f          # 完整部署，同时输出 postgres / redis / minio
```

排查启动失败时，先看容器状态，若一直处于 `Restarting`，优先使用 `--previous` 查看上一次的日志：

```bash
docker ps -a
```

### 2. 后台服务进程日志（Supervisor）

这是后端服务真正的运行日志，包含异常堆栈：

```bash
# 查看后端进程日志
docker exec smarttable tail -f /var/log/supervisor/app-server.err.log   # 报错与异常堆栈
docker exec smarttable tail -f /var/log/supervisor/app-server.out.log   # 运行输出、Eventlet 请求日志

# 查看其他进程
docker exec smarttable tail -f /var/log/supervisor/nginx.err.log
docker exec smarttable tail -f /var/log/supervisor/redis.err.log
docker exec smarttable tail -f /var/log/supervisor/supervisord.log      # 进程重启记录

docker exec smarttable ls -lh /var/log/supervisor/                      # 列出全部日志文件
```

查看并管理各进程状态（可只重启后端而不重启容器）：

```bash
docker exec smarttable supervisorctl status
docker exec smarttable supervisorctl restart app-server
```

### 3. 应用业务日志

生产模式下，Flask 会写入容器内的 `/app/logs/smarttable.log`，单个文件 10 MB，滚动保留 10 个（`smarttable.log.1` ~ `smarttable.log.10`）。

如果启动时挂载了日志目录，可直接在宿主机查看：

```yaml
volumes:
  - ./logs:/app/logs
```

```bash
tail -f ./logs/smarttable.log
grep "ERROR" ./logs/smarttable.log
```

若未挂载（例如使用官方镜像一键启动），需进入容器查看，或拷贝到宿主机：

```bash
docker exec smarttable tail -f /app/logs/smarttable.log
docker cp smarttable:/app/logs/smarttable.log ./smarttable.log
```

### 4. Nginx 访问日志

用于排查 4xx / 5xx 响应与接口耗时，日志格式中包含 `rt=`（总耗时）、`urt=`（上游后端耗时）：

```bash
docker exec smarttable tail -f /var/log/nginx/access.log
docker exec smarttable tail -f /var/log/nginx/error.log
```

### 5. 调整日志级别

在 `.env` 中设置为 `DEBUG` 后重建容器，可获取更详细输出：

```bash
LOG_LEVEL=DEBUG
```

```bash
docker compose -f docker-compose.yml up -d --force-recreate
```

### 6. Windows（PowerShell）常用命令

```powershell
docker logs -f --tail=100 smarttable 2>&1 | Select-String -Pattern "ERROR|Traceback"
Get-Content .\logs\smarttable.log -Tail 100 -Wait          # 等价 tail -f
docker exec smarttable tail -f /var/log/supervisor/app-server.err.log
```

### 排查顺序建议

1. `docker ps -a` 确认容器状态，判断是否为 `Restarting`。
2. `docker logs --tail=100 smarttable` 确认是否卡在数据库迁移或初始化阶段。
3. `docker exec smarttable supervisorctl status` 确认哪个进程异常退出。
4. 查看对应的 `/var/log/supervisor/*.err.log`。
5. 查看 `./logs/smarttable.log` 中的业务日志。

::: tip 操作日志不在文件中
用户操作日志（谁修改了哪条记录）保存在数据库中，请在管理后台的「操作日志」页面或通过 `/api/admin/operation-logs` 接口查看，不在上述日志文件内。
:::

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
- 查看后端日志排查详细错误，参见 [查看日志](#查看日志)。

### 文件上传失败

- 检查 `smarttable_uploads` 卷是否已正确挂载。
- 确认容器对上传目录有写入权限。

## 相关链接

- [配置说明](/zh-CN/developer/deployment/configuration.html)
- [手动部署](/zh-CN/developer/deployment/manual.html)
- [架构设计](/zh-CN/developer/architecture.html)
