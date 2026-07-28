# Workflow Automation

SmartTable's workflow automation feature helps you automate repetitive business processes and improve work efficiency.

## Overview

Workflows consist of triggers and actions:

- **Trigger**: Starts the workflow when a certain condition is met
- **Action**: Operations performed after the trigger is activated

## Creating a New Workflow

1. Click "Workflow" in the left menu
2. Click the "New Workflow" button
3. Select the associated table
4. Enter the workflow name and description
5. Click "Create"

## Trigger Types

### Record Change Trigger

Triggered when records in a table change:

- **When record created**: Triggered when a new record is created
- **When record updated**: Triggered when a record is modified
- **When record deleted**: Triggered when a record is deleted

### Time Trigger

Triggered based on time conditions:

- **Specified time**: Triggered at a specific time point
- **Record time reached**: Triggered when the date and time field in the record is reached

### Webhook Trigger

Triggered by external HTTP requests:

1. Create a webhook trigger node
2. Get the webhook URL
3. Configure the request in the external system

## Action Types

### Send Email

Send emails to specified recipients:

1. Add the "Send email" action
2. Configure recipient, subject and body
3. Support using variables to render email content

### Create Record

Create new records in the specified table:

1. Select the target table
2. Configure field values
3. Support using context variables

### Update Record

Update records that meet conditions:

1. Select the target table
2. Set filter conditions
3. Configure the fields to update

### Call Webhook

Send HTTP requests to external services:

1. Configure the request URL
2. Select the request method (GET, POST, PUT, DELETE)
3. Configure request headers and body

## Conditional Branches

Execute different actions based on conditions:

1. Add a "Conditional Branch" node
2. Set judgment conditions
3. Configure subsequent actions for each branch

## Execution Logs

View the execution history of workflows:

- Execution time
- Trigger record
- Execution status of each node
- Error information and retry options

## Best Practices

### Workflow Design

- Keep workflows simple and clear
- Use meaningful node names
- Add comments for complex logic

### Error Handling

- Add retry mechanism for webhook calls
- Configure error notifications
- Regularly check execution logs

## Related Links

- [Field Types](/en-US/user-guide/field-types)
- [Collaboration](/en-US/user-guide/collaboration)
