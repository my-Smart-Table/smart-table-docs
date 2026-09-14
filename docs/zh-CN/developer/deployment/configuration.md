# 配置说明

SmartTable 通过环境变量（或 `.env` 文件）进行配置。Docker 部署可使用项目根目录的 `.env.example` / `.env.full.example` 模板；本地开发可使用 `smarttable-backend/.env.example`（复制为 `smarttable-backend/.env` 或 `smarttable-backend/config/.env`）。

## 基础配置

### 应用配置

| 环境变量 | 说明 | 默认值 |
|---------|------|--------|
| `FLASK_ENV` | 运行环境（development / testing / production） | `development` |
| `FLASK_HOST` | 监听地址 | `0.0.0.0` |
| `FLASK_PORT` | 监听端口 | `5000` |
| `LOG_LEVEL` | 日志级别（DEBUG / INFO / WARNING / ERROR） | `INFO` |

### 安全配置

| 环境变量 | 说明 | 默认值 |
|---------|------|--------|
| `SECRET_KEY` | Flask 会话密钥 | 生产环境必填 |
| `JWT_SECRET_KEY` | JWT 签名密钥 | 生产环境必填 |
| `JWT_ACCESS_TOKEN_EXPIRES` | 访问令牌有效期（秒） | `86400` |

生成强随机密钥：`python -c "import secrets; print(secrets.token_hex(32))"`

### 数据库配置

| 环境变量 | 说明 | 默认值 |
|---------|------|--------|
| `DATA_DIR` | 数据目录 | `data` |
| `DATABASE_URL` | 数据库连接字符串 | `sqlite:///data/smarttable.db` |

示例（PostgreSQL，注意驱动为 `psycopg`）：

```env
DATABASE_URL=postgresql+psycopg://user:password@localhost:5432/smarttable
```

修改数据库后需重新执行迁移：`python run.py migrate`。

### 文件存储

| 环境变量 | 说明 | 默认值 |
|---------|------|--------|
| `UPLOAD_FOLDER` | 上传文件目录 | `uploads` |

附件存储在本地文件系统；MinIO 对象存储为规划中的扩展能力，尚未实现。

## 缓存与实时协作

| 环境变量 | 说明 | 默认值 |
|---------|------|--------|
| `REDIS_URL` | Redis 连接地址 | `redis://localhost:6379/0` |
| `ENABLE_REALTIME` | 是否启用实时协作（WebSocket） | `false` |
| `SOCKETIO_MESSAGE_QUEUE` | SocketIO 消息队列 Redis 地址 | `redis://localhost:6379/2` |
| `SOCKETIO_PING_TIMEOUT` | SocketIO 心跳超时（秒） | `60` |
| `SOCKETIO_PING_INTERVAL` | SocketIO 心跳间隔（秒） | `25` |

## 其他配置

| 环境变量 | 说明 | 默认值 |
|---------|------|--------|
| `CORS_ORIGINS` | 允许的跨域来源（逗号分隔），生产环境建议配置 | 本地地址 |
| `TIANDITU_KEY` | 天地图 JS API 密钥，配置后启用地图选点功能 | 空 |
| `TIANDITU_API_BASE` | 天地图服务地址 | `https://api.tianditu.gov.cn` |
| `ERROR_SHOW_DETAILS` | 错误响应中显示详细堆栈（仅调试用） | `false` |

> 说明：SMTP 邮件配置不通过环境变量设置，请登录管理后台，在「系统设置」中维护 SMTP 服务器、端口、认证等信息。

完整变量列表请参考项目中的 [.env.example](https://github.com/ldbinac/smart_table/blob/main/.env.example) 与 [smarttable-backend/.env.example](https://github.com/ldbinac/smart_table/blob/main/smarttable-backend/.env.example)。

## 相关链接

- [Docker 部署](/zh-CN/developer/deployment/docker)
- [手动部署](/zh-CN/developer/deployment/manual)
