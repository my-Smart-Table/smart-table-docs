# Scenario Practice: R&D Defect Management

## Applicable Scenario

This solution is suitable for software development teams to manage the complete process of recording, assigning, fixing, and verifying defects (bugs). Using SmartTable, R&D teams can unify the defect entry point, track repair progress, analyze defect distribution, and associate defects with test cases and release plans.

Typical use cases include:

- Test engineers submitting and tracking defects.
- Development leads assigning repair tasks.
- Project managers analyzing version quality metrics.

## Recommended Table Structure

Create a table named "Defect Management" with the following core fields:

| Field Name | Field Type | Description |
| --- | --- | --- |
| Defect Title | Single-line text | A short description of the defect, used as the record title. |
| Defect ID | Auto number | Automatically generates a unique ID for tracking and referencing. |
| Project | Single select | The project or product module where the defect was found. |
| Affected Version | Single-line text | The version number where the defect was found, e.g., "v1.5.2". |
| Severity | Single select | Options: Critical, Major, Minor, Trivial, Suggestion. |
| Priority | Single select | Options: Urgent, High, Medium, Low. |
| Defect Status | Single select | Options: New, Confirmed, In Progress, Pending Verification, Closed, Rejected. |
| Submitter | Member | The tester who submitted the defect. |
| Assignee | Member | The developer responsible for fixing the defect. |
| Verifier | Member | The tester responsible for verifying the fix. |
| Submit Time | Date time | The time the defect was submitted. |
| Expected Fix Date | Date | The planned date for completing the fix. |
| Actual Fix Date | Date | The actual date when the fix was completed. |
| Reproduction Steps | Multi-line text | Detailed steps to reproduce the defect. |
| Screenshots/Logs | Attachment | Upload defect screenshots, log files, or screen recordings. |
| Related Requirement | Link | Links to the "Requirement Management" table to associate defects with requirements. |

## Recommended View Configuration

### Kanban View (Grouped by Defect Status)

- Group field: Defect Status
- Sort order: Severity descending, Priority descending
- Purpose: Visually track the flow of defects from "New" to "Closed".

### Table View (Filtered by Assignee)

- Create a filtered view for each developer showing only defects assigned to them.
- Helps developers focus on their own defects daily.

### Grouped View (Grouped by Severity)

- Group field: Severity
- Purpose: Quickly identify high-priority defects and prioritize Critical and Major issues.

### Calendar View

- Date field: Expected Fix Date
- Purpose: View defects due for repair each day and plan development work accordingly.

## Optional Workflow Automation Suggestions

| Automation Scenario | Trigger | Node Configuration |
| --- | --- | --- |
| New Defect Notification | Record create trigger | Call a Webhook node to notify the development lead and project group. |
| Status Change Sync | Record update trigger (defect status changed) | Update the status change time; when status is "Pending Verification", notify the verifier. |
| Overdue Defect Escalation | Scheduled trigger (daily) | Condition node checks if "Expected Fix Date is before today and status is not Closed", then update priority to "Urgent". |
| Defect Closure Archiving | Record update trigger (status changed to Closed) | Update the actual close time and send a closure notification to the submitter. |

## Brief Operation Steps

1. Create a "Defect Management" table and add the fields listed above with single-select options configured.
2. Set the "Defect ID" field to auto-number to maintain continuity.
3. Create Kanban, Grouped, and assignee-filtered Table views.
4. When submitting a defect, testers fill in reproduction steps and upload screenshots or logs.
5. The development lead assigns repair tasks based on severity and priority.
6. After fixing, the developer updates the status to "Pending Verification"; the verifier confirms and closes the defect.
7. Configure workflow automation for new defect notifications and overdue escalation reminders.
