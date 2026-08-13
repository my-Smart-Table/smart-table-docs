# Frequently Asked Questions

This section collects common issues and solutions you may encounter when deploying and using SmartTable. If your issue is not covered here, please contact us via the "Issue Feedback" button in the top-right corner or through GitHub Issues.

## Deployment & Installation

### Docker deployment is inaccessible after startup

**Symptom**: After running `docker run`, the browser shows connection refused or 502 when accessing `http://localhost`.

**Solution**:

1. Confirm the container is running: `docker ps` and check that the status is `Up`.
2. View container logs: `docker logs <container_id>` to check for port conflicts or startup errors.
3. Confirm the port mapping is correct, e.g., `-p 80:80` maps container port 80 to host port 80.
4. If port 80 is occupied, use a different port such as `-p 8080:80` and access `http://localhost:8080`.
5. Check whether the firewall or security group allows the corresponding port.

### Windows startup package flashes and exits when running start.bat

**Symptom**: Double-clicking `start.bat` causes a black window to flash and the service does not start.

**Solution**:

1. Do not double-click directly. Instead, run `start.bat` in PowerShell or CMD to see the full error output.
2. Check whether antivirus software has blocked the program; add the package directory to the whitelist if necessary.
3. Make sure the path does not contain Chinese or special characters; it is recommended to place it in a pure English path.
4. Check the log files in the `logs/` directory for specific errors.

### Backend logs show Redis connection failure

**Symptom**: Startup reports `ConnectionError` or `Redis is not running`.

**Solution**:

1. Docker deployment includes Redis by default. For manual deployment, Redis must be installed and started separately.
2. Check whether `REDIS_URL` in `.env` or environment variables is configured correctly.
3. If real-time collaboration is not needed, disable it in system settings or set `COLLABORATION_ENABLED=false`.
4. Use `redis-cli ping` to test whether Redis is reachable.

### PostgreSQL mode fails to create tables or migrate

**Symptom**: After switching to PostgreSQL, errors such as `relation does not exist` or migration failures appear.

**Solution**:

1. Confirm the database has been created in advance and the user has permissions to create tables and extensions.
2. Alembic will automatically run migrations on first startup; make sure the working directory is correct (run from `smarttable-backend`).
3. If migration versions are inconsistent, manually run `flask db upgrade`.
4. Check that the `DATABASE_URL` format is correct, e.g., `postgresql://user:pass@host:5432/dbname`.

## Login & Permissions

### "Login expired" appears shortly after logging in

**Symptom**: After using for a while, refreshing the page redirects to the login page.

**Solution**:

1. v1.6.3 supports Token auto-refresh. Make sure both frontend and backend are upgraded to v1.6.3.
2. Check the "Session timeout" in system settings. The default is short; adjust it as needed (not recommended to exceed 7 days).
3. If using a reverse proxy, confirm it does not filter or cache JWT-related headers.
4. Clear browser cache and log in again.

### Registration entry is missing or registration is disabled

**Symptom**: The login page has no "Register" button, or clicking register prompts "Registration is closed".

**Solution**:

1. Administrators can enable or disable registration in "System Management → System Settings".
2. If registration is disabled, users can only be created manually by an administrator.
3. Check whether the current user has the administrator role.

## Tables & Fields

### Formula field shows "#ERROR" or incorrect result

**Symptom**: After configuring a formula field, the cell shows an error or does not calculate.

**Solution**:

1. Check whether the formula syntax is correct. It is recommended to use the "Formula Helper" in the field configuration panel.
2. Confirm the referenced field names or IDs have not changed; if changed, re-edit the formula.
3. v1.6.3 unified frontend and backend formula function registration. If errors persist after upgrading, check whether an unsupported function is used.
4. Numeric, date, and other field types are automatically converted in formulas; pay attention to type matching.

### Link/Lookup field data does not refresh or displays incorrectly

**Symptom**: After selecting a link field, the lookup field does not update synchronously or shows stale data.

**Solution**:

1. v1.6.3 fixed the issue of link field cache not refreshing; please upgrade to the latest version first.
2. Refresh the page or reopen the record drawer.
3. Check whether the link field relationship type is configured correctly; if changed, save the field again.
4. Confirm the target field referenced by the lookup field has a valid value in the linked record.

### Adding a record creates two rows at once

**Symptom**: Clicking "Add record" produces two blank rows in the table.

**Solution**:

1. This is an editor callback anomaly fixed in v1.6.3; upgrading will resolve it.
2. If it still occurs after upgrading, check the browser console for errors and submit via "Issue Feedback".

### Number field always defaults to 0

**Symptom**: Number field automatically shows 0 when not filled in.

**Solution**:

1. v1.6.3 optimized number field default rules to automatically decide whether to write 0 or empty based on the default value setting.
2. If customization is needed, set the "Default value" to empty or a specific value in the field configuration.
3. Also check whether the "Decimal places" setting for the number field takes effect.

## Views & Interaction

### Kanban card drag does not change the group

**Symptom**: Dragging a card to another column in Kanban view returns to the original column after refresh.

**Solution**:

1. v1.6.3 fixed the issue where Kanban drag did not use the target group ID; upgrading will resolve it.
2. Confirm the group field value corresponding to the target column matches the card's intended value.
3. Check whether the current user has edit permission for the table.

### Large tables load slowly

**Symptom**: When there are tens of thousands of records, the table first screen takes several seconds or longer to load.

**Solution**:

1. SmartTable supports streaming load: first screen loads part of the data, remaining pages load asynchronously in the background.
2. Reduce the number of records per page, or configure appropriate filter conditions in the view.
3. Create indexes for frequently queried fields (more effective in PostgreSQL mode).
4. Disable unnecessary real-time collaboration to reduce WebSocket data transfer.

### Attachment upload fails or cannot be previewed

**Symptom**: Clicking upload does nothing, or thumbnails do not display after upload.

**Solution**:

1. Check the "File count limit" and "File size limit" of the attachment field; the default single file limit is 10MB.
2. Confirm the upload directory has write permissions; Docker deployment requires persistent storage volume.
3. v1.6.3 supports single-click thumbnail preview of full image; if preview fails, check whether the browser blocked the popup.
4. Check backend logs for MIME type or file content security validation failures.

## Workflow

### Workflow does not trigger after saving

**Symptom**: After configuring triggers and nodes, the workflow does not execute when records are created/updated.

**Solution**:

1. Confirm the workflow status is "Running"; paused or draft workflows will not trigger.
2. Check whether trigger filter conditions are configured correctly, paying attention to AND/OR logic.
3. Confirm the fields monitored by the trigger actually changed during the update.
4. View "Execution Logs" to check for errors or node execution failures.

### Loop node does not execute or data is empty

**Symptom**: Loop node status shows skipped, or the loop body does not execute.

**Solution**:

1. Confirm the loop data source type is configured correctly:
   - When iterating over all results from a find records node, use `find_records_all`.
   - When extracting values of a specific field, use `find_records_column`.
2. Check whether the find records node returned valid data.
3. Node IDs inside the loop body must be correctly mapped to backend UUIDs when saving.
4. View diagnostic information such as `skipped_reason` and `data_array` in the execution logs.

### Webhook node recipient does not receive the request

**Symptom**: Workflow execution shows success, but the recipient system does not receive the Webhook.

**Solution**:

1. Check whether the Webhook URL is correct and has no extra spaces.
2. View "Webhook Delivery Logs" to confirm whether the request was sent and what the response status code was.
3. Confirm the recipient server can access the network where SmartTable is deployed (especially important for intranet deployments).
4. Check whether Webhook headers and body templates are rendered correctly to avoid request dropping due to variable resolution failure.

## Real-time Collaboration

### Online users not shown or collaboration status abnormal

**Symptom**: When multiple users edit simultaneously, other users are not visible or lock status is out of sync.

**Solution**:

1. Confirm real-time collaboration is enabled and Redis is running normally.
2. Check the browser console for WebSocket connection failure errors.
3. If using a reverse proxy or Nginx, confirm WebSocket forwarding is correctly configured (for `/socket.io/` path).
4. v1.6.3 fixed timezone acquisition logic to support reading the browser's local timezone, avoiding collaboration anomalies caused by timezone inconsistency.

## Email & Notifications

### Email sending fails

**Symptom**: After configuring SMTP, test sending or workflow email node sending fails.

**Solution**:

1. Check SMTP server address, port, encryption method (TLS/SSL), and authentication information.
2. Confirm SMTP service is enabled for the mailbox; some providers require a separate authorization code.
3. Check email sending logs to see if messages were blocked by the provider or sent to spam.
4. For enterprise email, confirm there are no sending rate limits or IP whitelist restrictions.

## Performance & Browser

### Page lags or browser crashes

**Symptom**: Browser becomes laggy or even crashes when opening large tables or complex dashboards.

**Solution**:

1. Reduce the number of simultaneously expanded views and dashboard components.
2. Configure appropriate filter conditions for large tables to avoid loading full data at once.
3. Use modern browsers such as Chrome or Edge, and keep them updated.
4. Close unused browser extensions to avoid excessive memory usage.

## Others

### Timezone display is incorrect

**Symptom**: Date Time fields show times inconsistent with expectations.

**Solution**:

1. Configure the correct system timezone in "System Management → System Settings".
2. If timezone mode is "Local timezone", it will prefer the configured `timezone_name`; if not configured, it will use the browser's local timezone.
3. If timezone mode is "UTC", all times will be displayed in UTC.
4. Refresh the page after switching timezone for the configuration to take effect.

### How to submit bugs or feature suggestions

**Solution**:

1. Click the "Issue Feedback" button in the top-right corner, fill in the description, and attach screenshots and logs.
2. Submit via GitHub Issues: [https://github.com/ldbinac/smart_table/issues](https://github.com/ldbinac/smart_table/issues)
3. Follow the WeChat official account "程序员吕洞宾" for the latest updates.
