# 手动部署

如果您希望不使用 Docker、更灵活地控制部署环境，可以选择手动部署 SmartTable。

## 环境要求

- Python 3.11+（后端）
- Node.js 18+ 与 pnpm 9+（构建前端）
- SQLite（默认，无需安装）或 PostgreSQL 13+
- Redis 6+（可选，启用实时协作时需要）

## 安装步骤

### 1. 克隆代码

```bash
git clone https://github.com/ldbinac/smart_table.git
cd smart_table
```

### 2. 配置并启动后端

```bash
cd smarttable-backend

# 创建虚拟环境
python -m venv venv
# Windows:
venv\Scripts\activate
# Linux/macOS:
source venv/bin/activate

# 安装依赖
pip install -r requirements.txt

# 配置环境变量（默认使用 SQLite，无需修改 DATABASE_URL）
cp .env.example .env
# 生产环境务必修改 SECRET_KEY 与 JWT_SECRET_KEY

# 初始化/迁移数据库
python run.py migrate

# 确保默认管理员账号存在（缺失时自动创建）
python run.py ensure-admin

# 启动后端（默认监听 0.0.0.0:5000）
python run.py
```

### 3. 构建前端

```bash
cd ../smart-table

pnpm install
pnpm run build
```

构建产物输出到 `smart-table/dist` 目录。

### 4. 托管前端并反代 API

将 `dist` 目录交给任意静态服务器（Nginx / Caddy 等），并将 `/api` 反向代理到后端 5000 端口。Nginx 示例：

```nginx
server {
    listen 80;
    server_name your-domain.com;
    client_max_body_size 50M;

    # API 反向代理
    location /api/ {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # 实时协作 WebSocket（启用 ENABLE_REALTIME 时需要）
    location /socket.io/ {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_read_timeout 86400s;
    }

    # 前端静态文件（SPA 路由回退到 index.html）
    location / {
        root /var/www/smarttable;
        try_files $uri $uri/ /index.html;
    }
}
```

配置完成后访问 `http://your-domain.com` 即可使用。

## 生产环境建议

- **密钥**：`.env` 中的 `SECRET_KEY`、`JWT_SECRET_KEY` 必须替换为强随机值：
  `python -c "import secrets; print(secrets.token_hex(32))"`
- **进程管理**：使用 systemd、supervisor 等托管 `python run.py` 进程
- **数据库**：多用户并发场景建议切换 PostgreSQL，修改 `DATABASE_URL` 后重新执行 `python run.py migrate`：
  `DATABASE_URL=postgresql+psycopg://user:password@localhost:5432/smarttable`
- **实时协作**：在 `.env` 中设置 `ENABLE_REALTIME=true`，并确保 Redis 可达

## 相关链接

- [Docker 部署](/zh-CN/developer/deployment/docker)
- [配置说明](/zh-CN/developer/deployment/configuration)
