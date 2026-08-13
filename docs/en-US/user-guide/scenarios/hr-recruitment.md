# Scenario Practice: HR Recruitment

## Applicable Scenario

This solution is suitable for enterprise human resources departments to standardize the recruitment process. Using SmartTable, HR can centrally manage job requirements, candidate information, interview schedules, and hiring progress, and improve recruitment collaboration efficiency through views and automation.

Typical use cases include:

- HR recruiters managing candidate resumes and interview processes.
- Hiring managers viewing candidate profiles and interview feedback.
- HR supervisors statistics on the recruitment funnel and channel effectiveness.

## Recommended Table Structure

Create two core tables: "Job Management" and "Candidate Management".

### Job Management Table

| Field Name | Field Type | Description |
| --- | --- | --- |
| Job Title | Single Line Text | The name of the recruitment position. |
| Department | Single Select | Such as Engineering, Product, Marketing, etc. |
| Recruiter | Member | The HR responsible for this position. |
| Headcount | Number | Planned number of hires. |
| Job Status | Single Select | Options: Open, Paused, Closed. |
| Priority | Single Select | Options: Urgent, High, Medium, Low. |
| Expected Onboard Date | Date | Planned onboarding date. |
| Job Description | Long Text | Job responsibilities and requirements. |

### Candidate Management Table

| Field Name | Field Type | Description |
| --- | --- | --- |
| Name | Single Line Text | Candidate name. |
| Phone | Single Line Text | Candidate phone number. |
| Email | Email | Candidate email address. |
| Applied Position | Link | Links to the "Job Management" table. |
| Source Channel | Single Select | Options: Headhunter, Referral, Job Board, Website, Social Media, Other. |
| Current Status | Single Select | Options: Resume Screening, To Be Interviewed, Interviewing, Pending Feedback, Offer Sent, Hired, Rejected. |
| Interviewer | Member | The hiring manager arranged for the interview. |
| Interview Time | Date Time | Scheduled interview time. |
| Interview Feedback | Long Text | Evaluations and suggestions filled in by the interviewer. |
| Expected Salary | Single Line Text | Candidate's expected salary range. |
| Resume | Attachment | Upload candidate resume. |
| Notes | Long Text | Other supplementary information. |

## Recommended View Configuration

### Job Management Table Views

- **Kanban View**: Group by "Job Status" to view the progress of each position.
- **Table View**: Display all job information for HR supervisors to review.

### Candidate Management Table Views

- **Kanban View**: Group by "Current Status" to visually track candidate flow.
- **Calendar View**: Use "Interview Time" as the date field to arrange interview schedules.
- **Grouped View**: Group by "Applied Position" to view the candidate pool for each position.
- **Table View (Filtered by Interviewer)**: Helps hiring managers view their own interview arrangements.

### Dashboard Suggestions

- Display metrics such as "Open Positions", "Candidate Count by Status", "Source Channel Distribution", and "Offer Conversion Rate".

## Optional Workflow Automation Suggestions

| Automation Scenario | Trigger | Node Configuration |
| --- | --- | --- |
| Interview Reminder | Scheduled trigger (daily) | Find candidates whose "Interview Time is tomorrow" and notify the interviewer and HR via a Webhook node. |
| Status Change Notification | Record update trigger (current status changed) | When the candidate status changes to "Offer Sent" or "Hired", notify the recruiter and hiring manager. |
| Resume Screening Assignment | Record create trigger | Assign to the corresponding recruiter based on "Applied Position" through a condition node. |
| Overdue Feedback Reminder | Scheduled trigger (daily) | Condition node checks if "Current Status is Pending Feedback and Interview Time is more than 2 days ago", reminding the interviewer to fill in feedback. |

## Brief Operation Steps

1. Create the "Job Management" and "Candidate Management" tables and configure the fields listed above.
2. Add an "Applied Position" field in the "Candidate Management" table linked to "Job Management".
3. Create Kanban, Calendar, and position-grouped views.
4. Enter open position information and import or manually enter candidate resumes.
5. When arranging interviews, update the candidate status and interview time; fill in interview feedback after the interview.
6. Configure workflow automation for interview reminders, status notifications, and overdue feedback reminders.
7. Build a recruitment dashboard to continuously optimize the recruitment funnel and channel effectiveness.
