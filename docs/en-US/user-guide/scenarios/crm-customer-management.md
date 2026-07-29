# Scenario Practice: Customer Relationship Management (CRM)

## Applicable Scenario

This solution is suitable for sales teams and customer success teams to follow up on, convert, and maintain potential and existing customers. Using SmartTable, you can centrally manage customer information, opportunity stages, and follow-up records, and improve sales efficiency through views and automation.

Typical use cases include:

- Sales reps managing their customer pool and opportunity funnel.
- Sales managers monitoring team performance and conversion rates.
- Customer success teams tracking renewals and satisfaction.

## Recommended Table Structure

Create two core tables: "Customer Info" and "Opportunity Follow-up".

### Customer Info Table

| Field Name | Field Type | Description |
| --- | --- | --- |
| Customer Name | Single-line text | The name of the company or individual. |
| Customer Type | Single select | Options: Enterprise, Individual, Partner. |
| Industry | Single select | Options: Internet, Finance, Manufacturing, Education, Healthcare, Other. |
| Contact Person | Single-line text | The primary contact person's name. |
| Phone | Single-line text | The contact person's phone number. |
| Email | Email | The contact person's email address. |
| Source | Single select | Options: Website, Exhibition, Referral, Telemarketing, Other. |
| Customer Level | Single select | Options: A, B, C, D. |
| Sales Owner | Member | The sales rep responsible for follow-up. |
| Customer Status | Single select | Options: Lead, Signed, Churned, Paused. |
| First Contact Date | Date | The date of first contact. |
| Last Follow-up Date | Date | The date of the most recent follow-up. |
| Notes | Multi-line text | Supplementary background information. |

### Opportunity Follow-up Table

| Field Name | Field Type | Description |
| --- | --- | --- |
| Opportunity Name | Single-line text | A short description of the opportunity. |
| Related Customer | Link | Links to the "Customer Info" table. |
| Estimated Amount | Number | The expected transaction amount of the opportunity. |
| Opportunity Stage | Single select | Options: Lead, Initial Contact, Needs Confirmation, Proposal, Negotiation, Won, Lost. |
| Win Probability | Number | Percentage (0-100). |
| Expected Close Date | Date | The expected signing date. |
| Sales Owner | Member | The sales rep following up on this opportunity. |
| Next Follow-up Date | Date | The date of the next planned follow-up. |
| Follow-up Records | Multi-line text | Records of each communication. |

## Recommended View Configuration

### Customer Info Table Views

- **Table View**: Display complete customer information, supporting filtering by sales owner.
- **Grouped View**: Group by "Customer Status" or "Customer Level" to quickly identify key customers.

### Opportunity Follow-up Table Views

- **Kanban View**: Group by "Opportunity Stage" to visualize the sales funnel.
- **Table View**: Filter by sales owner to help sales reps manage their own opportunities.
- **Calendar View**: Use "Next Follow-up Date" as the date field to avoid missing follow-up plans.

### Dashboard Suggestions

- Use dashboard components to display key metrics such as "Estimated Revenue This Month", "Opportunity Count by Stage", and "Customer Source Distribution".

## Optional Workflow Automation Suggestions

| Automation Scenario | Trigger | Node Configuration |
| --- | --- | --- |
| New Lead Assignment | Record create trigger | Assign to the corresponding sales owner based on customer source or region through a condition node. |
| Follow-up Reminder | Scheduled trigger (daily) | Find opportunities where "Next Follow-up Date is today" and remind the sales owner via a Webhook node. |
| Stage Advancement Notification | Record update trigger (opportunity stage changed) | Notify the sales manager when the stage advances to "Negotiation" or "Won". |
| Customer Churn Warning | Scheduled trigger (weekly) | Condition node checks if "Last Follow-up Date is more than 30 days ago and status is Lead", then mark as "Needs Recall". |

## Brief Operation Steps

1. Create the "Customer Info" and "Opportunity Follow-up" tables and configure the fields listed above.
2. Add a "Related Customer" field in the "Opportunity Follow-up" table linked to "Customer Info".
3. Create Kanban, Grouped, and Calendar views to meet the viewing needs of different roles.
4. Enter customer and opportunity data; it is recommended to import historical customer lists first.
5. Sales reps update opportunity stages and next follow-up dates according to the follow-up plan.
6. Configure workflow automation for lead assignment, follow-up reminders, and stage advancement notifications.
7. Build a dashboard to display sales performance and funnel conversion in real time.
