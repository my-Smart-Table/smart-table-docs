# Comments & @Mentions User Manual

## 1. Overview

Record comments let your team discuss a record in place, without switching to external tools. You can post comments, reply to others, use `@` to mention teammates, and follow important records to receive updates.

**Use cases**: data review, requirement confirmation, cross-team follow-up, approval feedback, and more.

**Entry point**: open any record's detail drawer and click the **Comments** tab at the top.

## 2. Opening the Comments Panel

1. In a table view, click a record to open the **Record Detail** drawer on the right.
2. The drawer has a tab bar at the top; click the **Comments** tab to enter the comments panel.
3. On the right side of the tab bar, the **History** and **Follow** buttons let you view the record's change history and follow / unfollow the current record.

## 3. Posting a Comment

1. Type your message in the input box at the bottom of the **Comments** tab.
2. Click **Send**.
3. Comments appear in chronological order, with replies shown inline beneath the comment they belong to.

> The **Viewer** role has no comment input box and can only read comments.

## 4. Replying to a Comment

1. Click **Reply** under any comment.
2. The input box enters reply mode and shows who you are replying to.
3. Type your message and click **Send**; the reply is shown inline beneath the comment.
4. The author of the comment you replied to receives a reply notification.

## 5. Mentioning Members

1. Type `@` in the input box; a list of mentionable members appears (Base members and table-share members who can access the record).
2. Keep typing a name to filter the list, then click a member to insert `@name` into your comment.
3. After sending, the mentioned member receives an @mention notification (in-app + email).

> You can only mention members who can access the record; mentioning yourself produces no notification.

## 6. Editing and Deleting Comments

- **Edit**: click **Edit** next to your own comment, make changes, and save.
- **Delete**: click **Delete** next to your own comment and confirm.
  - Comments without replies are removed directly.
  - Comments with replies are kept as a placeholder (shown as "Comment deleted") to preserve the thread context.
- **Editors and above** can delete any member's comment.

## 7. Following a Record

1. In the record detail drawer, click **Follow** on the right side of the tab bar.
2. The button changes to **Following**; click again to unfollow.
3. When a record you follow receives a new comment, you get a "new record comment" notification.

## 8. Notifications and Preferences

Comment-related notifications are enabled by default and can be turned off individually in personal Notification Settings:

- Notify on @mention
- Notify on reply
- Notify on new record comment

Notifications are written to the in-app message center first, and an email is also sent when an email service is configured. See [In-App Notifications](/en-US/user-guide/notification.html) for details.

## 9. Permissions

| Action | Owner / Admin / Editor | Commenter | Viewer |
| --- | :---: | :---: | :---: |
| Read comments | ✅ | ✅ | ✅ |
| Post comment / reply | ✅ | ✅ | — |
| Mention members | ✅ | ✅ | — |
| Edit / delete own comment | ✅ | ✅ | — |
| Delete any comment | ✅ | — | — |
| Follow a record | ✅ | ✅ | ✅ |

> Users who join via a table share get the permissions of the role they joined with (editor / commenter / viewer).

## 10. FAQ

- **Why is there no comment input box?**
  Your role is **Viewer**, or you joined via a share as a viewer, so you can only read comments.

- **@mention does nothing / the member is not found?**
  You can only mention members who can access the record. Make sure the person has joined the Base or has been shared the table.

- **A deleted comment disappeared?**
  Comments without replies are removed directly; comments with replies are shown as a "Comment deleted" placeholder to preserve the thread context.

- **How do I turn off comment notifications?**
  Disable the corresponding preference in personal Notification Settings; both in-app and email notifications will stop.
