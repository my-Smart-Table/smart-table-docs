# Configuration

SmartTable supports flexible configuration through environment variables and configuration files.

## Basic Configuration

### Application Configuration

| Environment Variable | Description | Default Value |
|---------|------|--------|
| `APP_ENV` | Running environment | `development` |
| `APP_PORT` | Service port | `3000` |
| `APP_HOST` | Service host | `0.0.0.0` |
| `APP_SECRET_KEY` | Application secret key | Required |

### Database Configuration

| Environment Variable | Description | Default Value |
|---------|------|--------|
| `DATABASE_URL` | Database connection string | Required |
| `DATABASE_POOL_SIZE` | Connection pool size | `20` |

Example:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/smarttable
```

### Cache Configuration

| Environment Variable | Description | Default Value |
|---------|------|--------|
| `REDIS_URL` | Redis connection address | `redis://localhost:6379/0` |
| `CACHE_TTL` | Cache expiration time (seconds) | `3600` |

## Advanced Configuration

### File Storage

| Environment Variable | Description | Default Value |
|---------|------|--------|
| `STORAGE_TYPE` | Storage type (local/s3) | `local` |
| `STORAGE_LOCAL_PATH` | Local storage path | `./uploads` |
| `S3_BUCKET` | S3 bucket name | Optional |
| `S3_REGION` | S3 region | Optional |

### Webhook Configuration

| Environment Variable | Description | Default Value |
|---------|------|--------|
| `WEBHOOK_TIMEOUT` | Webhook timeout (seconds) | `30` |
| `WEBHOOK_RETRY_COUNT` | Webhook retry count | `3` |

## Related Links

- [Docker Deployment](/en-US/developer/deployment/docker)
- [Manual Deployment](/en-US/developer/deployment/manual)
