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