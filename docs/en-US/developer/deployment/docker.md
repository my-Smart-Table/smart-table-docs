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

## Troubleshooting

### Port Conflict

If port 80 is already in use, change the port mapping in `docker-compose.yml`:

```yaml
ports:
  - "8080:80"
```

### Database Connection Failure

Check `DATABASE_URL` and make sure the database container or file path is reachable.

### Real-time Collaboration

Set `ENABLE_REALTIME=true` and configure `SOCKETIO_MESSAGE_QUEUE` when running multiple backend instances.
