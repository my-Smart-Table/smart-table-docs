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

访问 `http://localhost:5173`

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

#### 使用 Docker Compose（推荐）

```bash
cd smarttable-backend

# 复制环境变量配置文件
cp .env.example .env
# 编辑 .env 文件配置数据库连接等（默认使用 SQLite）

# 启动所有服务（SQLite 模式）
docker-compose up -d

# 或使用 PostgreSQL + Redis（适合生产环境）
# v1.4.0 优化：Docker 部署内嵌 Redis，无需额外启动 Redis 容器
docker-compose -f docker-compose.dev.yml up -d

# 执行数据库迁移
docker-compose exec backend flask db upgrade

# 查看日志
docker-compose logs -f backend

# 访问 API 文档
# http://localhost:5000/apidocs  (Swagger UI)
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
cp .env.example .env
# 默认使用 SQLite，无需修改 DATABASE_URL

# 初始化数据库
flask db upgrade

# 启动开发服务器（默认不启用实时协作）
flask run --reload

# 或使用 run.py 启动（支持更多选项）
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
✅ **邮件系统**: 可选的 SMTP 邮件发送功能\
✅ **对象存储**: 可选的 MinIO 文件存储\
✅ **安全防护**: XSS 防护、速率限制、安全响应头
