# Webhook Node

The Webhook node is used to call external HTTP interfaces during workflow execution, enabling data exchange with third-party systems. For example, sending notifications, syncing data, or calling external services.

## When to Use

- Sync new orders to an ERP system
- Notify WeChat Work/DingTalk/Feishu when task status changes
- Push data to a BI platform after scheduled triggers
- Call external AI services to process data

## Configuration Methods

The Webhook node supports two configuration methods:

| Method | Description |
| --- | --- |
| Existing Webhook | Use a configuration already saved in the system Webhook management |
| Inline Configuration | Configure Webhook parameters directly in the current node; only effective for the current workflow |

::: tip Note
Inline Webhook configurations are only used in the current workflow and are not saved to the global Webhook configuration list. Suitable for one-time or temporary call scenarios.
:::

## Configuration

<img src="/images/user-guide/basic-features/workflow/workflow-webhook.png" alt="Webhook node" style="max-width: 100%; border: 1px solid #e0e0e0; border-radius: 4px;">

### Basic Information

- **Name**: Webhook name for easy identification.
- **Request URL**: External interface address, supports variable references.
- **Request Method**: GET, POST, PUT.

### Request Headers

Configure HTTP request headers, for example:

| Header | Example Value |
| --- | --- |
| Content-Type | application/json |
| Authorization | Bearer {{token}} |
| X-API-Key | your-api-key |

### Request Body Template

POST/PUT requests can configure a request body, supporting JSON and variable references:

```json
{
  "order_no": "{{trigger.record.order_no}}",
  "customer": "{{trigger.record.customer_name}}",
  "amount": {{trigger.record.amount}},
  "timestamp": "{{NOW}}"
}
```

### Retry Policy

Global Webhook configurations support setting retry policies:

- **Max Retries**: Maximum number of retries after request failure.
- **Retry Interval**: Time interval between each retry.

## Variable References

The Webhook node supports referencing workflow context variables:

```
{{trigger.record.<field_id>}}
{{node_<node_id>.<field_id>}}
{{loop.current_data.<field_id>}}
{{record}}  // Record in current execution context
```

## Execution Logs

After a Webhook call, the system records delivery logs:

- Request URL, method, request body
- Response status code, response body
- Request duration
- Failure reason and retry records

These can be viewed in the Webhook configuration management or node execution logs.

## Notes

- Ensure the external interface is accessible and returns the correct response format.
- Do not transmit sensitive information in plain text in Webhook configurations; it is recommended to pass secrets through request headers.
- When calls time out or fail, the system automatically retries according to the retry policy.
- Inline Webhooks do not support global redelivery functionality.
