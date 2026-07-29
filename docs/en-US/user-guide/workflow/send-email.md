# Send Email Node

The Send Email node is used to automatically send email notifications during workflow execution. It supports custom recipients, subjects, body content, and selection of system preset email templates.

## When to Use

- Send confirmation email to customers after a new order is created
- Send reminder emails before task deadlines
- Notify relevant personnel after approval passes
- Send data reports daily/weekly

## Prerequisites

Before using the Send Email node, an administrator needs to complete email service configuration in system settings:

- Enable email service
- Configure SMTP server, port, account, and password
- Configure sender email and encryption method
- Send a test email to verify the configuration

## Configuration

<img src="/images/user-guide/basic-features/workflow/workflow-instance.png" alt="Send Email node" style="max-width: 100%; border: 1px solid #e0e0e0; border-radius: 4px;">

### Recipients

Supports two recipient sources:

| Type | Description |
| --- | --- |
| Field | Get recipient from an email or member field in the record |
| Fixed | Manually enter one or more fixed email addresses |

### Subject

Supports static text and variable references:

```
You have a new task: {{trigger.record.task_name}}
```

### Body

Supports two content modes:

| Mode | Description |
| --- | --- |
| Custom | Manually write email body, supports variable references |
| Template | Select a preset email template maintained by the administrator |

### Custom Body Example

```
Hello, {{trigger.record.customer_name}}:

Your order {{trigger.record.order_no}} has been created, total amount {{trigger.record.amount}}.

Please log in to the system for details.
```

### Available Variables

- `{{trigger.record.<field_id>}}`: Trigger record field
- `{{node_<node_id>.record.<field_id>}}`: Previous node record field
- `{{loop.current_data.<field_id>}}`: Current loop iteration data

## Email Templates

If "Template" mode is selected, you can choose from system preset templates:

- Registration verification email
- Password reset email
- Notification email
- Custom templates

Template content is maintained by administrators in the system backend.

## Notes

- Email sending is asynchronous and may have a short delay.
- If SMTP configuration is incorrect, emails will enter a failed state and error information will be recorded.
- Recipient addresses must be valid email formats.
- When sending large volumes of emails frequently, it is recommended to configure email queues and retry policies.
