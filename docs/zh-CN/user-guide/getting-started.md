# 快速开始

欢迎使用 SmartTable！本指南将帮助您快速上手。

## 系统要求

- Node.js 18+
- pnpm 9+

## 安装步骤

### 1. 克隆仓库

```bash
git clone https://github.com/my-Smart-Table/smart-table-spec.git
cd smart-table-spec
```

### 2. 安装依赖

```bash
pnpm install
```

### 3. 配置环境变量

```bash
cp smart-table/.env.example smart-table/.env
```

编辑 `.env` 文件，配置必要的环境变量。

### 4. 初始化数据库

```bash
cd smart-table
pnpm db:init
```

### 5. 启动开发服务器

```bash
pnpm dev
```

### 6. 访问应用

打开浏览器访问 `http://localhost:5173`

## 下一步

- [表格操作](/zh-CN/user-guide/table-operations)
- [视图管理](/zh-CN/user-guide/views/table-view)
- [字段类型](/zh-CN/user-guide/field-types)