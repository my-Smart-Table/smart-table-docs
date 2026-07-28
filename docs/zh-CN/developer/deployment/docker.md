# Docker 部署

本文档介绍如何使用 Docker 快速部署 SmartTable。

## 前置要求

- Docker 20.10+
- Docker Compose 2.0+

## 快速部署

### 1. 克隆仓库

```bash
git clone https://github.com/my-Smart-Table/smart-table-spec.git
cd smart-table-spec
```

### 2. 配置环境变量

```bash
cp smart-table/.env.example smart-table/.env
```

编辑 `.env` 文件，配置必要的环境变量。

### 3. 启动服务

```bash
docker-compose up -d
```

### 4. 访问应用

打开浏览器访问 `http://localhost`

## 详细配置

请参考 [配置说明](/zh-CN/developer/deployment/configuration)。

## 故障排查

### 常见问题

1. **端口冲突**

   如果 80 端口被占用，修改 `docker-compose.yml` 中的端口映射。

2. **数据库连接失败**

   检查数据库配置和连接状态。