# Scenario Practice: Content Calendar

## Applicable Scenario

This solution is suitable for content operations teams and marketing teams to plan and track content production, review, and publishing. Using SmartTable, you can centrally manage content topics, creation progress, publishing channels, and publishing schedules, and visually display the content publishing plan through the calendar view.

Typical use cases include:

- New media operators planning content schedules for official accounts, short videos, and Weibo.
- Marketing teams managing the output of event materials, whitepapers, and case studies.
- Content editors monitoring topic progress and publishing rhythm.

## Recommended Table Structure

Create a table named "Content Calendar" with the following core fields:

| Field Name | Field Type | Description |
| --- | --- | --- |
| Content Title | Single Line Text | The title or theme of the content. |
| Content Type | Single Select | Options: Article, Short Video, Image & Text, Live, Poster, Whitepaper, Other. |
| Column | Single Select | Such as Product Updates, Industry Insights, User Cases, Event Promotion. |
| Topic Status | Single Select | Options: Ideation, Creating, Reviewing, Pending Publish, Published, Offline. |
| Owner | Member | The content creator or operator. |
| Reviewer | Member | The editor or supervisor responsible for content review. |
| Target Publish Date | Date | The planned publishing date. |
| Actual Publish Date | Date | The actual publishing date. |
| Publish Channels | Multi Select | Options: WeChat Official Account, Website, Zhihu, Weibo, TikTok, Bilibili, Email, Other. |
| Target Audience | Single Select | Options: New Users, Existing Customers, Developers, Partners. |
| Keywords | Multi Select | Keywords used for SEO or content classification. |
| Content Summary | Long Text | Core points or introduction of the content. |
| Content Link | URL | The online link of published content. |
| Material Attachments | Attachment | Upload copy, images, videos, and other materials. |

## Recommended View Configuration

### Calendar View

- Date field: Target Publish Date
- Purpose: View the daily publishing plan in a monthly calendar format; this is the core view of the content calendar.

### Kanban View (Grouped by Topic Status)

- Group field: Topic Status
- Sort order: Target Publish Date ascending
- Purpose: Track the full process from ideation to publication.

### Table View

- Display all content information, supporting filtering by owner, content type, and publish channel.

### Grouped View (Grouped by Column)

- Group field: Column
- Purpose: View content reserves and publishing rhythm under each column.

## Optional Workflow Automation Suggestions

| Automation Scenario | Trigger | Node Configuration |
| --- | --- | --- |
| Pre-publish Reminder | Specified Time trigger (daily) | Find content where "Target Publish Date is tomorrow and status is Pending Publish", reminding the owner to perform final checks. |
| Review Notification | Record update trigger (status changed to Reviewing) | Call a Webhook node to notify the reviewer to process pending content. |
| Publish Archiving | Record update trigger (status changed to Published) | Update the actual publish date and notify the operations team to synchronize promotion. |
| Topic Overdue Warning | Specified Time trigger (weekly) | Condition node checks if "Target Publish Date has passed and status is not Published", then increase priority and notify the content editor. |

## Brief Operation Steps

1. Create a "Content Calendar" table and add the fields listed above with Single/Multi Select options configured.
2. Create a Calendar view as the default view and display the content plan by target publish date.
3. Create Kanban and Grouped views for tracking creation progress and column distribution.
4. After team brainstorming, enter topics with target publish date, owner, and publish channel.
5. Creators update topic status according to progress; after review, the editor advances it to "Pending Publish".
6. Configure workflow automation for publish reminders, review notifications, and overdue warnings.
7. Regularly review the content calendar, analyze publishing rhythm and channel effectiveness, and continuously optimize content strategy.
