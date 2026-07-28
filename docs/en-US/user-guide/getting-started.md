# Getting Started

Welcome to SmartTable! This guide will help you get started quickly.

## One-click Start (Recommended)

Download the latest release package, extract it and start with one click:

> To get the default account email and password: Follow the official WeChat official account and reply with 'SmartTable' in private message.

```bash
# Windows PowerShell
.\start.bat

# Linux/macOS
./start.sh
```

<br />

> This one-click startup package requires no external dependencies, just double-click to run.
>
> **No need to install any dependencies, no need to manually create an account.**
>
> After startup, the browser will open automatically, then log in with the default account email and password to try it out.
> To get the default account email and password: Follow the official WeChat official account and reply with 'SmartTable' in private message.

## Docker Start

> To get the default account email and password: Follow the official WeChat official account and reply with 'SmartTable' in private message.

Start with the official Docker image:

```bash
docker run -d \
  --name smarttable \
  -p 80:80 \
  -v smarttable_data:/app/data \
  -v smarttable_uploads:/app/uploads \
  -v smarttable_redis:/data/redis \
  ygbinac/smarttable:latest
```

* Or use docker compose, just create the following docker-compose.yml:

```bash
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

## Development Environment

### Requirements

- Node.js >= 18
- pnpm >= 9
- Python >= 3.11 (Only for backend mode)

### Frontend Development

#### Install Dependencies

```bash
cd smart-table
pnpm install
```

#### Development Mode

```bash
pnpm run dev
```

Visit `http://localhost:5173`

#### Build for Production

```bash
pnpm run build
```

#### Preview Production Build

```bash
pnpm run preview
```

#### Run Tests

```bash
# Run all tests
pnpm run test

# Watch mode (for development)
pnpm run test:watch

# Generate test coverage report
pnpm run test:coverage
```

### Backend Service (Optional)

#### Using Docker Compose (Recommended)

```bash
cd smarttable-backend

# Copy environment variables configuration
cp .env.example .env
# Edit .env file to configure database connection (default uses SQLite)

# Start all services (SQLite mode)
docker-compose up -d

# Or use PostgreSQL + Redis (for production environment)
# v1.4.0 optimization: Docker deployment embeds Redis, no separate Redis container needed
docker-compose -f docker-compose.dev.yml up -d

# Run database migrations
docker-compose exec backend flask db upgrade

# View logs
docker-compose logs -f backend

# Access API documentation
# http://localhost:5000/apidocs  (Swagger UI)
```

#### Local Development

```bash
cd smarttable-backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Linux/macOS:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Copy environment variables configuration
cp .env.example .env
# Default uses SQLite, no need to modify DATABASE_URL

# Initialize database
flask db upgrade

# Start development server (real-time collaboration disabled by default)
flask run --reload

# Or use run.py to start (supports more options)
python run.py

# Enable real-time collaboration
python run.py --enable-realtime
# Or use short flag
python run.py -r
```

#### Backend Features

✅ **Default Database**: SQLite (lightweight, no additional installation required)\
✅ **Optional Database**: PostgreSQL (configurable via `DATABASE_URL` environment variable)\
✅ **Authentication**: JWT Token authentication with refresh token, email verification\
✅ **Permission Management**: Role-based access control (RBAC)\
✅ **Database Migration**: Alembic migration tool\
✅ **API Documentation**: Complete Swagger/OpenAPI documentation (Flasgger)\
✅ **Real-time Collaboration**: Optional WebSocket real-time collaboration (enable via `--enable-realtime`)\
✅ **Email System**: Optional SMTP email sending\
✅ **Object Storage**: Optional MinIO file storage\
✅ **Security Protection**: XSS protection, rate limiting, security headers

## Next Steps

- [Table Operations](/en-US/user-guide/table-operations.html)
- [View Management](/en-US/user-guide/views/table-view.html)
- [Field Types](/en-US/user-guide/field-types.html)
