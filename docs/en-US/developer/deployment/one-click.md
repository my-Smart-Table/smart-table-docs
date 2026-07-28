# One-click Deployment

SmartTable provides an out-of-the-box one-click startup package. No external dependencies are required—just extract and run. This is the fastest way to experience or privately deploy SmartTable.

## Download the Startup Package

Go to the project [GitHub Releases](https://github.com/ldbinac/smart_table/releases) page and download the startup package for your operating system:

- Windows: `smarttable-windows-x64.zip`
- Linux: `smarttable-linux-x64.tar.gz`
- macOS: `smarttable-macos-x64.tar.gz` (Apple Silicon users please choose the `arm64` version)

## Start the Service

Extract the downloaded package and run the startup script in the extracted directory:

```bash
# Windows PowerShell
.\start.bat

# Linux/macOS
./start.sh
```

After successful startup, the browser will open automatically and prompt the default login account information.

## Get the Default Account

> To get the default account email and password: Follow the official WeChat official account and reply with **SmartTable** in a private message.

## Notes

- The one-click startup package includes a built-in SQLite database, suitable for personal trials or small teams
- Data is saved in the `data` folder under the package directory by default; regular backups are recommended
- For PostgreSQL or Redis, please refer to [Docker Deployment](./docker.html) or [Manual Deployment](./manual.html)

## Related Links

- [Docker Deployment](./docker.html)
- [Manual Deployment](./manual.html)
- [Configuration](./configuration.html)
