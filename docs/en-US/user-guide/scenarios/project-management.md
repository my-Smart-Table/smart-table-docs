# Scenario Practice: Project Management

## Applicable Scenario

This solution is suitable for R&D teams, marketing departments, and operations teams that need to manage the full lifecycle of project tasks. Using SmartTable's multidimensional table capabilities, you can centrally manage tasks, owners, due dates, priorities, and progress, and monitor project status in real time through Kanban, Gantt, calendar, and other views.

Typical use cases include:

- Tracking requirements, development, testing, and release in software projects.
- Managing planning, execution, and review of marketing campaigns.
- Breaking down milestones and tasks for product iteration versions.

## Recommended Table Structure

Create a table named "Project Tasks" with the following core fields:

| Field Name | Field Type | Description |
| --- | --- | --- |
| Task Name | Single Line Text | A short title for the task or requirement, used as the record title. |
| Task Type | Single Select | Options: Requirement, Bug, Optimization, Other. |
| Priority | Single Select | Options: Urgent, High, Medium, Low. |
| Assignee | Member | The specific executor, supports multiple selection. |
| Status | Single Select | Options: To Do, In Progress, Pending Review, Done, Cancelled. |
| Project | Single Select | Used to distinguish different projects, e.g., "Website Redesign", "App v2.0". |
| Parent Task | Link | Links to this table to establish task hierarchy. |
| Planned Start Date | Date | The estimated start date of the task. |
| Due Date | Date | The estimated completion date of the task. |
| Progress | Number | Expressed as a percentage (0-100) of current completion. |
| Task Description | Long Text | Supplementary details, acceptance criteria, or notes. |
| Attachments | Attachment | Upload requirement documents, design drafts, test reports, etc. |

If there are complex dependencies between projects, you can also create a "Project Info" table and associate tasks with projects via a link field for cross-table statistics.

## Recommended View Configuration

Configure the following views to manage projects from multiple dimensions:

### Kanban View (Grouped by Status)

- Group field: Status
- Sort order: Priority descending, Due date ascending
- Purpose: Visually inspect the distribution of tasks across "To Do → In Progress → Pending Review → Done".

### Gantt View

- Start date field: Planned Start Date
- End date field: Due Date
- Purpose: Display the project timeline, identify the critical path, and spot scheduling conflicts.

### Table View

- Display all fields for batch editing and quick filtering.
- Create filtered views by assignee or project.

### Calendar View

- Date field: Due Date
- Purpose: View daily due tasks in a calendar format to avoid missing key milestones.

## Optional Workflow Automation Suggestions

| Automation Scenario | Trigger | Node Configuration |
| --- | --- | --- |
| Due Date Reminder | Scheduled trigger (daily) | Find records where the due date is tomorrow and status is not done, then call a Webhook node to send a reminder. |
| Task Completion Notification | Record update trigger (status changed to Done) | Update the actual completion time and notify the project owner via a Webhook node. |
| Overdue Auto-Tag | Scheduled trigger (daily) | Use a condition node to check if the due date is before today and status is not done, then update the priority to "Urgent". |

## Brief Operation Steps

1. Create a new table in the Base and name it "Project Tasks".
2. Add the fields listed above and configure Single Select options for "Status", "Priority", and "Task Type".
3. Create Kanban, Gantt, and Calendar views, and set the default view as needed.
4. Enter the initial task data and drag tasks across the Kanban board to update status.
5. Go to the "Workflow" module and configure automation rules such as due reminders and status change notifications.
6. Share the project table with team members and set appropriate collaboration permissions.
