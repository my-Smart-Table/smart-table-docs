# 一键部署

SmartTable 提供开箱即用的一键启动包，无需安装任何外部依赖，解压后即可运行。这是体验或私有化部署 SmartTable 最快的方式。

## 下载启动包

前往项目 [GitHub Releases](https://github.com/ldbinac/smart_table/releases) 页面，下载对应操作系统的一键启动包：

- Windows：`smarttable-windows-x64.zip`
- Linux：`smarttable-linux-x64.tar.gz`
- macOS：`smarttable-macos-x64.tar.gz`（Apple Silicon 用户请选择 `arm64` 版本）

## 启动服务

解压下载的启动包，进入目录后执行启动脚本：

```bash
# Windows PowerShell
.\start.bat

# Linux/macOS
./start.sh
```

启动成功后会自动打开浏览器，并提示默认的登录账号信息。

## 获取默认账号

> 默认账号邮箱和默认密码获取方式：关注官方微信公众号，私信回复：**SmartTable**，即可获取。

## 注意事项

- 一键启动包内置 SQLite 数据库，适合个人试用或小型团队使用
- 数据默认保存在启动包目录下的 `data` 文件夹中，建议定期备份
- 如需使用 PostgreSQL 或 Redis，请参考 [Docker 部署](./docker.html) 或 [手动部署](./manual.html)

## 相关链接

- [Docker 部署](./docker.html)
- [手动部署](./manual.html)
- [配置说明](./configuration.html)
