# Internal Message Node

The Internal Message node sends in-app notifications to specified people during workflow execution. Messages are delivered to the recipient's in-app message center and do not depend on email service configuration.

## When to Use

- Notify the assignee after a task is assigned
- Notify followers when a record's status changes
- Remind the handler when a process step is reached
- Broadcast an alert to all space members when data looks abnormal

## Differences from the Send Email Node

| Aspect | Internal Message Node | Send Email Node |
| --- | --- | --- |
| Delivery | In-app message center (bell icon in the top bar) | Recipient's mailbox |
| Prerequisites | None | Administrator must configure the SMTP email service |
| Recipients | Existing system users (targeted by user identity) | Email addresses, including external addresses |
| Content | Plain text | Templates and HTML supported |
| External recipients | Not supported | Supported |

If you need both an in-app reminder and an email notification, add both nodes to the workflow.

## Configuration

<img src="/images/user-guide/basic-features/workflow/workflow-instance.png" alt="Internal Message node" style="max-width: 100%; border: 1px solid #e0e0e0; border-radius: 4px;">

### Recipient Source

You can select multiple sources at the same time. Recipients resolved from all sources are merged and de-duplicated, so the same person only receives one message.

| Source | Description | Extra configuration |
| --- | --- | --- |
| Specific members | Pick fixed people from the current space's members | Select at least one member |
| Member field | Resolve recipients dynamically from member-type fields on the trigger record | Select at least one member, collaborator, or creator field |
| Workflow trigger user | Dynamically use the user who triggered this workflow run | None |
| Record creator | Dynamically use the creator of the trigger record | None |
| All space members | Send to every member of the current space | None |

### Specific Members

After enabling "Specific members", select one or more people. Candidates are limited to members of the current space and can be searched.

### Member Field

After enabling "Member field", select one or more fields. Only member, collaborator, and creator fields are supported. At run time the values of these fields on the trigger record are resolved into recipients.

### Message Title

Required. Supports static text and variable references. Limited to 500 characters; longer titles are truncated.

### Message Body

Supports static text and variable references and is treated as plain text.

## Available Variables

- `{{record.<field_id>}}`: Trigger record field
- `{{trigger.record.<field_id>}}`: Trigger record field (equivalent form)
- `{{node_outputs.<node_id>.result}}`: Output of a previous node
- `{{loop.current_data.<field_id>}}`: Current loop iteration data

The configuration panel lists the currently available variables below the title and body inputs; click to copy. Inside a loop body you can also insert loop variables with the variable inserter.

## Examples

### Example 1: Notify the assignee after a task is assigned

The table has an "Assignee" (member field) and a "Task name" field. Notify the assignee when a new task is created.

| Setting | Value |
| --- | --- |
| Recipient source | Member field |
| Member field | Assignee |
| Message title | New task: `{{trigger.record.<task_name_field_id>}}` |
| Message body | You have a new pending task "{{trigger.record.<task_name_field_id>}}". Please handle it in time. |

### Example 2: Notify the creator and the trigger user after a change

When a record's status is modified, notify both the record creator and the user who made the change.

| Setting | Value |
| --- | --- |
| Recipient source | Record creator + Workflow trigger user |
| Message title | Record status updated |
| Message body | A record you follow has been changed to "Done". |

If the creator and the trigger user are the same person, only one message is sent after de-duplication.

### Example 3: Broadcast to all space members

| Setting | Value |
| --- | --- |
| Recipient source | All space members |
| Message title | Data check alert |
| Message body | 3 abnormal records were detected. Please handle them. |

## Notes

- Internal messages are only sent to users that already exist in the system. If no valid recipient can be resolved, the node is skipped and a warning is logged; it does **not** stop the workflow.
- A single node sends to at most 200 people; the remainder is truncated and a warning is logged.
- The message title is required — a workflow cannot be saved without it. This prevents the run from failing at this node later on.
- The message body is rendered as plain text and is HTML-escaped before being stored; rich text styling and hyperlinks are not supported.
- Recipients see an unread badge on the bell icon in the top bar; in the message center the message is tagged with the "Workflow" source.
- The Internal Message node can also be used inside a loop body. Note that the "Member field" source reads the trigger record, not the current iteration; use loop variables if you need per-iteration values.
