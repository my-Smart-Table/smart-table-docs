# Form View

Form view turns a table into a data collection form, making it easy to gather information from external users. Each form view has independent configuration, including title, description, displayed fields, submit button text, and supports generating public share links.

## When to Use

- Collecting user feedback or survey responses
- Registration information
- Work order or requirement submission
- External data entry

## Creating a Form View

1. Click **+ New View** in the view switcher.
2. Select the **Form** view type.
3. Enter a view name and create it.

## Configuring the Form

<img src="/images/user-guide/basic-features/views/views-form-view.png" alt="Form view configuration" style="max-width: 100%; border: 1px solid #e0e0e0; border-radius: 4px;">

Click the **Configure** button in the upper right corner of the form view to open the configuration panel:

| Configuration | Description |
| --- | --- |
| Form title | The main title displayed at the top of the form |
| Form description | Explanatory text below the title |
| Submit button text | Defaults to "Submit", customizable |
| Success message | Message displayed after successful submission |
| Displayed fields | Select the fields to show in the form |
| Allow multiple submissions | Whether the same user can submit multiple times |

### Field Display Rules

- All non-system fields are displayed by default.
- System fields (Created By, Created Time, Updated By, Updated Time, Auto Number) are not shown in the form.
- Fields can be manually checked or unchecked.
- At least one field must be selected to save the configuration.

### Field Validation

- Required fields automatically show required indicators.
- Email, phone, URL, and other fields are validated by type.
- Single Select and Multi Select fields show configured options.

## Sharing the Form

<img src="/images/user-guide/basic-features/views/views-form-sharing.png" alt="Form sharing settings" style="max-width: 100%; border: 1px solid #e0e0e0; border-radius: 4px;">

Form view supports generating public share links so external users can access and submit data.

### Creating a Share

1. Click the **Share** button in the form view.
2. Configure share options:
   - **Allow anonymous submission**: Submit without logging in
   - **Require CAPTCHA**: Require CAPTCHA verification before submission
   - **Expiration date**: Set the validity period of the share link
   - **Maximum submissions**: Limit the total number of submissions
   - **Allowed fields**: Select the fields displayed in the shared form
3. Click **Create Share**, and the system will generate a share link.

### Managing Shares

- Multiple share links can be created for one form view.
- Share links can be enabled, disabled, or deleted at any time.
- Submission count and status can be viewed for each share link.

## Submitting Data

- External users open the form through the share link.
- After filling out and submitting, data is automatically written to the current table.
- A success message is displayed after submission.

## Viewing Submissions

- Submitted data appears as new records in the table.
- Records can be viewed, filtered, and edited in table view or other views.

::: tip Security Suggestion
For sensitive data collection, it is recommended to enable CAPTCHA and set a submission limit, while avoiding the exposure of sensitive fields in the shared form.
:::

## Next Steps

- [Table View](/en-US/user-guide/views/table-view.html)
- [Kanban View](/en-US/user-guide/views/kanban-view.html)
