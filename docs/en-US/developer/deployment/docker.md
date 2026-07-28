# Docker Deployment

This document introduces how to quickly deploy SmartTable using Docker.

## Prerequisites

- Docker 20.10+
- Docker Compose 2.0+

## Quick Deployment

### 1. Clone the Repository

```bash
git clone https://github.com/my-Smart-Table/smart-table-spec.git
cd smart-table-spec
```

### 2. Configure Environment Variables

```bash
cp smart-table/.env.example smart-table/.env
```

Edit the `.env` file and configure the necessary environment variables.

### 3. Start Services

```bash
docker-compose up -d
```

### 4. Access the Application

Open your browser and visit `http://localhost`

## Detailed Configuration

Please refer to [Configuration](/en-US/developer/deployment/configuration).

## Troubleshooting

### Common Issues

1. **Port Conflict**

   If port 80 is occupied, modify the port mapping in `docker-compose.yml`.

2. **Database Connection Failure**

   Check database configuration and connection status.
