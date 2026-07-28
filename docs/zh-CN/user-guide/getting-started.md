# 快速开始

欢迎使用 SmartTable！本指南将帮助您快速上手。

## 一键启动（推荐）

下载最新 release 版本下的一键启动包，解压之后一键启动：

> 默认账号邮箱和默认密码获取方式：关注官方微信公众号，私信回复：'SmartTable'，即可获取。

```bash
# Windows PowerShell
.\start.bat

# Linux/macOS
./start.sh
```

> 该一键启动包无需依赖任何外部环境，双击即可启动。
>
> **无需安装任何依赖，无需手工创建账号。**
>
> 启动后会自动打开浏览器，然后使用默认的账号邮箱和密码登录即可试用。
> 默认账号邮箱和默认密码获取方式：关注官方微信公众号，私信回复：'SmartTable'，即可获取。

## Docker 启动

使用官方 docker 镜像启动（自动适配架构）：

> 默认账号邮箱和默认密码获取方式：关注官方微信公众号，私信回复：'SmartTable'，即可获取。

```bash
docker run -d \
  --name smarttable \
  -p 80:80 \
  -v smarttable_data:/app/data \
  -v smarttable_uploads:/app/uploads \
  -v smarttable_redis:/data/redis \
  ygbinac/smarttable:latest
```

或者使用 docker compose，只需创建以下 `docker-compose.yml`：

```yaml
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