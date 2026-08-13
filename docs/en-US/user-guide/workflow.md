# Workflow Automation

SmartTable's workflow automation engine lets you build no-code automations that react to events in your data. Introduced in v1.6.0, it can save time on repetitive tasks and keep your team in sync.

## How Workflows Work

A workflow has two parts:

- **Trigger** — The event that starts the workflow.
- **Nodes** — The actions and decisions that run after the trigger.

Workflows are bound to a base or a specific table. You can pause, resume, edit, and version them at any time.

## Creating a Workflow

1. Open **Workflow** from the left menu.
2. Click **New Workflow**.
3. Select the associated base or table.
4. Enter a name and description.
5. Click **Create** and start adding nodes.

<img src="/images/user-guide/basic-features/workflow/workflow-overview.png" alt="Workflow overview" style="max-width: 100%; border: 1px solid #e0e0e0; border-radius: 4px;">

## Trigger Types

| Trigger | When It Fires |
|---------|---------------|
| Specified Time | One-time or recurring (daily/weekly/monthly/yearly/custom); supports deadline configuration |
| Record Created | When a new record is created; supports filter conditions |
| Record Updated | When a record is modified; can listen to specific fields and apply filters |

## Node Types

| Node | What It Does |
|------|--------------|
| Create Record | Creates a record in a target table with static values or reference expressions |
| Update Record | Updates fields on the source record with static values or expressions |
| Webhook Node | Calls an external HTTP endpoint using an existing config or inline config |
| Condition Node | Branches the workflow based on AND/OR condition combinations |
| Node Sorting | Drag nodes to adjust execution order |

::: tip Reference Expressions
Use reference expressions to pull values from the trigger record or related records. For example, map the trigger record's assignee into a newly created task.
:::

## Version Management

Workflows support version snapshots:

- Save the current configuration as a version.
- View version history and compare configurations.
- Roll back to a previous version when needed.

## Webhook Delivery Management

Workflows can call external services via webhooks:

- Configure URL, HTTP method, headers, and request body template.
- Set retry count and interval.
- Test the webhook before going live.
- View delivery records, request parameters, response status, and response body.

## Execution Logs

<img src="/images/user-guide/basic-features/workflow/workflow-instance.png" alt="Workflow instance" style="max-width: 100%; border: 1px solid #e0e0e0; border-radius: 4px;">

Track every workflow run:

- Trigger time and trigger record
- Status of each node
- Error messages and retry options

## Best Practices

- Keep workflows focused and easy to understand.
- Use meaningful node names and comments for complex logic.
- Add error handling and retries for webhook calls.
- Review execution logs regularly.

## Related Links

- [Field Types](/en-US/user-guide/field-types.html)
- [Collaboration](/en-US/user-guide/collaboration.html)
