---
title: Application Mode
---

# Application Mode

Application Mode is a complete application building and publishing system: create standalone applications on top of multi-dimensional table capabilities — a visual builder assembles menus and pages, and after publishing a standalone access URL is generated for end users who enter through a dedicated login page.

> Application Mode is a feature of the **Professional Edition**.

## Access Paths

| Feature | Path | Description |
|---|---|---|
| Application list | `/applications` | Main entry, visible in the navigation sidebar |
| Application builder | `/applications/:appId/build` | Edit / create applications |
| Application runtime | `/application/:appId/runtime` | Access URL of published applications |
| Application login | `/application/:appId/login` | Dedicated login page for private applications |

## Application List

**Path**: left navigation → Applications (supports search, status filter and pagination).

| Operation | Description |
|---|---|
| Create application | Fill in name (required, ≤100 characters), description, icon, theme color (default `#6366F1`) and access mode; the builder opens automatically and you become the Owner |
| Edit | Allowed in any state; edits to a published application take effect after re-publishing |
| Publish | Only drafts can be published; version +1, a runtime URL is generated and end users gain access |
| Unpublish | State reverts to draft and end users lose access; existing sessions may remain valid until they expire |
| Delete | Only system administrators or the Owner may delete; cascades removal of menus, pages, components, permissions and sessions; irreversible |
| Create from template | Opens the template marketplace to instantiate an application from a template |

## Application Builder

The builder toolbar provides Back, the application name (inline editing), Save, Publish/Unpublish and Preview; it contains 4 tabs. Changes must be persisted via "Save" (an "unsaved" indicator appears next to the name when there are pending changes).

### Menu Structure

The left MenuEditor shows the menu tree with add, edit, delete, drag-to-reorder and visibility toggles (hidden menus are not shown to end users).

| Menu type | Description |
|---|---|
| group | Container node holding sub-menus; not navigable |
| page | Links to an application page; clicking renders that page |
| link | Opens an external URL |

Deleting a group also deletes its sub-menus.

### Page Configuration

Five page types: **table / document / dashboard / view / custom**.

- Non-custom pages use simplified configuration (e.g. table pages configure the linked baseId / tableId plus toolbar and edit switches; view pages configure baseId / tableId / viewId)
- **custom pages** support visual drag-and-drop editing. The component palette provides 9 components: chart, data table, filter, button, text, image, container, tabs, form; after selecting a component, the right property panel offers six configuration groups: basic / style / layout / data binding / events / permissions

::: warning
Only custom pages support adding components; attempting it on other page types prompts "Only custom pages support adding components".
:::

### Application Settings

| Panel | Content |
|---|---|
| Basic info | Name, description, icon, theme color |
| Access mode | Private / Public / Token |
| Dedicated login page | Guest access switch, login page title / description, Logo URL, background image URL |
| Theme | Primary color, Logo URL |
| Mobile support | Mobile adaptation switch, bottom navigation bar switch |

### Permission Configuration

Contains two sub-tabs:

**Role management**: built-in roles — Owner (all permissions) / Editor (11 edit-related permissions) / Viewer (6 view-related permissions) — are read-only; custom roles (unique identifiers) can be added with permissions chosen from 15 items (application / menu / page / component / data level). Users can be assigned to roles (searchable by username/email) and removed.

::: warning Owner protection
The Owner role cannot be modified or revoked; the system silently blocks such changes.
:::

**Menu permissions**: a menu × role matrix where "visible / editable" are checked per menu per role. Owner's menu permissions are always fully enabled. Menu permissions depend on the menu structure and require menus created in "Menu Structure" first.

## Application Runtime

Published applications are accessed at `/application/:appId/runtime` with three areas:

- **Top navigation bar**: sidebar toggle, application logo and name, fullscreen, user menu (profile / logout)
- **Sidebar** (220px, collapsible to 64px): renders the menu tree; replaced by a drawer on mobile
- **Content area**: renders TablePage / DocumentPage / DashboardPage / ViewPage / CustomPage by page type

## Authentication & Login

| Access mode | Who can access |
|---|---|
| Private | Owner + admins + users explicitly assigned a role |
| Public | All logged-in users |
| Token | Users holding the share link |

The dedicated login page supports username/email + password login (with captcha if configured) and shows a "Guest access" button when guest access is enabled.

| Session type | Validity |
|---|---|
| User session | 7 days |
| Guest session | 24 hours |

Accessing an unpublished application is rejected; private applications require login and appropriate permissions.

## Template Marketplace

Click "Create from Template" to open the marketplace with category filters (All / Project Management / Customer Management / Content Operations / HR / Inventory / General Tools), search and sorting (Newest / Most popular).

There are **6 categories with 18 built-in templates**, including core templates such as Project Dashboard, CRM Portal and Personal Workspace. Template cards show icon, name, description, category, difficulty badge (Beginner / Intermediate / Advanced), tags and estimated time.

**Usage flow**: browse / search templates → click "Use" → preview details (required tables, menu structure) → confirm → a draft application is created automatically → customize in the builder.

## Template Import & Export

- **Export**: click "Export Template" in the builder; the system derives dependent tables (`requiredTables`) from page configuration and downloads a `.json` file
- **Import**: click "Import Template" in the application list and choose a `.json` file; the file must be valid JSON with an object root containing a `name` field; `requiredTables` are smart-matched against existing tables by name. Importing adds a template definition — instantiate it into an application via "Create from Template"

## FAQ

- **"Login required" / "No access to this application"**: session expired — log in again; private applications require the Owner to assign roles
- **Preview differs from runtime**: re-publish after editing a published application
- **Changes not taking effect**: builder changes must be persisted via "Save"
- **Menu not showing**: check the menu visibility toggle and the role's "visible" permission in the menu permission matrix
- **Mobile layout issues**: enable "Mobile adaptation" in application settings; the sidebar becoming a drawer on mobile is normal behavior
