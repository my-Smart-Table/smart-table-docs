# 架构设计

SmartTable 采用前后端分离架构，前端基于 Vue 3 构建用户界面，后端基于 Flask 提供 API 服务，数据库支持 SQLite 和 PostgreSQL，可根据场景灵活选择。

## 技术栈

### 前端技术栈

| 类别 | 技术 | 版本 | 说明 |
| --- | --- | --- | --- |
| 前端框架 | Vue 3 | ^3.5.30 | Composition API |
| 语言 | TypeScript | ~5.9.3 | 类型安全 |
| 状态管理 | Pinia | ^2.3.1 | 轻量级状态管理 |
| 路由 | Vue Router | ^4.6.4 | SPA 路由 |
| UI 组件库 | Element Plus | ^2.13.6 | 企业级 UI 组件 |
| 表格组件 | vxe-table / vtable | ^4.18.7 / ^1.26.3 | vxe-table（v1.4 及更早）；vtable（v1.5 及更新） |
| 图表库 | echarts + vue-echarts | ^5.6.0 / ^6.7.3 | 数据可视化 |
| 日期处理 | dayjs | ^1.11.20 | 轻量级日期库 |
| 拖拽排序 | sortablejs | ^1.15.7 | 拖拽功能 |
| HTTP 客户端 | axios | ^1.14.0 | HTTP 请求 |
| 本地数据库 | Dexie | ^3.2.7 | IndexedDB 封装 |
| WebSocket | socket.io-client | ^4.8.3 | 实时通信 |
| 工具库 | lodash-es, @vueuse/core | - | 工具函数集 |
| 富文本 | tinyeditor | ^4.0.0 | 富文本编辑器（1.4+） |
| 电子表格 | xlsx | ^0.18.5 | Excel 解析生成 |
| 构建工具 | Vite | ^8.0.1 | 极速构建工具 |
| 测试框架 | Vitest | ^3.2.4 | 单元测试 |

### 后端技术栈

| 类别 | 技术 | 版本 | 说明 |
| --- | --- | --- | --- |
| 框架 | Flask | 3.0.0 | Python Web 框架 |
| 数据库 | SQLite / PostgreSQL | 3.x / 16+ | 关系型数据库 |
| ORM | SQLAlchemy | 2.0.23 | Python ORM |
| 数据库迁移 | Alembic（Flask-Migrate） | 4.0.5 | 数据库版本管理 |
| 认证 | Flask-JWT-Extended | 4.6.0 | JWT Token 认证 |
| 密码加密 | Flask-Bcrypt, bcrypt | 1.0.1 / 4.1.2 | 密码哈希 |
| 表单验证 | Flask-WTF | 1.2.1 | CSRF 保护 |
| CORS | Flask-CORS | 4.0.0 | 跨域支持 |
| 缓存 | Flask-Caching（+ Redis 可选） | 2.1.0 | 缓存加速 |
| WebSocket | Flask-SocketIO | 5.3.6 | 实时通信 |
| 异步支持 | eventlet | 0.36.1 | 异步处理 |
| 数据序列化 | marshmallow | 3.20.1 | 数据验证序列化 |
| 导入导出 | pandas, openpyxl, xlrd | 2.1.4 / 3.1.2 / 2.0.1 | 数据处理 |
| 图片处理 | Pillow | 10.4.0 | 图片缩略图 |
| 对象存储 | MinIO（可选） | - | 文件对象存储 |
| 加密 | cryptography | 42.0.5 | 加密算法 |
| API 文档 | Flasgger | 0.9.7b2 | Swagger UI |
| WSGI 服务器 | Eventlet WSGI Server | 0.36.1 | 生产服务器 |
| 部署 | Docker, Nginx | - | 容器化部署 |

### 数据存储方案

| 模式 | 技术 | 说明 |
| --- | --- | --- |
| 前端缓存 | Dexie（IndexedDB） | 数据存储在浏览器本地作为缓存 |
| 后端（默认） | SQLite + Flask | 轻量级，无需额外安装数据库 |
| 后端（生产） | PostgreSQL + Flask | 支持多用户并发和生产环境 |

## 系统架构图

```
┌─────────────┐
│   Browser   │
└──────┬──────┘
       │
       ├─ HTTP/WebSocket
       │
┌──────▼──────┐      ┌─────────────┐
│    Nginx    │─────▶│  Frontend   │
└──────┬──────┘      └─────────────┘
       │
       │ HTTP API
       │
┌──────▼──────┐      ┌─────────────┐
│   Backend   │─────▶│  Database   │
│   (Flask)   │      │(SQLite/PG)  │
└──────┬──────┘      └─────────────┘
       │
       │
┌──────▼──────┐
│File Storage │
│(Local/MinIO)│
└─────────────┘
```

## 数据模型

### 核心实体关系

```
User（用户）
  ├── owns many Base（多维表格）
  ├── is member of many Base（通过 BaseMember）
  └── has many OperationLog（操作日志）

Base（多维表格）
  ├── has many Table（数据表）
  ├── has many Dashboard（仪表盘）
  ├── has many BaseShare（分享链接）
  ├── has many BaseMember（成员）
  ├── has many CollaborationSession（协作会话）
  └── has many Workflow（工作流）

Table（数据表）
  ├── has many Field（字段）
  ├── has many Record（记录）
  ├── has many View（视图）
  ├── has many LinkRelation（关联关系）
  ├── has many Workflow（关联工作流）
  └── belongs to Base

Field（字段）
  ├── has options（字段配置）
  └── belongs to Table

Record（记录）
  ├── has many RecordHistory（变更历史）
  ├── has values for each Field
  └── belongs to Table

View（视图）
  ├── has filter/sort/group configs
  └── belongs to Table

Workflow（工作流）
  ├── has many WorkflowVersion（版本快照）
  ├── has many WebhookConfig（Webhook 配置）
  └── belongs to Base/Table

WebhookConfig（Webhook 配置）
  ├── has many WebhookDelivery（投递记录）
  └── belongs to Workflow
```

### 主要模型说明

#### User（用户）

- 存储用户认证信息（用户名、邮箱、密码哈希）。
- 记录邮箱验证状态。
- 区分普通用户和管理员角色。
- 支持头像和个人资料。

#### Base（多维表格）

- SmartTable 的数据管理基础单元。
- 支持收藏、自定义图标和颜色。
- 包含成员管理和权限控制。
- 支持分享设置（公开 / 私有 / 密码保护）。

#### Table（数据表）

- 包含字段定义和记录数据。
- 支持拖拽排序和收藏。
- 可配置关联关系。

#### Field（字段）

- 定义数据列的类型和属性。
- 支持 26 种字段类型。
- 提供丰富的字段选项（验证规则、默认值、格式化等）。

#### Record（记录）

- 数据表中的一行数据。
- 支持增删改查和批量操作。
- 拥有完整的变更历史追踪。

#### View（视图）

- 数据的展示方式。
- 拥有独立的筛选、排序、分组配置。
- 支持视图级别字段控制（隐藏、冻结、宽度）。

#### Document（文档）

- 文档存储与管理，关联到 Base。
- 支持富文本和 Markdown 内容。
- 权限继承自所属 Base。

#### Workflow（工作流）

- 工作流自动化引擎的核心实体。
- 绑定到 Base 或具体 Table。
- 包含触发器配置和节点执行链。
- 支持暂停、继续、编辑和版本管理。

## 核心模块

### 权限系统

- 基于角色的访问控制（RBAC）。
- 支持 Base 级、Table 级、Record 级和 Field 级权限。
- 五种默认角色：所有者、管理员、编辑者、评论者、查看者。

### 实时协作

- WebSocket 连接管理。
- 操作广播机制。
- 单元格锁定与冲突检测。
- 离线队列和优雅降级。

### 工作流引擎

- 触发器管理。
- 条件判断与分支。
- 节点执行与排序。
- 执行日志和版本管理。

## 性能优化

### 前端优化

- 代码分割与懒加载。
- 表格虚拟滚动。
- IndexedDB 本地缓存。

### 后端优化

- 数据库索引优化。
- 查询优化。
- Redis 缓存（可选）。

## 安全设计

### 认证授权

- JWT Token 认证。
- 会话管理。
- 权限验证。

### 网络安全

- HTTPS 加密。
- CORS 配置。
- XSS / CSRF 防护。
- API 速率限制。

### 数据安全

- 敏感数据加密。
- 日志脱敏。
- 数据隔离与备份机制。

## 扩展性设计

- 自定义字段类型（通过后端模型扩展）。
- Webhook 集成。
- 第三方 API 集成。
- 可选的 MinIO 对象存储。

## 相关链接

- [Docker 部署](/zh-CN/developer/deployment/docker.html)
- [配置说明](/zh-CN/developer/deployment/configuration.html)
- [RESTful API 概述](/zh-CN/developer/api/overview.html)
