# Manual Deployment

If you want more flexible control over the deployment environment, you can choose manual deployment of SmartTable.

## Environment Requirements

- Node.js 18+
- pnpm 9+
- PostgreSQL 14+ or SQLite
- Redis 6+ (for caching and queues)

## Installation Steps

### 1. Clone the Code

```bash
git clone https://github.com/ldbinac/smart_table.git
cd smart_table
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Configure Environment Variables

```bash
cp .env.example .env
```

Edit the `.env` file and configure database connection, secret key and other information.

### 4. Run Database Migrations

```bash
cd smart-table
alembic upgrade head
```

### 5. Start Services

```bash
pnpm dev
```

## Production Deployment

### Using PM2

```bash
pnpm build
pm2 start ecosystem.config.js
```

### Nginx Reverse Proxy

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

## Related Links

- [Docker Deployment](/en-US/developer/deployment/docker)
- [Configuration](/en-US/developer/deployment/configuration)
