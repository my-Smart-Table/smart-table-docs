# Development Environment

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

Visit `http://localhost:3000`

> The Vite dev server is configured in `vite.config.ts` to proxy `/api` and `/uploads` requests to `http://localhost:5000`, so the backend service must also be running during frontend development (see below).

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

#### Using Docker Compose

**Option 1: Unified image (SQLite, recommended for quick start and frontend development)** — run from the project root. A single container includes the frontend, backend and embedded Redis:

```bash
# From the project root (smart_table)
cp .env.example .env

# Build and start
docker compose up -d

# Visit http://localhost
```

**Option 2: Backend standalone orchestration (PostgreSQL + Redis)** — run from the `smarttable-backend` directory:

```bash
cd smarttable-backend

# Copy environment variables configuration
cp .env.example .env
# Edit .env to configure the PostgreSQL connection (DATABASE_URL)

# Start PostgreSQL + Redis + backend
docker compose up -d

# Run database migrations
docker compose exec backend python run.py migrate

# View logs
docker compose logs -f backend

# Access API documentation (Swagger UI)
# http://localhost:5000/apidocs
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
# You can also copy it to config/.env (run.py loads config/.env first, then .env)
cp .env.example .env
# Default uses SQLite, no need to modify DATABASE_URL

# Initialize / migrate the database
python run.py migrate

# Start the development server (real-time collaboration disabled by default,
# hot reload enabled when FLASK_DEBUG=True)
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
✅ **Email System**: Optional SMTP email sending (SMTP settings are maintained in the admin console under System Settings)\
✅ **Object Storage**: MinIO file storage (planned, not yet implemented; local file system is used)\
✅ **Security Protection**: XSS protection, rate limiting, security headers
