# Docker Deployment

This guide explains how to deploy SmartTable with Docker. Docker is the fastest way to get a complete environment running without installing Node.js or Python manually.

## Prerequisites

- Docker 20.10 or later
- Docker Compose 2.0 or later

## Quick Deploy with the Official Image

The simplest deployment uses the official image:

```bash
docker run -d \
  --name smarttable \
  -p 80:80 \
  -v smarttable_data:/app/data \
  -v smarttable_uploads:/app/uploads \
  -v smarttable_redis:/data/redis \
  ygbinac/smarttable:latest
```

For ARM architectures, use the ARM64 tag:

```bash
ygbinac/smarttable:1.4.1-arm64
```

### Docker Compose (Official Image)

Create a `docker-compose.yml` file:

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

Start it with:

```bash
docker-compose up -d
```

## Source Deploy

To build and run from source:

```bash
# Clone the repository
git clone https://github.com/ldbinac/smart_table.git
cd smart-table-spec

# Copy environment variables
cp .env.example .env
# Edit .env as needed

# Start all services (frontend + backend + database)
docker-compose up -d

# Check service status
docker-compose ps

# View logs
docker-compose logs -f
```

Access URLs after startup:

| Service | URL |
|---------|-----|
| Frontend | `http://localhost` |
| Backend API | `http://localhost:5000/api` |
| API Docs | `http://localhost:5000/apidocs` |

## Production Deployment

For production, use the full stack with PostgreSQL and Redis:

```bash
docker-compose -f docker-compose.full.yml up -d
```

Or use the development PostgreSQL + Redis configuration:

```bash
docker-compose -f docker-compose.dev.yml up -d
```

## Docker Compose Service Architecture

```
smart-table-spec/
├── docker-compose.yml              # Development (SQLite)
├── docker-compose.full.yml         # Production (PostgreSQL + Redis + MinIO)
├── docker-compose.dev.yml          # Development (PostgreSQL + Redis)
├── Dockerfile                      # Frontend build + Nginx
├── smarttable-backend/
│   ├── Dockerfile                  # Backend application
│   └── docker-compose.yml          # Backend standalone orchestration
└── docker/
    ├── nginx/
    │   └── nginx.conf              # Nginx configuration
    └── supervisor/
        └── supervisord.conf        # Process manager configuration
```

## Environment Variables

Key variables are documented in `.env.example` and `smarttable-backend/.env.example`.

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `SECRET_KEY` | Flask secret key | — | Yes (production) |
| `JWT_SECRET_KEY` | JWT secret key | — | Yes (production) |
| `DATABASE_URL` | Database connection | `sqlite:///smarttable.db` | No |
| `REDIS_URL` | Redis address | `redis://localhost:6379/0` | No |
| `ENABLE_REALTIME` | Enable real-time collaboration | `false` | No |
| `MAIL_SERVER` | SMTP server | — | If using email |
| `MINIO_ENDPOINT` | MinIO address | — | If using object storage |

For a full list, see [Configuration](/en-US/developer/deployment/configuration.html).

## Viewing Logs

Inside the container, Supervisor manages three processes: `nginx`, `app-server` and `redis`. Logs are organized in four layers:

| Layer | Location | Contents |
| --- | --- | --- |
| Container stdout | `docker logs` | Container startup, database migration, Supervisor output |
| Supervisor process logs | `/var/log/supervisor/*.log` inside the container | Backend stack traces, per-process output |
| Application logs | `/app/logs/smarttable.log` (can be mounted to `./logs` on the host) | Business logs written by the Flask `app.logger` |
| Nginx logs | `/var/log/nginx/` inside the container | HTTP access records, reverse proxy errors |

### 1. Container Stdout

```bash
docker logs smarttable                 # Full log
docker logs -f smarttable              # Follow in real time
docker logs --tail=200 smarttable      # Last 200 lines
docker logs --previous smarttable      # Logs of the previous run after a crash
docker logs --since 30m smarttable     # Last 30 minutes
```

When starting with Docker Compose:

```bash
docker compose -f docker-compose.yml logs -f smarttable
docker compose -f docker-compose.full.yml logs -f          # Full deployment, also streams postgres / redis / minio
```

If the container keeps restarting, check its state first and read the previous run with `--previous`:

```bash
docker ps -a
```

### 2. Backend Process Logs (Supervisor)

These are the real runtime logs of the backend service, including exception stack traces:

```bash
# Backend process
docker exec smarttable tail -f /var/log/supervisor/app-server.err.log   # Errors and stack traces
docker exec smarttable tail -f /var/log/supervisor/app-server.out.log   # Runtime output, Eventlet request logs

# Other processes
docker exec smarttable tail -f /var/log/supervisor/nginx.err.log
docker exec smarttable tail -f /var/log/supervisor/redis.err.log
docker exec smarttable tail -f /var/log/supervisor/supervisord.log      # Process restart records

docker exec smarttable ls -lh /var/log/supervisor/                      # List all log files
```

Check and manage process status (the backend can be restarted without restarting the container):

```bash
docker exec smarttable supervisorctl status
docker exec smarttable supervisorctl restart app-server
```

### 3. Application Logs

In production mode Flask writes to `/app/logs/smarttable.log` inside the container: 10 MB per file, 10 rotated files kept (`smarttable.log.1` ~ `smarttable.log.10`).

If the log directory is mounted, you can read it directly on the host:

```yaml
volumes:
  - ./logs:/app/logs
```

```bash
tail -f ./logs/smarttable.log
grep "ERROR" ./logs/smarttable.log
```

If it is not mounted (for example when starting from the official image), read it inside the container or copy it out:

```bash
docker exec smarttable tail -f /app/logs/smarttable.log
docker cp smarttable:/app/logs/smarttable.log ./smarttable.log
```

### 4. Nginx Access Logs

Useful for investigating 4xx / 5xx responses and API latency. The log format includes `rt=` (total request time) and `urt=` (upstream response time):

```bash
docker exec smarttable tail -f /var/log/nginx/access.log
docker exec smarttable tail -f /var/log/nginx/error.log
```

### 5. Changing the Log Level

Set `DEBUG` in `.env` and recreate the container for more verbose output:

```bash
LOG_LEVEL=DEBUG
```

```bash
docker compose -f docker-compose.yml up -d --force-recreate
```

### 6. Windows (PowerShell) Commands

```powershell
docker logs -f --tail=100 smarttable 2>&1 | Select-String -Pattern "ERROR|Traceback"
Get-Content .\logs\smarttable.log -Tail 100 -Wait          # equivalent to tail -f
docker exec smarttable tail -f /var/log/supervisor/app-server.err.log
```

### Recommended Troubleshooting Order

1. `docker ps -a` — check the container state and whether it is stuck in `Restarting`.
2. `docker logs --tail=100 smarttable` — check whether startup hangs at database migration or initialization.
3. `docker exec smarttable supervisorctl status` — find out which process exited abnormally.
4. Inspect the matching `/var/log/supervisor/*.err.log`.
5. Inspect the business logs in `./logs/smarttable.log`.

::: tip Operation logs are not stored in files
User operation logs (who changed which record) are stored in the database. View them on the **Operation Logs** page in the admin console or through `/api/admin/operation-logs`; they are not part of the log files above.
:::

## Troubleshooting

### Port Conflict

If port 80 is already in use, change the port mapping in `docker-compose.yml`:

```yaml
ports:
  - "8080:80"
```

### Database Connection Failure

Check `DATABASE_URL` and make sure the database container or file path is reachable. See [Viewing Logs](#viewing-logs) for how to read the backend logs and locate the detailed error.

### Real-time Collaboration

Set `ENABLE_REALTIME=true` and configure `SOCKETIO_MESSAGE_QUEUE` when running multiple backend instances.
