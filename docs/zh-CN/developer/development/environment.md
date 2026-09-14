# 开发环境

### 环境要求

- Node.js >= 18
- pnpm >= 9
- Python >= 3.11（仅后端模式需要）

### 前端开发

#### 安装依赖

```bash
cd smart-table
pnpm install
```

#### 开发模式

```bash
pnpm run dev
```

访问 `http://localhost:3000`

> Vite 开发服务器已在 `vite.config.ts` 中配置代理：`/api` 与 `/uploads` 请求会自动转发到 `http://localhost:5000`，因此前端开发时需要同时启动后端服务（见下文）。

#### 构建生产版本

```bash
pnpm run build
```

#### 预览生产版本

```bash
pnpm run preview
```

#### 运行测试

```bash
# 运行所有测试
pnpm run test

# 监听模式运行测试（开发时使用）
pnpm run test:watch

# 生成测试覆盖率报告
pnpm run test:coverage
```

### 后端服务

#### 使用 Docker Compose

**方式一：统一镜像（SQLite，推荐快速体验与前端开发）**——在项目根目录执行，单个容器包含前端、后端与内嵌 Redis：

```bash
# 在项目根目录（smart_table）
cp .env.example .env

# 构建并启动
docker compose up -d

# 访问 http://localhost
```

**方式二：后端独立编排（PostgreSQL + Redis）**——在 `smarttable-backend` 目录执行：

```bash
cd smarttable-backend

# 复制环境变量配置文件
cp .env.example .env
# 编辑 .env，配置 PostgreSQL 连接（DATABASE_URL）

# 启动 PostgreSQL + Redis + 后端
docker compose up -d

# 执行数据库迁移
docker compose exec backend python run.py migrate

# 查看日志
docker compose logs -f backend

# 访问 API 文档（Swagger UI）
# http://localhost:5000/apidocs
```

#### 本地开发

```bash
cd smarttable-backend

# 创建虚拟环境
python -m venv venv

# 激活虚拟环境
# Windows:
venv\Scripts\activate
# Linux/macOS:
source venv/bin/activate

# 安装依赖
pip install -r requirements.txt

# 复制环境变量配置文件
# 也可复制为 config/.env（run.py 会优先加载 config/.env，其次加载 .env）
cp .env.example .env
# 默认使用 SQLite，无需修改 DATABASE_URL

# 初始化/迁移数据库
python run.py migrate

# 启动开发服务器（默认不启用实时协作，FLASK_DEBUG=True 时支持热重载）
python run.py

# 启用实时协作功能
python run.py --enable-realtime
```

> 或者通过修改 .env 的 `ENABLE_REALTIME=True` 来配置协同编辑功能

#### 后端特性

✅ **默认数据库**: SQLite（轻量级，无需额外安装）\
✅ **可选数据库**: PostgreSQL（通过环境变量 `DATABASE_URL` 配置）\
✅ **认证系统**: JWT Token 认证，支持刷新 Token、邮箱验证\
✅ **权限管理**: 基于角色的权限控制（RBAC）\
✅ **数据迁移**: Alembic 数据库迁移工具\
✅ **API 文档**: 完整的 Swagger/OpenAPI 文档（Flasgger）\
✅ **实时协作**: 可选的 WebSocket 实时协作功能（通过 `--enable-realtime` 启用）\
✅ **邮件系统**: 可选的 SMTP 邮件发送功能（SMTP 配置在管理后台「系统设置」中维护）\
✅ **对象存储**: MinIO 文件存储（规划中，尚未实现，当前使用本地文件系统）\
✅ **安全防护**: XSS 防护、速率限制、安全响应头
