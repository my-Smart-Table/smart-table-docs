# Webhook 节点

Webhook 节点用于在工作流执行过程中调用外部 HTTP 接口，实现与第三方系统的数据互通。例如发送通知、同步数据、调用外部服务等。

## 适用场景

- 新订单创建后同步到 ERP 系统
- 任务状态变更时通知企业微信/钉钉/飞书
- 定时触发后将数据推送到 BI 平台
- 调用外部 AI 服务处理数据

## 配置方式

Webhook 节点支持两种配置方式：

| 方式 | 说明 |
| --- | --- |
| 选择已有 Webhook | 使用系统 Webhook 配置管理中已保存的配置 |
| 内联配置 | 在当前节点中直接配置 Webhook 参数，仅当前工作流生效 |

::: tip 提示
内联 Webhook 配置仅在当前工作流中使用，不会保存到全局 Webhook 配置列表。适合一次性或临时调用场景。
:::

## 配置项

### 基础信息

- **名称**：Webhook 名称，便于识别。
- **请求 URL**：外部接口地址，支持变量引用。
- **请求方法**：GET、POST、PUT。

### 请求头

配置 HTTP 请求头，例如：

| 请求头 | 示例值 |
| --- | --- |
| Content-Type | application/json |
| Authorization | Bearer {{token}} |
| X-API-Key | your-api-key |

### 请求体模板

POST/PUT 请求可配置请求体，支持 JSON 和变量引用：

```json
{
  "order_no": "{{trigger.record.order_no}}",
  "customer": "{{trigger.record.customer_name}}",
  "amount": {{trigger.record.amount}},
  "timestamp": "{{NOW}}"
}
```

### 重试策略

全局 Webhook 配置支持设置重试策略：

- **最大重试次数**：请求失败后的最大重试次数。
- **重试间隔**：每次重试之间的时间间隔。

## 变量引用

Webhook 节点支持引用工作流上下文变量：

```
{{trigger.record.<字段ID>}}
{{node_<节点ID>.<字段ID>}}
{{loop.current_data.<字段ID>}}
{{record}}  // 当前执行上下文中的记录
```

## 执行日志

Webhook 调用后，系统会记录投递日志：

- 请求 URL、方法、请求体
- 响应状态码、响应体
- 请求耗时
- 失败原因和重试记录

可在 Webhook 配置管理或节点执行日志中查看。

## 注意事项

- 确保外部接口可访问且返回正确的响应格式。
- 不要在 Webhook 配置中明文传输敏感信息，建议使用请求头传递密钥。
- 调用超时或失败时，系统会按重试策略自动重试。
- 内联 Webhook 不支持全局重投功能。
