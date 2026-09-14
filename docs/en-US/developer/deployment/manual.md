# Manual Deployment

If you prefer to deploy SmartTable without Docker and with full control over the environment, use manual deployment.

## Environment Requirements

- Python 3.11+ (backend)
- Node.js 18+ and pnpm 9+ (to build the frontend)
- SQLite (default, no installation required) or PostgreSQL 13+
- Redis 6+ (optional, required for real-time collaboration)

## Installation Steps

### 1. Clone the Code

```bash
git clone https://github.com/ldbinac/smart_table.git
cd smart_table
```

### 2. Configure and Start the Backend

```bash
cd smarttable-backend

# Create a virtual environment
python -m venv venv
# Windows:
venv\Scripts\activate
# Linux/macOS:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure environment variables (SQLite by default, no need to change DATABASE_URL)
cp .env.example .env
# Make sure to change SECRET_KEY and JWT_SECRET_KEY for production

# Initialize / migrate the database
python run.py migrate

# Ensure the default admin account exists (auto-created if missing)
python run.py ensure-admin

# Start the backend (listens on 0.0.0.0:5000 by default)
python run.py
```

### 3. Build the Frontend

```bash
cd ../smart-table

pnpm install
pnpm run build
```

The build output is written to the `smart-table/dist` directory.

### 4. Host the Frontend and Proxy the API

Serve the `dist` directory with any static server (Nginx / Caddy, etc.) and proxy `/api` to the backend on port 5000. Nginx example:

```nginx
server {
    listen 80;
    server_name your-domain.com;
    client_max_body_size 50M;

    # API reverse proxy
    location /api/ {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Real-time collaboration WebSocket (required when ENABLE_REALTIME is enabled)
    location /socket.io/ {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_read_timeout 86400s;
    }

    # Frontend static files (SPA routes fall back to index.html)
    location / {
        root /var/www/smarttable;
        try_files $uri $uri/ /index.html;
    }
}
```

After that, the app is available at `http://your-domain.com`.

## Production Recommendations

- **Secrets**: replace `SECRET_KEY` and `JWT_SECRET_KEY` in `.env` with strong random values:
  `python -c "import secrets; print(secrets.token_hex(32))"`
- **Process management**: manage the `python run.py` process with systemd, supervisor, etc.
- **Database**: use PostgreSQL for multi-user workloads — change `DATABASE_URL` and run `python run.py migrate` again:
  `DATABASE_URL=postgresql+psycopg://user:password@localhost:5432/smarttable`
- **Real-time collaboration**: set `ENABLE_REALTIME=true` in `.env` and make sure Redis is reachable

## Related Links

- [Docker Deployment](/en-US/developer/deployment/docker)
- [Configuration](/en-US/developer/deployment/configuration)
