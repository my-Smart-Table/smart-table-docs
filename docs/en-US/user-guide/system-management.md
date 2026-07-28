# System Management

System Management is the backend administration module of SmartTable, accessible only to administrators. Through System Management, you can configure global parameters, manage user accounts, maintain email services, view operation logs, and ensure the platform runs securely and stably.

## Accessing System Management

1. Click the user avatar in the upper right corner.
2. Select **System Management** to enter the backend.
3. System Management contains multiple functional modules, switchable through the left sidebar or top tabs.

::: tip Permission Note
System Management is only open to administrator roles. Regular users, editors, and viewers cannot access it.
:::

## User Management

The User Management module is used to manage all user accounts on the platform, including adding, editing, disabling, deleting, and resetting passwords.

### User List

The user list displays basic information of all platform users:

| Field | Description |
| --- | --- |
| Email | User login account |
| Name | User display name |
| Role | Admin / Workspace Admin / Editor / Viewer |
| Status | Active / Inactive / Suspended / Deleted |
| Created At | Account creation time |

### Filtering and Searching

- Search users by email or name.
- Filter by role.
- Filter by status.

### Adding Users

Administrators can manually create new users:

1. Click the **Add User** button.
2. Enter email, name, and initial password.
3. Assign a role.
4. Click Save.

### Editing Users

- Modify user name and role.
- Disable or activate accounts.
- Reset user passwords.

### Batch Deletion

- Select multiple users.
- Click **Batch Delete** to delete multiple accounts at once.

## System Configuration

The System Configuration module is used to set platform-wide parameters, divided into Basic, Security, Email, and Other configurations.

### Basic Configuration

| Configuration | Description | Current Status |
| --- | --- | --- |
| System Name | Platform display name | Reserved, not yet enabled |
| System Description | Platform description | Reserved, not yet enabled |
| Page Size | Default table pagination size | Reserved, not yet enabled |
| Timezone Mode | UTC or local timezone | Enabled |
| Local Timezone | Select specific timezone name | Enabled |

#### Timezone Configuration

- **UTC Mode**: All times are stored and displayed in UTC.
- **Local Timezone Mode**: After selecting a timezone, times are interpreted and displayed in that timezone.
- Common timezones: Asia/Shanghai, Asia/Hong_Kong, Asia/Tokyo, America/New_York, etc.

### Security Configuration

| Configuration | Description |
| --- | --- |
| Password Min Length | Minimum password length, range 6 ~ 50 |
| Require Uppercase | Whether password must contain uppercase letters |
| Require Lowercase | Whether password must contain lowercase letters |
| Require Digit | Whether password must contain numbers |
| Require Special Character | Whether password must contain special characters |
| Session Timeout | Auto logout time after user inactivity (minutes) |
| Allow Registration | Whether to open self-registration entry |
| Enable 2FA | Reserved, not yet enabled |

#### Password Rules

After configuring password complexity, all users will be validated in real time when registering or changing passwords:

- Whether the length meets requirements.
- Whether required character types are included.
- Submission is blocked if rules are not met.

#### Registration Toggle

- When enabled, the login page shows a registration entry, and users can self-register.
- When disabled, the registration button is hidden and registration requests are blocked; only administrators can add users.

### Email Configuration

Email configuration is used to enable the platform's email sending capability, supporting SMTP servers.

| Configuration | Description |
| --- | --- |
| Enable Email Service | Master switch |
| SMTP Server | e.g., smtp.example.com |
| SMTP Port | e.g., 25, 465, 587 |
| Sender Email | Displayed sender address |
| Sender Display Name | Sender name |
| SMTP Username | SMTP authentication username |
| SMTP Password | SMTP authentication password |
| Encryption | SSL / TLS / None |

#### Test Email

After configuration, enter a test email address and click **Send Test Email** to verify the configuration.

#### Email Templates

System Management also provides email template management:

- Registration verification email
- Password reset email
- Notification email
- Custom templates

### Other Configuration

| Configuration | Description | Current Status |
| --- | --- | --- |
| Enable Logging | Whether to record operation logs | Reserved, not yet enabled |
| Log Retention Days | Log retention duration | Reserved, not yet enabled |
| Enable Performance Monitoring | Whether to enable performance monitoring | Reserved, not yet enabled |

## Operation Logs

The Operation Logs module records key operations on the platform for audit and troubleshooting.

### Recorded Content

- Operator
- Operation type (create, update, delete, login, etc.)
- Operation object
- Operation time
- IP address
- Operation result

### Log Uses

- Track the source of data changes.
- Investigate security incidents.
- Meet compliance audit requirements.

## Email Logs and Statistics

System Management also provides email sending logs and statistics:

- View the sending status of each email.
- View reasons for email sending failures.
- Statistics on email sending volume and success rate.

## Notes

- After modifying security configurations, logged-in users will not be forced to log out immediately, but the changes take effect upon next login or password change.
- After modifying timezone configuration, the displayed time of historical data may change.
- Sensitive information such as email passwords is usually displayed as ciphertext in the interface.
- It is recommended to back up current configurations before making important changes.
