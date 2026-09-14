# Configuration

SmartTable is configured through environment variables (or a `.env` file). For Docker deployment use the `.env.example` / `.env.full.example` templates in the project root; for local development use `smarttable-backend/.env.example` (copy it to `smarttable-backend/.env` or `smarttable-backend/config/.env`).

## Basic Configuration

### Application

| Environment Variable | Description | Default Value |
|---------|------|--------|
| `FLASK_ENV` | Running environment (development / testing / production) | `development` |
| `FLASK_HOST` | Listen address | `0.0.0.0` |
| `FLASK_PORT` | Listen port | `5000` |
| `LOG_LEVEL` | Log level (DEBUG / INFO / WARNING / ERROR) | `INFO` |

### Security

| Environment Variable | Description | Default Value |
|---------|------|--------|
| `SECRET_KEY` | Flask session secret | Required in production |
| `JWT_SECRET_KEY` | JWT signing secret | Required in production |
| `JWT_ACCESS_TOKEN_EXPIRES` | Access token lifetime (seconds) | `86400` |

Generate a strong secret: `python -c "import secrets; print(secrets.token_hex(32))"`

### Database

| Environment Variable | Description | Default Value |
|---------|------|--------|
| `DATA_DIR` | Data directory | `data` |
| `DATABASE_URL` | Database connection string | `sqlite:///data/smarttable.db` |

Example (PostgreSQL, note the `psycopg` driver):

```env
DATABASE_URL=postgresql+psycopg://user:password@localhost:5432/smarttable
```

After changing the database, run the migration again: `python run.py migrate`.

### File Storage

| Environment Variable | Description | Default Value |
|---------|------|--------|
| `UPLOAD_FOLDER` | Upload directory | `uploads` |

Attachments are stored on the local file system; MinIO object storage is a planned extension and is not implemented yet.

## Cache & Real-time Collaboration

| Environment Variable | Description | Default Value |
|---------|------|--------|
| `REDIS_URL` | Redis connection address | `redis://localhost:6379/0` |
| `ENABLE_REALTIME` | Enable real-time collaboration (WebSocket) | `false` |
| `SOCKETIO_MESSAGE_QUEUE` | SocketIO message queue Redis address | `redis://localhost:6379/2` |
| `SOCKETIO_PING_TIMEOUT` | SocketIO ping timeout (seconds) | `60` |
| `SOCKETIO_PING_INTERVAL` | SocketIO ping interval (seconds) | `25` |

## Other Settings

| Environment Variable | Description | Default Value |
|---------|------|--------|
| `CORS_ORIGINS` | Allowed cross-origin origins (comma separated), recommended in production | Local origins |
| `TIANDITU_KEY` | Tianditu JS API key; enables the map location picker when set | Empty |
| `TIANDITU_API_BASE` | Tianditu API base URL | `https://api.tianditu.gov.cn` |
| `ERROR_SHOW_DETAILS` | Show detailed stack traces in error responses (debug only) | `false` |

> Note: SMTP email settings are not environment variables — log in to the admin console and maintain the SMTP server, port and credentials under System Settings.

For the full list, see [.env.example](https://github.com/ldbinac/smart_table/blob/main/.env.example) and [smarttable-backend/.env.example](https://github.com/ldbinac/smart_table/blob/main/smarttable-backend/.env.example).

## Related Links

- [Docker Deployment](/en-US/developer/deployment/docker)
- [Manual Deployment](/en-US/developer/deployment/manual)
