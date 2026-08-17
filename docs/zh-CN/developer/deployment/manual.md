# 手动部署

如果您希望更灵活地控制部署环境，可以选择手动部署 SmartTable。

## 环境要求

- Node.js 18+
- pnpm 9+
- PostgreSQL 14+ 或 SQLite
- Redis 6+（用于缓存和队列）

## 安装步骤

### 1. 克隆代码

```bash
git clone https://github.com/ldbinac/smart_table.git
cd smart_table
```

### 2. 安装依赖

```bash
pnpm install
```

### 3. 配置环境变量

```bash
cp .env.example .env
```

编辑 `.env` 文件，配置数据库连接、密钥等信息。

### 4. 执行数据库迁移

```bash
cd smart-table
alembic upgrade head
```

### 5. 启动服务

```bash
pnpm dev
```

## 生产环境部署

### 使用 PM2

```bash
pnpm build
pm2 start ecosystem.config.js
```

### Nginx 反向代理

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 相关链接

- [Docker 部署](/zh-CN/developer/deployment/docker)
- [配置说明](/zh-CN/developer/deployment/configuration)
