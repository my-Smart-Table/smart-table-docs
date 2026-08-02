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
```

## User Authentication

### Register an Account

1. Visit the system and click **Register** to enter the registration page.
2. Fill in the registration information: username (3-20 characters), email, password (≥8 characters, including uppercase, lowercase, and digits), and verification code.
3. Click the **Register** button to complete registration.
4. The system will send an email verification message (if email service is enabled).
5. After successful registration, you will be redirected to the login page automatically.

### Log In

1. Enter your email, password, and verification code.
2. Click the **Log In** button.
3. After successful login, you will be redirected to the homepage.
4. The system uses JWT Token for authentication and supports automatic token refresh.

> ⚠️ **Security tip**: After 5 consecutive failed login attempts, the account will be locked for 15 minutes.

### Forgot Password

1. On the login page, click **Forgot Password**.
2. Enter your email and verification code.
3. The system will send a password reset email.
4. Click the reset link in the email to set a new password.

### Change Password

1. After logging in, click the user avatar in the upper-right corner.
2. Select **Settings**.
3. Find **Change Password** on the settings page.
4. Enter your current password and new password.
5. Click **Confirm Change**.

### Log Out

1. Click the user avatar in the upper-right corner → select **Log Out**.
2. The system clears the local token and redirects to the login page.

## Homepage and Base Management

The homepage provides four navigation tabs:

- **Home**: favorites and all card views
- **All**: list view and pagination
- **Templates**: a variety of preset templates
- **Share**: bases I shared / bases shared with me

### Create a Base

1. Click the **New** button in the upper-right corner of the homepage.
2. In the pop-up dialog, select a creation method:
   - **Create Blank Base**: create from scratch
   - **Create from Template**: quickly create using a preset template
3. Fill in the base information:
   - **Name** (required, 1-50 characters)
   - **Description** (optional, up to 200 characters)
   - **Icon**: choose from multiple preset icons
   - **Color**: choose from multiple preset colors
4. Click **Create** to finish.

### Manage Bases

- **Edit**: click the menu in the lower-right corner of the card → Edit, then modify the name, description, icon, and color
- **Delete**: click the menu in the lower-right corner of the card → Delete (deletion cannot be undone)
- **Star / Unstar**: click the star icon on the card
- **Search**: enter keywords in the top search bar to search for bases
- **Open**: click the card to open the base directly (opens in a new tab)

### Sharing View

On the **Share** tab:

- **Shared by Me**: view sharing links you created; supports copying links and deleting shares
- **Shared with Me**: view bases shared with you by other users