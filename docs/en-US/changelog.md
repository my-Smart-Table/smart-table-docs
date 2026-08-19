# Changelog

This page records the version update history of SmartTable.

## v1.6.5 (2026-08-19)

This release focuses on **internationalization & multi-language framework**, **third-party app integration & audit system**, **date field enhancements**, and **table feature optimizations**. Built a frontend/backend i18n framework covering the complete feature UI, with a language switcher and automatic system-language detection; added OAuth2 third-party app integration with complete application audit logs; introduced a unified DateInput component, text-format formula fields and unified number display; added a table change-history audit dialog, member-name and formula-result export, and shared-form formula field display; and fixed a batch of issues.

### New Features & Improvements

#### 🌐 Internationalization & Multi-Language ⭐

- ⭐ **Frontend/Backend i18n Framework**: Built the frontend/backend internationalization framework skeleton with unified multi-language key management and loading
- ⭐ **Language Switcher**: New language switcher component with manual switching and automatic system-language detection
- **Multi-UI Localization**: Localized the auth page covering the complete system UI copy
- **View Internationalization**: Added view i18n support; default table view name and description now support localization
- **English Templates**: Template preview now supports English translation with new English templates
- **English Copy Updates**: Updated English copy for field types and component names

#### 🔌 Third-Party App Integration ⭐

- ⭐ **Third-Party App Integration**: Added OAuth2 third-party app integration with open API authentication
- ⭐ **Application Audit Log**: Implemented complete application audit logging of key third-party app operations
- ⭐ **App Integration Docs**: Added app integration documentation detailing the integration flow and usage examples

#### 📅 Date Input & Field Format

- ⭐ **Unified DateInput Component**: New unified DateInput date component supporting custom date formats
- **Formula Field Text Format**: Formula fields can now display in text format
- **Unified Number Display**: Unified number field display format

#### 📝 Table Capabilities & Export

- ⭐ **Table Change-History Audit Dialog**: New table change-history audit dialog for tracing record changes
- **Export Enhancements**: Export now includes member names and formula results
- **Link Field Editor**: Updated link field editor implementation
- **Shared Form Formula**: Shared forms support formula field display and submit filtering

#### 🔐 Account & Form Experience

- **Change-Password Dialog**: New change-password dialog component
- **Anonymous/Authenticated Submit**: Support anonymous form submission as well as authenticated submission for non-anonymous scenarios
- **Version Display**: Feedback dialog now shows the current version number at the bottom

### Bug Fixes

- Fixed master-detail data invisibility caused by master-detail config under grouped views
- Fixed residual field edit state
- Fixed switch-cell display on new rows and lock concurrent-save issues
- Unified UUID column type for PostgreSQL compatibility
- Added idempotency checks to migration scripts, fixing legacy schema drift
- Fixed dashboard deletion issue
- Fixed rich-text length validation in shared forms
- Fixed invalid custom upload directory in packaged mode

## v1.6.4 (2026-08-12)

This release focuses on **master-detail tables & tree hierarchy**, **in-app notification system**, **workflow custom script nodes**, **collaborative editing & concurrency control**, and **permission model tightening**.

### New Features & Improvements

#### 🔗 Master-Detail & Tree Hierarchy ⭐

- ⭐ **Master-Detail Tables**: Full master-detail (sub-table) support with sub-table toolbar, multi-link-field switching, add-link and refresh capabilities
- **Master-Detail Data Service**: New `masterDetailService` and `useMasterDetail` composable encapsulating data fetching, column building, caching and lazy loading
- **Sub-Table in Drawer**: New `SubTableInDrawer` component renders linked sub-tables inside the detail drawer, with a second-level sub-record detail dialog
- **Drawer Width Optimization**: Improved drawer width calculation with a minimum-width fallback
- ⭐ **Tree Hierarchy Records**: New view parent-field configuration, build record tree hierarchy via self-referencing link fields
- **Tree Record APIs**: New create-child-record API and tree record data query API
- **Self-Link Optimization**: Link field component now excludes the current record in self-referencing scenarios

#### 📬 In-App Notification System ⭐

- ⭐ **In-App Notifications**: Complete in-app notification system with notification service, models, API routes and admin interfaces
- **Frontend Notification Center**: New notification components, state management and notification page
- **Notification-First Strategy**: Replaced legacy email notification logic — sends in-app messages first while remaining compatible with email delivery
- **Multi-Scenario Coverage**: Covers registration, password change, share collaboration, approval and other notification scenarios
- **Database Upgrade**: Added notification tables and migration scripts; Dexie frontend database upgraded to version 10

#### 🔄 Workflow Engine Enhancements

- ⭐ **Custom Script Node**: New workflow custom script node supporting custom scripts written in Python
- **Script Execution Sandbox**: New backend script execution sandbox isolating execution via subprocess for safety
- **Script Config Panel**: New frontend script node config panel integrating a code editor with test-run capability
- **Engine Scheduling**: Improved workflow execution engine scheduling and context handling for script nodes

#### 🤝 Collaborative Editing & Concurrency Control

- ⭐ **Cell Collaboration Lock**: Complete cell collaboration lock with conflict detection, supporting lock timeout, reconnect retry and state management
- **Optimistic Conflict Detection**: Local pending changes support optimistic conflict detection with a conflict dialog and user resolution logic
- **Lock Resource Release**: Automatically release all held locks on component unmount to avoid lock leakage
- **Document Optimistic Lock**: Document updates now carry `expected_updated_at` optimistic lock validation; rename and save conflicts return 409

#### 🧮 Formula & Fields

- **Date Functions**: Refactored backend date parsing, added support for YYYYMMDD format, millisecond timestamp strings and common date formats
- **Nested Functions**: Unified date parsing entry, improved multi-level nested function scenarios (e.g., extracting dates from ID numbers)
- **Formula Error Hints**: Added detailed formula engine error hints including function name, arguments and error message
- **Regex Validation Field**: Added regex validation config for single-line text fields with custom rules and validation hints
- **Regex Presets**: Built-in presets for domestic phone, postal code, ID number, IPv4 and more, with quick-fill support
- **Real-time Validation**: Forms and detail dialogs support on-blur real-time validation with error styling

#### 🎨 Interaction & Experience

- **Context Menu Enhancement**: Added hint tooltips to menu items; added promote/demote/add-child tree operation icons and optimized layout
- **Table Position Retention**: Auto-scroll to the most recently updated record row after data updates, keeping operation context continuous
- **Incremental Update Optimization**: Prefer incremental updates when row count is unchanged during real-time updates to reduce full rebuilds
- **Clipboard Compatibility**: New `copyToClipboard` utility prioritizing Clipboard API with automatic fallback and full URL display

#### 🔐 Permissions & Security

- **Permission Tightening**: Field and management operations raised from EDITOR-and-above to ADMIN-and-above to prevent accidental edits by regular users
- **Scope Coverage**: Workflows, data tables, documents, dashboards and other management functions are admin-only
- **Share Rate Limiting**: Form share rate limit changed from client IP dimension to share-token dimension to avoid falsely limiting multiple LAN users; threshold adjusted to 100 requests / 15 minutes

### Bug Fixes

| Issue | Fix |
| --- | --- |
| Select editor | Fixed selected value matching anomaly; single/multi-select now match by id while remaining compatible with legacy name matching |
| Select option display | Fixed incorrect display text; now uses the actual name for display |
| View route validation | Fixed table_id type mismatch causing validation failure; form view can now be set as default view |
| Hierarchical table expand | Fixed expand button not showing (empty records initialized in CachedDataSource mode) |
| Table scroll position | Fixed table jumping back to first row after data updates |
| Share API route | Unified frontend/backend share API route paths; merged update and delete APIs with improved error hints |
| Share API compatibility | Fixed using `filter_by` instead of `query.get` to be compatible with CompatUUID type |
| Timestamp adaptation | Fixed frontend adaptation for backend returning second-level timestamps |
| Form error hint | Fixed form submit error hint value order, prioritizing the error field to match backend error format |
| Debug reload | Fixed Flask debug reload opening the browser repeatedly in packaged mode |
| Formula date comparison | Fixed type inconsistency when comparing date/time field values in formulas |
| Cell option storage | Fixed cell single/multi-select values stored differently from those shown in the dialog |
| Form share copy | Fixed form share link not copyable in some scenarios |

## v1.6.3 (2026-07-30)

### New Features & Improvements

#### 🔄 Workflow Engine Enhancements

- **Loop Node**: New loop node type with full process support, iterate collections inside workflow
- **Loop Webhook**: Added loop node Webhook support and fixed loop data source
- **Webhook Delivery Logs**: New workflow instance Webhook delivery log viewer
- **Webhook Variable Hints**: Refactored variable hint system with detailed hover tooltips
- **Inline Webhook Interception**: Support inline Webhook delivery and re-delivery interception
- **Canvas Edges**: Optimized canvas edges with directional arrows
- **Node Type Refactor**: Refactored workflow node types with fine-grained enums, backward-compatible with legacy data
- **Execution Log Enhancements**: Execution log node ID changed to string type, added node name field

#### 🧮 Formula & Fields

- **Unified Formula Registration**: Unified frontend and backend formula function registration, added missing functions
- **Lookup Field Optimization**: Optimized lookup field functionality, fixed cache and display issues
- **Number Formatting**: Added formatting rendering for number type fields

#### 🛠️ Platform Capabilities

- **Token Auto-Refresh**: Implemented complete Token auto-refresh system
- **Issue Feedback**: New issue feedback related functionality
- **Document Experience**: Optimized document version control and editing experience
- **Attachment Preview**: Attachment image thumbnails support single-click to preview full image
- **Session Timeout Upper Limit**: Adjusted session timeout upper limit to 10080 minutes (7 days) — not recommended to raise too high due to security concerns

#### 📦 Engineering & Build

- **pnpm Migration**: Full migration of frontend build system to pnpm (Docker, packaging scripts, docs sync)
- **Database Migration**: Refactored database initialization flow, switched to Alembic migrations, supports automatic version upgrade
- **Feedback Email**: Updated feedback email address

### Bug Fixes

| Issue | Fix |
| --- | --- |
| Kanban drag | Fixed kanban drag not using target group ID |
| Kanban sync | Fixed kanban view drag not synchronizing group field updates |
| Duplicate new rows | Fixed editor callback anomaly causing 2 rows to be added per single add operation |
| Table interaction | Fixed table view interaction issues and field type conversion/defaults |
| Field editor | Fixed field management panel anomalies after confirming field editor |
| Attachment delete | Fixed attachment field delete dialog occlusion and deletion failure |
| Attachment preview | Fixed clicking attachment thumbnail triggering cell selection |
| Workflow validation | Fixed workflow node empty result handling and empty node validation logic |
| Timezone acquisition | Fixed timezone acquisition logic, support reading browser local timezone |
| Webhook interception | Fixed inline Webhook delivery and re-delivery interception |

## v1.6.2 (2026-07-19)

### New Features & Improvements

#### 🔄 Workflow Engine Enhancements

- **Send email node** - Added send email node support, allowing workflows to directly trigger email notifications
- **Record time trigger** - Added "When record time is reached" trigger type, supporting time-based triggers based on record time fields
- **Lookup record node** - Added lookup record workflow node for querying related data within workflows
- **Node type management refactoring** - Refactored node type management to lay the foundation for future node type extensions

#### 🔍 Lookup Field Fully Implemented ⭐

- ⭐ **Full implementation of Lookup Field** - Supports looking up and referencing target field values from related records, enabling cross-table data linkage
- **Record display adaptation** - Record drawers and detail pages fully support lookup field display for more coherent data viewing
- **Formatting logic optimization** - Fixed default value display and lookup field formatting logic to ensure referenced data renders correctly

#### 🧮 Formula Field Enhancements

- **Formula helper component** - Added formula helper component integrated into the field configuration dialog, lowering the barrier to formula writing
- **Multi-type formatting** - Improved formula field functionality with support for formatting calculation results of more field types
- **Date processing capabilities** - Added date processing functions and optimized display effects

#### 📊 Dashboard Sharing

- **Complete sharing flow** - Implemented the complete dashboard sharing flow, allowing dashboards to be shared via links
- **Sharing info configuration** - Added dashboard sharing title and remark fields to help recipients understand shared content
- **Security policy optimization** - Access password is returned only once when creating a share, avoiding repeated exposure in subsequent APIs

### Bug Fixes

| Issue                            | Fix                                                           |
| -------------------------------- | ------------------------------------------------------------- |
| Authentication & sidebar display | Fixed authentication store and sidebar display logic          |
| Lookup field formatting          | Fixed default value display and lookup field formatting logic |
| Dashboard sharing model          | Imported missing DashboardShare model                         |
| Date function display format     | Fixed date function display format logic                      |

## v1.6.1 (2026-07-11)

### New Features & Improvements

#### 🔄 Workflow Canvas Visual Editing ⭐

- ⭐ **Implemented workflow canvas visual editing** - Supports intuitive editing of workflow nodes and connections on canvas
- ⭐ **Condition branch visual connections** - Refactored condition node connection and layout logic, supports multi-branch visual display
- ⭐ **Auto-layout optimization** - Condition branch node auto-layout, adapts to multi-branch scenarios

#### 🔀 Condition Branch Node Enhancement

- ⭐ **Default branch feature** - Added default branch, executed when all condition branches don't match
- ⭐ **Field value display optimization** - Optimized field value display logic in condition component

#### 📊 Execution Log Enhancement

- ⭐ **Node name display** - Added node name display in execution logs for easier execution flow tracking

#### 🪝 Webhook Status Management

- ⭐ **Webhook reference validation** - Added Webhook reference validation to ensure reference validity
- ⭐ **Status management** - Added Webhook status management capability

### Bug Fixes

| Issue                                   | Fix                                                                                |
| --------------------------------------- | ---------------------------------------------------------------------------------- |
| **🔧 Workflow clone node ID mapping**   | Fixed node ID reference not mapped during workflow cloning                         |
| **🔧 Condition branch execution chain** | Fixed condition node branch target ID mapping and execution chain generation logic |
| **🔧 Workflow test failure**            | Fixed workflow test failure issue                                                  |

## v1.6.0 (2026-07-05)

### New Features & Improvements

#### 🔄 Workflow Automation Engine ⭐⭐⭐

**Core Engine & Architecture**

- Implemented complete workflow and Webhook functional modules (end-to-end architecture)
- Implemented binding relationship between workflows and data tables
- Supported workflow operations: create, edit, delete, pause, resume, version snapshot, etc.
- Auto-build workflow node execution chain and node execution order
- Implemented workflow version snapshots
- Supported viewing global binding relationship between data tables and workflows
- Unified workflow node type normalization

**Trigger System**

- ⭐ New **scheduled time trigger** capability for workflows
  - Scheduled time trigger uses local timezone for trigger time interpretation
  - Supports one-time non-repeating trigger and multiple repeating types (daily/weekly/monthly/yearly/custom)
  - Supports deadline configuration for scheduled time triggers to avoid repeated triggering
- ⭐ Supports **record creation** trigger
  - Trigger filter conditions support global triggering (no filter conditions configured)
  - Trigger filter conditions support AND (all match) and OR (any match) multi-condition triggering modes
- ⭐ Supports **record update** trigger
  - Supports global triggering (no listened fields configured)
  - Supports listening to specified field updates for triggering (configure listened fields)
  - Trigger filter conditions support global triggering (no filter conditions configured)
  - Trigger filter conditions support AND (all match) and OR (any match) multi-condition triggering modes

**Node System**

- ⭐ Supports **multiple node** types (create record, update record, webhook, condition branch) with create, edit, delete operations
- ⭐ **Create Record Node**
  - Supports creating records in target table
  - Supports field value input mapping configuration for target table, supports static values or reference expressions based on source table field values
- ⭐ **Update Record Node**
  - Supports source table field value input configuration, supports static values or expressions
- ⭐ **Webhook Node**
  - Supports selecting system-configured Webhooks
  - Supports inline configuration of new Webhooks
- ⭐ **Condition Node**
  - Filter conditions support AND (all match) and OR (any match) multi-condition triggering modes
  - Supports real-time display of configured condition summary information
- ⭐ Supports manual adjustment of node execution order (drag-and-drop sorting)

**List & UI**

- ⭐ Workflow list panel with **collapse/expand** functionality (adaptive sidebar width)
- ⭐ New **search box** for filtering workflows by name or description

**Version Management**

- ⭐ **Version history** feature, supports viewing workflow historical versions
- Version history dialog supports viewing version number, creation time, creator name, node configuration summary information, etc.

**Top Navigation**

- ⭐ New top navigation **automation menu** on Base page, unified workflow configuration entry

#### 🪝 Webhook Delivery Management System ⭐

- ⭐ **Webhook configuration** feature, supports adding and editing Webhook configurations
  - Supports Webhook name, URL, HTTP method, headers, request body template configurations
  - Supports Webhook retry strategy (max retry count, retry interval, etc.) configuration
  - Supports Webhook enable state (enable/disable) configuration
- ⭐ Supports testing **Webhook configuration** functionality, supports testing whether Webhook configuration is valid
- ⭐ **Webhook delivery records** feature
  - Supports viewing Webhook delivery record list
  - Supports viewing Webhook delivery record details (including request parameters, response status code, response body, etc.)
  - Supports refreshing Webhook delivery records

### Bug Fixes

- N/A

## v1.5.2 (2026-07-02)

### New Features & Improvements

#### ✨ New Features
- **🔍 Global Table Search**: New global search capability within the table for quick record locating
- **🧩 Auto-merge Cells**: Support auto-merge of adjacent cells with identical content
- **❄️ Row Freeze/Unfreeze**: New right-click menu actions to freeze/unfreeze rows in table view
- **🔑 Primary Key Field Description**: Added default description for primary key (index) field, with hidden operation restricted

#### 🔧 Improvements
- **Formula Engine**: Formula calculation supports direct return of literal values
- **Column Sorting**: Optimized column sorting logic, supports correct sorting for numeric fields
- **Context Menu & Header Sorting**: Optimized context menu and header click sorting interaction
- **Data Update Logic**: Refactored records watcher to unify table data update mechanism
- **Sequence Column**: Optimized sequence column, new rows don't display sequence number and cannot be selected
- **CAPTCHA Font Optimization**: Optimized CAPTCHA font loading and rendering, with new font dependency

### Bug Fixes

- Fixed issue where duplicated records did not auto-refresh
- Fixed duplicate field values in the new-row button row causing cell merge
- Fixed inconsistent empty-value return from editor causing inability to clear single-select field
- Fixed CRLF line ending issue for files inside Docker container and set permissions

## v1.5.1 (2026-06-19)

### New Features & Improvements

#### 🔧 Improvements
- 📝 Field Type Selection Logic Refactoring ⭐ Unified field type selection logic to improve code maintainability.
- 🎨 Table View Add Record Button Display Optimization

### Bug Fixes

- 🔧 Gantt Chart Record Editing Data Incomplete Issue
  **Issue Description**: When editing records in Gantt view, some field data was lost or not saved correctly.
  **Impact Scope**: Gantt view, record editing, data synchronization
- 🔧 Table View Filter Condition Ineffective Issue
  **Issue Description**: In some scenarios, table view filter conditions were not effective or ignored.
  **Impact Scope**: Table view, data filtering, view switching

## v1.5.0 (2026-06-14)

### New Features & Improvements

#### 🏗️ VTable — New Table Rendering Engine ⭐

The biggest change in this release — fully migrated to **@visactor/vtable** rendering engine.

**Core Interaction Upgrades**

- **Context Menu**: Cell and header right-click menu with sort, freeze, edit operations
- **Record Detail Drawer**: Click to open detail drawer supporting all field types
- **Floating Action Icons**: Hover to show action icons for quick operations
- **Column Freeze**: Customizable column freezing with flexible logic

**Native Grouping Support**

- Native group rendering within the table
- Quick record addition within groups
- Group collapse/expand and statistics

**Interaction Enhancements**

- Cell copy-paste with feedback tips
- Cell value validation with error highlighting
- Column descriptions with overflow tooltip
- Field type icons in table headers
- ARCO theme for unified visuals

#### 🧮 Formula Field Support ⭐

- Arithmetic expression parsing and formula field support
- Create formula fields referencing other field values
- Basic arithmetic operations and function calls

#### 📝 Rich Text Field

- New rich text type at data table field level
- Quill-based inline rich text editing
- Dynamic initialization in record detail drawer

#### 📎 Attachment Field Management

- Complete attachment field management
- Upload, preview, and edit support
- Real-time position sync for attachment float window
- Multi-format compatibility and interaction enhancements

#### 🔢 URL Field Interaction

- Single-click to open link
- Double-click to edit
- Intelligent recognition with security validation

#### 🏠 Home Page Enhancement

- "Create from copy" option for quick Base duplication
- Full field type test template and record generator

### Bug Fixes

| Issue                                  | Fix                                                                                              |
| -------------------------------------- | ------------------------------------------------------------------------------------------------ |
| **🔧 Cache Clear**                     | Added transform cache cleanup logic                                                              |
| **🔧 Invalid Save**                    | Added no-change check to prevent invalid saves                                                   |
| **🔧 Batch Delete State**              | Added batch delete state management                                                              |
| **🔧 Template Preview Dialog**         | Fixed dialog mount with append-to-body                                                           |
| **🔧 Excel Import Date**               | Fixed default value for empty date fields during import                                          |
| **🔧 Sort Request Format**             | Adjusted sort API request format and method                                                      |
| **🔧 Local Record Query**              | Sorted IndexedDB records by creation time                                                        |
| **🔧 PG Timestamp**                    | Fixed millisecond timestamp compatibility for PostgreSQL                                         |
| **🔧 Member Search Param**             | Removed redundant base\_id parameter                                                             |
| **🔧 Compilation Issues**              | Fixed rich text and member editor compilation                                                    |
| **🔧 Code Structure**                  | Organized code and fixed minor issues                                                            |
| **🔧 Collaborative Edit Failure**      | Fixed collaborative editing startup failure in certain scenarios                                 |
| **🔧 Template Preview Overlap**        | Fixed template preview dialog being covered by other elements                                    |
| **🔧 Manual Sort Failure**             | Fixed data table manual sort not working                                                         |
| **🔧 Column Width After Grouping**     | Fixed column width issues after full table update in group mode                                  |
| **🔧 Redis Not Starting After Reboot** | Fixed Redis not starting after Docker service restart                                            |
| **🔧 Collaborative Edit Config**       | Fixed collaborative editing configuration failure under Docker and Windows startup package modes |
| **🔧 Backspace Button Conflict**       | Fixed backspace button conflict between data detail page and table editing                       |

## v1.4.1 (2026-05-31)

### New Features & Improvements

#### 🔗 Link Field Enhancements

- Added **unlink** functionality for link fields, allowing disconnection of established record relationships
- Enhanced **bidirectional linking** support for more accurate data synchronization
- Fixed link field display and data consistency issues in various scenarios

#### 📥 Batch Import Optimization

- Added batch import feature for significantly improved data entry efficiency
- Optimized import workflow experience with clearer interface feedback
- Added batch insert and performance test utilities

#### ⚙️ Interaction Experience Optimization

- Optimized Gallery View image preview styling for better visual effect
- Added `LoadingOverlay` universal loading overlay component, integrated into batch delete and other time-consuming operations for better feedback
- Sidebar style refinement (edit icon replacement)
- Timezone optimization: when no timezone is configured, uses browser local timezone for display by default, simplifying user onboarding

### Bug Fixes

| Issue                           | Fix                                                                                               |
| ------------------------------- | ------------------------------------------------------------------------------------------------- |
| **🔧 PostgreSQL Compatibility** | Fixed PostgreSQL database compatibility issues, enabled PostgreSQL v13+ support                   |
| **🔧 Attachment Filename**      | Fixed attachment display using wrong filename field                                               |
| **🔧 Cache Miss**               | Fixed secondary cache data loss during large batch requests                                       |
| **🔧 Env Loading Path**         | Fixed `.env` file loading base path logic                                                         |
| **🔧 Terminal Encoding**        | Fixed backend terminal output encoding issue                                                      |
| **🔧 Type/Data Issues**         | Optimized multiple code logic and fixed type/data compatibility issues                            |
| **🔧 Timezone Compatibility**   | Unified database datetime fields to timezone-aware types for PostgreSQL environment compatibility |

## v1.4.0 (2026-05-25)

### New Features & Improvements

#### 📄 Document Management Module ⭐

**Complete Document CRUD**

- New document management feature supporting create, edit, delete, query operations
- Documents associated with Base, supporting Base-based permission control

**Document Editor ([TinyEditor](https://github.com/opentiny/tiny-editor/))**

- TinyEditor-based rich text editor with bold, italic, lists, links, tables, and more
- Markdown syntax support for writing document content
- Keyboard shortcut support (Ctrl+S save, etc.)
- Custom fullscreen toggle functionality
- Global Chinese i18n configuration

**Document Version History**

- Document version history tracking and rollback
- Version comparison view, restore historical content by version number
- Display of version creator information

**PDF Export**

- Export document content as PDF files
- DOM direct parsing replaces delta conversion for more accurate PDF styling
- Fixed image URL issues in PDF export

**User Experience Optimization**

- Document editor loading states and universal loading component
- AppHeader info display for document pages
- Document header outline navigation feature
- Document detail loading state display

#### 🐳 Docker Deployment Architecture Refactoring ⭐

- Refactored Docker deployment architecture with embedded Redis
- Unified single-container deployment scheme, greatly simplifying deployment
- No need for additional Redis container, convenient for quick service startup

#### 📝 Document Editor Optimization

- Optimized document editor loading logic and styles (layout, placeholder, toolbar)
- Refactored document editor layout and outline logic
- Refactored document version history preview logic

#### 🔄 Field Naming Unification & Timezone Handling

- Unified frontend-backend field naming convention (camelCase/snake\_case adaptation)
- Optimized timezone handling, fixed version check issues due to timezone inconsistency
- Improved optimistic lock validation logic

#### 📦 API Documentation Enhancement

- Added complete Swagger documentation comments for all routes in document\_versions.py and documents.py
- Unified API documentation standards (tags, security, parameters, response format, error codes)

### Bug Fixes

| Issue                               | Fix                                                          |
| ----------------------------------- | ------------------------------------------------------------ |
| **🔧 List Selection State Anomaly** | Fixed abnormal list selection state                          |
| **🔧 Document Optimistic Lock**     | Fixed optimistic lock validation logic                       |
| **🔧 Timezone Inconsistency**       | Fixed version check issue due to timezone inconsistency      |
| **🔧 Version Creator Display**      | Optimized version history creator display logic              |
| **🔧 PDF Image URL Issue**          | Fixed image URL path issues in PDF export                    |
| **🔧 Editor i18n**                  | Configured and initialized Chinese i18n for rich text editor |
| **🔧 Decorator Compatibility**      | Added g.user\_id variable for alias compatibility            |

## v1.3.3 (2026-05-17)

### New Features & Improvements

#### ⚡ Streaming Load Progress & Data Loading Optimization ⭐

**LoadingProgress Component**

- New global LoadingProgress component for displaying record load progress
- Supports percentage progress bar + current count/total + elapsed time display
- Adapts to different screen sizes (desktop/tablet/mobile)

**Streaming Table Record Loading**

- Implemented paginated data streaming strategy: load first page for fast display, async background load remaining pages
- First-screen rendering time reduced by **60%+** (10k records from 5s → <2s)
- Users can operate on loaded data during loading process (non-blocking)
- Auto-adapts to new backend API response format

#### 🔍 Request Tracking System ⭐

**Request ID Middleware**

- Each request auto-generates unique `request_id` (UUID format)
- request\_id spans entire request lifecycle (middleware → route → service layer → response)
- All API response bodies carry request\_id, facilitating frontend-backend debugging
- Logs auto-correlate with request\_id, supporting full call chain lookup by ID

**Enhanced Error Handler**

- All exception responses unified with: `error_code`, `message`, `request_id`, `timestamp`
- New error handling config items (control stack trace exposure, detailed logging, etc.)
- JWT error responses all carry request\_id (expired/invalid/revoked scenarios)

**Unified API Response Format**

- New standard API response type definition (backward compatible with old format)
- API client refactored: added detailed error logging and standardized error objects
- Frontend response interceptor distinguishes "permission denied" vs "auth expired", correctly redirects to login

**API Error Tracking Utility**

- Logger tool gains API error tracking capability (history storage & management)
- Support querying historical errors by request\_id
- Dev mode provides error detail panel

#### 💾 Local Cache Mechanism ⭐

**Real-time Collaboration State Cache**

- Collaboration state (online users, lock status) cached to localStorage with **2-hour TTL**
- Reduces duplicate API calls on page refresh (first-screen collaboration state recovers in seconds)
- Cache supports read/write, validation, and auto-expiry cleanup

**User Authentication Info Cache**

- User login state and basic info cached locally
- Optimizes initialization flow (no user API call needed on every startup)
- Login/logout/user info update syncs cache automatically

**System Config Cache (adminStore)**

- System config (timezone, security settings, etc.) locally cached with expiry
- Cache hit returns directly, reducing **90%+** duplicate config requests
- On request failure, falls back to expired cache (graceful degradation)
- Admin config update auto-clears all client caches

#### 🛡️ System Security Config & Registration Optimization ⭐

**Public Configuration Endpoint**

- New endpoint for retrieving security config without login (password rules, registration toggle, etc.)
- Frontend auto-detects config changes and adjusts UI behavior accordingly

**Dynamic Password Strength Validation**

- Password rules configurable from admin backend (length, uppercase, numbers, special chars, etc.)
- Real-time validation with strength level indicator during registration/password change

**Registration Toggle Switch**

- Admin can enable/disable registration from backend with one click
- Registration button auto-hidden when disabled, registration requests blocked
- Login/register page dynamically shows or hides registration entry based on config

**Session Timeout Configuration**

- Session timeout adjustable from admin backend without restart
- Changes take effect immediately

#### 📅 Unified UTC ISO Date Format ⭐

**Frontend-Backend Format Unification**

- All datetime fields use UTC ISO format for storage and transmission (e.g., `2026-05-10T16:16:40.478Z`)
- Frontend components support timestamp, ISO string, date string and other input formats
- Backend ensures all datetime data stored in UTC format with correct timezone conversion

**Timezone Conversion Full Coverage**

- Base page and Dashboard page support timezone conversion display
- Table cells support timezone conversion
- Template preview dialog supports timezone conversion
- RecordDetailDrawer read-only mode correctly applies timezone conversion

**Unified Timezone Utility Functions**

- Unified use of `formatDate()` and `formatDateTime()` utility functions
- Replaced scattered dayjs and Date.toLocaleString() calls throughout project
- Fixed UTC strings without timezone suffix being incorrectly parsed as local time (avoiding double offset)

#### 🧪 Batch Insert Test Tool ⭐

**SmartTable Bulk Data Performance Testing Script**

- Complete batch insert test tool for platform performance testing
- Customizable parameters: insert count, batch size, delay interval, field mapping rules
- Built-in field configuration examples (text, number, date, single-select, multi-select, attachment, etc.)
- Includes complete usage documentation and best practices guide

#### 📦 Batch User Query Optimization

**Invalid ID Filtering & Null Validation**

- Frontend user API, cache Store, and member components all add invalid ID filtering logic
- Backend batch user query endpoint adds invalid ID filtering in sync
- Unified early return on empty results, reducing invalid API calls by \~**40%**

#### 🔄 Template Sync Logic Refactoring

**templateService Refactoring**

- Sync method parameter upgraded from records to complete templateTable object
- Added field type mapping logic, unified handling of date, single/multi-select field type conversions
- Clearer code structure, improved maintainability

#### 🖥️ Windows Log Rotation Fix

**SafeRotatingFileHandler**

- Resolved classic Windows issue where log files cannot be rotated due to file locks
- New safe log file handler implementation
- Development environment log handlers all replaced with safe implementation

#### 🛠️ SocketIO Connection Log Enhancement\*\*

- Connection handler function now accepts auth parameter and logs authentication status
- Facilitates troubleshooting of WebSocket connection and auth issues

#### ⚙️ System Settings Page Cleanup

- Removed unused basic configuration save logic
- Set system name, description, and per-page record count to disabled state
- Two-factor auth, logging, performance monitoring reserved features disabled with gray hint text
- Not-yet-enabled features clearly labeled to avoid user confusion

### Bug Fixes

#### Core Feature Fixes (8 items)

| Issue                                      | Fix                                                                                               | Impact                                  |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------- | --------------------------------------- |
| **🔧 SocketIO Connection Exception**       | Wrapped connection handling in try-except, auth failure returns False instead of disconnect       | WebSocket connection stability improved |
| **🔧 Filter State Out of Sync**            | Changed activeFilters from ref to computed, reset connector on filter reset                       | Filter condition loss issue             |
| **🔧 JWT Error Handling Inconsistent**     | All JWT errors unified with request\_id; frontend distinguishes permission denied vs auth expired | Login redirect confusion                |
| **🔧 Right-click Edit Unresponsive**       | Fixed table view data row right-click "Edit" button not responding                                | Edit action unusable                    |
| **🔧 Right-click New Record Data Anomaly** | Fixed refresh conditions after new record creation, use baseId instead of tableId                 | Table data empty/incorrect              |
| **🔧 DateTime Field Not Editable**         | Extended cell edit initialization type check to include datetime fields                           | Cannot edit datetime in cell            |
| **🔧 Date Cell Assignment Inconsistent**   | Changed to update local editValue first then emit, maintains internal consistency                 | Value reverts after edit                |
| **🔧 Field Create Parameter Naming Error** | is\_required corrected to camelCase isRequired, consistent frontend-backend                       | Field required attribute ineffective    |

#### Component/UI Fixes (6 items)

| Issue                                     | Fix                                                                                    |
| ----------------------------------------- | -------------------------------------------------------------------------------------- |
| **🔧 RecordDetailDrawer Compile Error**   | Fixed TypeScript compilation error                                                     |
| **🔧 Required Asterisk Missing**          | Required field red asterisk displays correctly in detail drawer                        |
| **🔧 Single Select Dropdown Plain Style** | Replaced native select with el-select, added option color dot display                  |
| **🔧 Real-time Collaboration Port Error** | Fixed dev environment Socket.IO connection port config                                 |
| **🔧 Timezone Double Offset**             | Fixed UTC strings without suffix parsed as local time causing double offset            |
| **🔧 Timezone Not Effective on Startup**  | Preload system config on startup, ensures timezone conversion takes effect immediately |

#### Permission & Config Fixes (4 items)

| Issue                                        | Fix                                                                    |
| -------------------------------------------- | ---------------------------------------------------------------------- |
| **🔧 Non-admin Cannot Apply Timezone**       | Adjusted backend admin route config, opened timezone-related endpoints |
| **🔧 Real-time Collaboration Toggle Config** | Backend reads from env variable, frontend adapted accordingly          |
| **🔧 Preload Error When Not Logged In**      | App.vue only loads system config when logged in                        |
| **🔧 TypeScript Type Error**                 | Removed unused dayjs import                                            |

## v1.3.2 (2026-05-06)

### New Features & Improvements

#### 📝 Timezone Management Full Support ⭐

**System Parameter Configuration Interface with Timezone Support**

- New standalone system parameter configuration interface with timezone configuration support
  > Implements system-level timezone configuration, allowing administrators to switch between UTC and specified local time zone for site-wide time display.
- Global timezone display adaptation: Automatically converts time display to the specified timezone based on system configuration.

#### 📝 Form Sharing System Comprehensive Upgrade ⭐

**Form Sharing Management Interface**

- New standalone form sharing management interface for viewing all created form share links
- Visual display of share status (enabled/disabled/expired), submission statistics (total/today)
- One-click copy link, edit settings, enable/disable, delete shares

**Form Sharing Workflow Optimization**

- Step-by-step configuration wizard (Basic Info → Submission Settings → Field Settings → Appearance → Publish)
- Real-time preview (WYSIWYG)
- Support custom redirect URL or success message after submission

**Form Page Member Search ⭐**

- Member fields in form pages support online user search
- Fuzzy search by username or email
- Displays avatar and name for better UX

#### 📥 Data Import Enhancement ⭐

**ImportDialog Data Preview Step**

- Upgraded from 2-step to 3-step: Upload → Preview → Configure
- Preview shows first 20 rows of parsed results, catch format issues early
- Adjust field type mapping and primary field selection during preview
- Shows file statistics (total rows, estimated processing time)

**Option ID & Name Conversion Support**

- Auto-match existing options by **ID or name** when importing multi/single-select fields
- Resolves data association errors when option values match but IDs differ
- Import logs record matching result per option (hit/new/skip)

#### 🔗 Link Field Comprehensive Enhancement ⭐

**Drawer-style Link Record Selector**

- Replaced popup with right-side drawer for larger workspace
- Drawer shows target table's full view (with filter/sort/group)
- View linked record details inline (nested detail view)

**Extended Relationship Type Support**

- Clearer relationship type configuration: One-to-One / One-to-Many / Many-to-One / Many-to-Many / Many-to-Many (Bidirectional)
- Auto-rebuild reverse relation field on type change

**Field Cache Service ⭐**

- New fieldCacheService with in-memory field definition cache
- Cache TTL: 5 minutes, reduces repeated backend API calls
- Link record selector loading speed improved by **60%+**

#### 🚀 Multi-dimensional Table Enhancements

**Added Multiple Base Templates**

- **6 new commonly used table templates**:
  - Meeting Management (meeting records, participant management, and meeting minutes)
  - Study Plan (course learning, progress tracking, and knowledge management)
  - Bug Tracking (software defect recording, priority management, and fix progress tracking)
  - Recruitment Management (job posting, candidate management, and interview process tracking)
  - Asset Management (fixed assets, equipment allocation, and inventory management)
  - OKR Objectives (objectives and key results management, progress tracking, and alignment)

**Table Route Support - Direct Access via URL**

- New dedicated route: `/base/:baseId/table/:tableId`
- Open specific table by typing URL in browser address bar
- Convenient for sharing specific table links without navigating through Base first
- Route changes auto-sync tableStore selection state

#### 📊 Dashboard Enhancements ⭐

**Dashboard Preview Mode**

- New global preview mode (preview effect without saving)
- All components render with mock data, reflecting actual layout

**Real-time Component Empty State Preview**

- KPI cards, clock, date components show preview during configuration
- See final rendering without binding real data source
- Reduces dashboard configuration learning curve

**Dashboard Template Expansion**

- **Multiple industry dashboard templates** added (sales funnel, helpdesk ticket, inventory alert, etc.)
- Template preview dialog component (click template card for modal preview)

**Template Preview Dialog ⭐**

- Click template in library → modal shows full preview
- Preview includes: name, description, use case, table list, field screenshots
- Supports "Use Now" and "Back to List" actions

#### 🔐 Real-time Collaboration Improvements ⭐

**Lock Operation Wait Mechanism**

- When cell locked by another user, lock request no longer fails immediately
- System auto-enters "wait queue", acquires edit right after lock releases (FIFO)
- Visual wait status (countdown + queue position + holder info)
- Support canceling wait (give up editing or switch cells)

**Field Update Full Sync**

- Field create/modify/delete/sort operations sync to all online users
- Sync includes: name, type, options, required attr, default value, etc.
- Other users' field changes notified via Toast (dismissible)

**User ID Tracking Mechanism**

- All collaboration events carry operator's user ID
- Resolves confusion between same-name users
- Online user list shows unique identifier (username + last 4 digits of ID)

#### 🛠️ Architecture & Toolchain Improvements

**Cross-platform Build & Redis Integration ⭐**

- Windows/Linux/macOS one-click build (PyInstaller + Nuitka dual engine)
  - Windows platform verified, ensuring normal operation under Windows environment
  - **🐛 Linux, macOS and other Unix systems verified feasible (pending testing)**
- Production Redis optimization (connection pool, sentinel mode, cluster mode adaptation)
- Build artifacts auto-include runtime deps (Python interpreter, DLLs, resources)
- Build script optimization (incremental build, signing, compression)

**Store Architecture Refactoring ⭐**

- **baseStore split into memberStore + shareStore**:
  - memberStore: Base member management (add, remove, role change)
  - shareStore: Base sharing management (create links, permissions, analytics)
  - Clearer responsibilities, better maintainability
  - Reduced unnecessary reactive watchers, **15%** perf gain

#### 📦 Service Layer Refactoring

**copy\_base Method Decomposition**

- Split monolithic copy\_base into 6 independent functions:
  - copy\_base\_metadata() - Copy basic info
  - copy\_base\_tables() - Copy table structure
  - copy\_base\_fields() - Copy field definitions
  - copy\_base\_views() - Copy view configs
  - copy\_base\_records() - Copy record data (optional)
  - copy\_base\_permissions() - Copy permission settings
- Each function independently testable & reusable
- More precise error location (know exactly which step failed)

**Centralized Field Type Label Mapping**

- Scattered field type Chinese label mappings consolidated into `types/fields.ts`
- Unified all frontend display names for field types
- New field types only need one place update, prevent omissions

#### 🔄 Data Sync Optimization

**Remote Delete Local Cache Cleanup**

- When other users delete records existing in local IndexedDB, auto-cleanup local cache
- Avoids "ghost records" issue (server deleted but still showing locally)
- Cleanup triggered via WebSocket push, no manual refresh needed

**Kanban View Legacy Format Compatibility**

- Compatible with v1.1.x and earlier option data formats (text array vs object array)
- Auto-migrate old format options to new format (id, name, color)
- Added "Ungrouped" column (shows records without any option value assigned)

#### 🎨 UI/UX Improvements

**Share Dialog Text Correction**

- Share dialog title corrected from "Base Share" to "Multi-dimensional Table Base Share"
- Unified product terminology usage (Base = Multi-dimensional Table)

**Dashboard Table Load Order Fix**

- Dashboard component init ensures table list loaded before rendering
- Fixed occasional "empty table dropdown" issue
- Load status synced to tableStore, consistent global state

### Bug Fixes

#### Core Feature Fixes (10 items)

| Issue                                   | Fix                                                               | Impact                                 |
| --------------------------------------- | ----------------------------------------------------------------- | -------------------------------------- |
| **🔧 Template Option Residual**         | Clear option mapping memory immediately after template processing | Avoid mixing old data into next import |
| **🔧 Option Config Missing ID**         | Fixed missing id field in import option config objects            | Link field option matching failure     |
| **🔧 Member Search Infinite Loop**      | Fixed recursive call in FormShare member search function          | Browser freeze                         |
| **🔧 Template Option Value Conversion** | Fixed option field value type conversion in template service      | Template-created field options lost    |
| **🔧 Own Base Showing**                 | Fixed self-created Bases appearing in "Shared with Me" list       | Inaccurate list data                   |
| **🔧 Field Attribute Naming**           | Unified isRequired to is\_required in field dialog                | Matches backend API field name         |
| **🔧 Field Update Missing Type**        | Fixed FieldDialog not passing type field on update                | Field type reverts to text             |
| **🔧 Default Value Mapping**            | Fixed missing default value mapping on record creation            | Defaults not applied                   |
| **🔧 User Identity Retrieval**          | Unified g.current\_user\_id usage across records module           | Inconsistent permission checks         |
| **🔧 User ID Null Check**               | Added null validation for user ID with unified handling           | Error on operation while not logged in |

#### Collaboration & Sync Fixes (5 items)

| Issue                          | Fix                                                                                             |
| ------------------------------ | ----------------------------------------------------------------------------------------------- |
| **🔧 Field Sync Failure**      | Fixed real-time sync issues for field operations (create/modify/delete), added user ID tracking |
| **🔧 Lock State Out of Sync**  | Fixed inconsistent cell lock state across multiple clients                                      |
| **🔧 View Switch Latency**     | Optimized push delay when others switch views (<100ms)                                          |
| **🔧 Offline Queue Overflow**  | Fixed queue crash when offline ops exceed 100                                                   |
| **🔧 Conflict Dialog Remains** | Conflict resolution dialog persists after clicking Discard or Overwrite                         |

#### Import/Export Fixes (3 items)

| Issue                                  | Fix                                                                          |
| -------------------------------------- | ---------------------------------------------------------------------------- |
| **🔧 Batch Import Data Inconsistency** | Fixed data loss/duplication during batch import                              |
| **🔧 Auto Number Race Condition**      | Used Redis atomic counter (INCR) for concurrent record creation ID conflicts |
| **🔧 Kanban Legacy Format**            | Support legacy text option format, auto-migrate to new format                |

#### UI/UX Fixes (4 items)

| Issue                               | Fix                                                                              |
| ----------------------------------- | -------------------------------------------------------------------------------- |
| **🔧 Link Record Drawer Data**      | Fixed empty link field data init in RecordDetailDrawer                           |
| **🔧 Memory Leak**                  | Fixed memory leak from event listeners not properly removed on component destroy |
| **🔧 Thumbnail Undefined Variable** | Fixed undefined AS variable in attachment thumbnail API causing 500 error        |
| **🔧 Runtime Error**                | Fixed startup NameError from missing module imports                              |

#### Backend Fixes (5 items)

| Issue                             | Fix                                                             |
| --------------------------------- | --------------------------------------------------------------- |
| **🔧 permission\_service Import** | Added missing db module import, fixed NameError                 |
| **🔧 Security Config**            | Fixed security middleware config load order                     |
| **🔧 Redis Connection Pool**      | Fixed Redis connection reuse preventing exhaustion              |
| **🔧 Build Script**               | Fixed cross-platform path separator issues                      |
| **🔧 .gitignore**                 | Updated ignore rules (exclude build artifacts, sensitive files) |

## v1.2.0 (2026-04-26)

### New Features & Improvements

#### 🔤 Major Field Type Upgrade (22 → 26 Types)

**⭐ Text Field Refactoring**

- **Single Line Text** - Dedicated short text input (titles, names, etc.)
- **Long Text** - New field type for multi-line paragraph input (descriptions, notes, content up to 10,000 chars)
- **Rich Text** - New field type with built-in rich text editor supporting bold/italic/lists/links/tables/code blocks, integrated with **DOMPurify XSS protection**

**⭐ DateTime Field**

- New combined date-time picker with **second-level precision**
- Customizable date format and time format (HH:mm:ss / HH:mm)
- Perfectly suited for project scheduling, meeting arrangements, release planning and other scenarios requiring precise time

**⭐ Auto Number Field**

- Highly flexible custom numbering rule engine
- Supports **prefix** (e.g., "TASK-", "ORDER-", "ISSUE-")
- Supports **suffix** (e.g., "-V1", "-CN")
- Supports **date prefix** (YYYYMMDD, YYYYMM, YY, YYMMDD and more formats)
- Supports **zero-padding** (4 digits → 0001, 6 digits → 000001)
- Supports custom starting number
- **Example output**: `TASK-202604260001`, `PO2026000001`, `EMP-00042`

**Member Select Component Enhancement ⭐**

- All-new user search and selection interface
- Supports **fuzzy search by username or email**
- Displays user **avatar and name**
- **Default value enhancement**: Supports "current user" as default value, auto-fills logged-in user when creating records

#### 📊 Smart Excel Import to Create Tables ⭐

Brand-new feature to create data tables directly from Excel files, significantly improving data migration efficiency:

**Intelligent Field Recognition Engine**:

- Automatically analyzes Excel column data characteristics to intelligently recommend the most suitable field type
- Supports recognition of **26 field types** (text/long text/rich text/number/date/datetime/single-select/multi-select/checkbox/email/phone/URL/auto-number etc.)
- Automatically identifies integers vs decimals and sets precision for numeric types
- Date format support: YYYY-MM-DD, MM/DD/YYYY, DD-MM-YYYY, Chinese dates and more
- Boolean values support: true/false, 是/否, Yes/No, 1/0, √/× and more representations (case-insensitive)

**Multi-select Option Intelligent Extraction**:

- Automatically detects comma/semicolon/pipe-separated multi-value data
- Separator priority: English comma `,` > Chinese comma `，` > Semicolon `;` > Pipe `|`
- Auto trim & deduplication, retains up to **20 unique options**
- Sorted by frequency in descending order, auto-assigned from 20-color preset palette
- Example: Cell `"Frontend, Backend, Frontend"` → Extracted options `["Frontend", "Backend"]`

**Smooth User Experience**:

- Three-step wizard: Upload → Configure → Create
- Real-time progress bar display (Create Structure → Import Data → Complete)
- Option to import data simultaneously (can create structure only)
- Adjustable field name, type, primary field settings
- Auto-opens newly created table after completion

#### 📚 Integrated API Documentation System ⭐

Integrated **Flasgger** (Swagger UI) providing complete interactive API documentation:

**Swagger UI Access URL**:

- Development environment: `http://localhost:5000/apidocs`

**Documentation Features**:

- Detailed documentation for all **90+ API endpoints**
- Supports online API testing (fill parameters → send request → view response)
- Auto-generated request/response JSON Schema
- Authentication support (fill in JWT Token to test authenticated APIs)
- Clear endpoint categorization (Auth/Base/Table/Field/Record/View/Dashboard/Attachment/Share/Import-Export/Email/Admin/Realtime)

#### 🎨 Unified Element Plus Icon System ⭐

Complete replacement of custom SVG icons with official Element Plus icon components:

**Icon Coverage**:

- Icons for all field types (26 dedicated icons per field type)
- View type icons (Table/Kanban/Calendar/Gantt/Gallery/Form)
- Toolbar button icons (Filter/Sort/Group/Import/Export/Refresh)
- Sidebar and navigation icons
- Operation button icons (Edit/Delete/Copy/Star etc.)

**Benefits**:

- ✅ Unified visual style and design language
- ✅ Better maintainability (no need to manually manage SVG files)
- ✅ Automatic theme adaptation (icon colors adapt when switching dark mode)
- ✅ Tree-shaking friendly (on-demand loading, reduced bundle size)
- ✅ Supports all Element Plus icon properties (size, color, spin, etc.)

#### 📈 Dashboard Template System ⭐

One-click dashboard configuration reuse functionality:

**Create from Template**:

- Browse **template library** (system preset industry templates)
- Preview template effects (view field configurations)
- One-click apply to new dashboards
- System includes multiple industry templates (Project Management, Sales Analytics, Operations Monitoring, etc.)

#### 🐝 Backend File Upload & Object Storage ⭐

Complete backend file upload pipeline and access proxy:

**Local File Storage Support**:

- Optional MinIO integration as file object storage (replacing local filesystem) *(To be improved)*
- Auto-create directory structure

**Image Thumbnail Generation**:

- Auto-generates **3 sizes** of thumbnails on image upload (Small/Medium/Large)
- Efficient processing using Pillow library, supports JPG/PNG/GIF/WebP formats
- Thumbnails used for: Attachment field preview, Gallery view cover, inline table preview

**Security Validation Enhancement**:

- Server-side MIME type re-validation (prevents extension spoofing attacks)
- Magic Number verification (file header byte validation)
- File size limit (single file default 10MB, configurable)
- File count limit (0-100 per field)

#### 🔄 Real-time Collaboration Deep Optimization ⭐

**WebSocket Connection Stability**:

- Refactored connection establishment and reconnection logic, significantly reducing disconnection rate
- Exponential backoff reconnection strategy (1s → 5s → 30s → 2min, max 5 attempts)
- Heartbeat keepalive mechanism (Ping/Pong, 60s timeout auto-disconnect)
- Real-time connection status indication (AppHeader area global display)

**Debug Logging Enhancement**:

- Detailed WebSocket event logging output in development mode
- Records sender, receiver, payload summary for each event
- Connection/disconnection/error log levels (INFO/WARN/ERROR)
- Facilitates quick troubleshooting of collaboration issues

**User Experience Improvements**:

- Collaboration components moved from Base page to **AppHeader global display** ⭐
- Online collaborator status visible on any page
- User name field support (displays real name instead of username)
- Cell lock indication more prominent (background color + editor avatar + name)

**Authentication Security Strengthening**:

- Mandatory JWT Token verification on WebSocket connection
- Auto-disconnect and require re-login when Token expires
- Prevents unauthorized WebSocket connection hijacking

#### 📧 Email System Production Ready ⭐

**SMTP Integration Completion**:

- Supports major email service providers (Gmail, Outlook, QQ Mail, Enterprise mail, etc.)
- TLS/SSL encrypted transmission
- Supports ports 25/465/587
- Connection pool management (reuse connections for better performance)

**Email Template Visual Editing**:

- Built-in **5 email templates**:
  - welcome (Welcome registration)
  - email\_verification (Email verification)
  - password\_reset (Password reset)
  - invitation (Member invitation)
  - share\_notification (Share notification)
- WYSIWYG HTML editor
- Supports variable interpolation ({{username}}, {{verification\_url}}, etc. - 12 variables)
- Real-time preview rendering effect

**Async Email Queue**:

- Task queue based on Redis or memory
- Worker process concurrent sending (configurable 1-8 workers)
- Auto-retry on failure (exponential backoff: 1min → 5min → 30min → 2h, max 5 attempts)
- Final failure marking + error reason recording
- Sending rate limiting (prevents triggering email provider anti-spam policies)

**Admin Panel**:

- SMTP configuration interface (server/port/encryption/authentication)
- One-click test send (verify configuration correctness)
- Email template CRUD management
- Email log query (filter by time/status/template/recipient)
- **Email Statistics Dashboard**:
  - Today/This week/This month total sending volume trend chart
  - Send success rate pie chart
  - Most used templates Top 5
  - Sending peak hours heatmap
  - Failed email list (for troubleshooting)

#### 🎨 UI/UX Comprehensive Improvements

**Collaboration Components Globalization** ⭐:

- OnlineUsers, CellEditingIndicator, ConnectionStatusBar moved from Base page to AppHeader
- Collaboration status visible on all pages, no longer limited to Base internals
- Unified operation entry point and visual style

**Base Page Layout Optimization**:

- Statistical information (table count, total records, etc.) moved from top to bottom
- More compact card style
- Operation buttons grouped more reasonably (primary operations highlighted)

**Table View Operation Enhancement**:

- New standalone "Add Record" button (prominent position in toolbar)
- Operation button grouping: Primary operations (Add/Import/Export) + Secondary operations (Field/Filter/Sort/Group)
- Batch operation feedback (displays result statistics)

**Sidebar Experience Enhancement**:

- All buttons added **Tooltip hint text** (mouse hover shows function description)
- Data table and dashboard list unified visual style
- Drag handle (⋮⋮) more obvious and easy to identify
- Collapse/expand animation smoother

**Unified Field Icons**:

- All 26 field types use Element Plus icons
- Icon colors semantically associated with field type (e.g., date uses calendar icon, member uses avatar icon)
- Consistent grayed-out style for disabled state icons

**Record Operation Flow Optimization** ⭐:

- RecordDetailDrawer (Record Detail Drawer): Clicking "Save" **auto-closes drawer**, improving operational continuity
- RecordHistoryDrawer (Change History Drawer): Fixed abnormal close behavior
- Table View: **Force refresh list** after creating record, completely resolving duplicate addition issue
- Delete confirmation dialog: Added clearer warning text

#### 📥 Import/Export Compatibility Enhancement

**Field Type Mapping Optimization**:

- More accurate identification and conversion of field types during import (reduces manual modification)
- Preserves original format during export (Excel formulas, date formats, number formats)
- More robust special character handling (newlines, quotes, commas) escaping

**Big Data Support**:

- Optimized memory usage (streaming read, avoids loading entire file at once)
- Supports ten-thousand level record import/export (tested 50k rows Excel < 30s)
- Progress bar real-time update (refreshes every 100 rows)

**Error Recovery**:

- Provides detailed row-level error report on import failure (row number + error reason + original value)
- Supports skipping error rows to continue import (instead of overall failure)
- Resume from breakpoint possible on import interruption (records processed row number)

**Encoding Handling**:

- Auto-detects file encoding (UTF-8 / UTF-8-BOM / GBK / GB18030 / ASCII)
- Unified use of UTF-8 with BOM on export (best Excel compatibility)
- Chinese filename support (RFC 5987 encoding)

**Excel Import Progress Display** ⭐

- Create table stage: Shows "Parsing file...", "Identifying fields..."
- Import data stage: Percentage progress bar + current row/total rows + elapsed time
- Completion stage: Shows success/failure statistics + elapsed time

### Bug Fixes

#### Core Feature Fixes

- **🔧 RecordDetailDrawer Auto-close** - Drawer no longer stays open after saving record, auto-closes and returns to list view
- **🔧 RecordHistoryDrawer Close Issue** - Fixed unresponsive close button, ESC key unable to close issue
- **🔧 Table View Duplicate Records** - Completely resolved issue of two identical records appearing after creation (force refresh + deduplication logic)
- **🔧 AppHeader State Sync** - Fixed out-of-sync information for table/dashboard star status, title, etc.
- **🔧 View Switch Data Loss** - Fixed occasional data clearing when rapidly switching views

#### Import/Export Fixes

- **🔧 Inaccurate Field Type Detection** - Optimized Excel column type inference algorithm, reduced misjudgment (especially boundary cases between number vs text, date vs text)
- **🔧 Multi-select Options Missing** - Fixed issue where some multi-select options were not extracted during import (enhanced separator detection)
- **🔧 Import Progress Lagging** - Optimized UI update frequency for large data imports (changed from per-row to every 100 rows)
- **🔧 Export File Garbled** - Fixed garbled Chinese filenames and content in certain browsers (forced UTF-8 BOM)
- **🔧 CSV Export Quote Handling** - Fixed CSV format corruption when field values contain commas/newlines/quotes

#### Collaboration Fixes

- **🔧 Offline Queue Overflow** - Fixed queue crash when offline operations exceeded 100 (auto-cleanup of oldest records)
- **🔧 Conflict Dialog Persistence** - Fixed dialog remaining after clicking "Discard" or "Overwrite"
- **🔧 Cell Lock Deadlock** - Fixed permanent lock after user unexpected disconnect (30s timeout auto-release)
- **🔧 View Sync Latency** - Optimized push delay when other users switch views (<100ms)

#### UI/UX Fixes

- **🔧 Sidebar Tooltip Not Showing** - Fixed missing hover hints on some buttons (z-index layer correction)
- **🔧 Field Drag-sort Jumping** - Fixed sudden position jump when dragging fields (position calculation algorithm optimization)
- **🔧 Group Collapse State Loss** - Fixed group expand/collapse state reset after page refresh (persisted to localStorage)
- **🔧 Form Submit Button Style** - Fixed invisible submit button under certain themes (z-index + color fix)

## v1.1.0 (2026-04-18)

### New Features & Improvements

#### 🚀 Real-time Collaboration

- **WebSocket Real-time Sync** - Real-time data synchronization based on WebSocket, supporting multi-user simultaneous editing
- **Collaboration Status Display** - Shows information about users currently editing
- **User Name Field** - Support for displaying collaborator's real names

#### 📧 Email Service System

- **Complete Email Module** - Fully implemented email service functionality
- **Email Queue Service** - Asynchronous email sending for improved system responsiveness
- **Password Recovery** - Password reset via email
- **Change Password** - Users can change password in settings

#### 🔒 Security Enhancements

- **XSS Protection** - HTML sanitization using DOMPurify to prevent XSS attacks
- **Security Headers** - Added X-Content-Type-Options, X-Frame-Options, X-XSS-Protection security headers
- **API Rate Limiting** - Prevent brute force attacks and malicious requests, returns 429 status code when exceeded
- **File Upload Security** - Enhanced Magic Number and MIME Type validation, removed SVG and other high-risk file types
- **Exception Information Security** - Unified exception handling to prevent internal error information leakage
- **Production Log Security** - Automatic removal of console.log in production to prevent sensitive information leakage

#### 🎨 UI/UX Improvements

- **Sidebar Hover Menu** - Floating secondary menu in collapsed state
- **Base Duplication** - One-click base duplication
- **CAPTCHA Feature** - Added CAPTCHA verification for login and registration
- **Rating Field** - New rating field type support
- **Date Formatting** - Date field values support formatted display

#### 🐳 Deployment Support

- **Docker Deployment** - Complete Docker deployment configuration and documentation
- **Remote Access** - Development server supports remote access

#### 🔧 Improvements
- Optimized record detail drawer bottom button layout
- Optimized template synchronization process
- Optimized error handling mechanism
- Improved cascade deletion logic for base data

### Bug Fixes

- Fixed dashboard configuration page refresh error
- Fixed frontend memory leak issues (multiple component event listeners not cleaned up)
- Fixed password reset route validation bypass issue
- Fixed incorrect HTTP method for unstar API
- Fixed SQLAlchemy config change detection issue
- Fixed timezone issues, unified UTC time usage
- Fixed frontend security vulnerabilities
- Fixed form validation error handling and reset logic

## v1.0.0 (2026-04-13)

### New Features & Improvements

#### Core Features

- **Multi-dimensional Table Management** - Create and manage multiple data tables with custom field types
- **Multiple Field Types** - Support for 15+ field types including text, number, date, single select, multi-select, attachment, link, rating, progress, and more
- **Data Views** - Support for grid view, kanban view, form view, and other data presentation methods
- **Data Relationships** - Support for relationships between tables, enabling data linkage

#### Form Sharing Features

- **Public Form Sharing** - Share table data as forms for external users to fill out
- **Anonymous Submission Support** - Support for data submission without login
- **CAPTCHA Protection** - Form sharing supports CAPTCHA verification to prevent malicious submissions
- **Custom Configuration** - Configurable sharing expiration, submission limits, and more

#### User & Permissions

- **User Authentication** - Support for email registration, login, and password modification
- **JWT Tokens** - Secure authentication mechanism based on JWT
- **Permission Control** - Fine-grained data access permission control

#### Security Features

- **CAPTCHA Mechanism** - Login, registration, and form submission all support CAPTCHA verification
- **Rate Limiting** - Prevent brute force attacks and malicious requests
- **Password Security** - Passwords encrypted using bcrypt
- **SQL Injection Protection** - Use ORM to prevent SQL injection attacks
- **XSS Protection** - Input validation and output escaping to prevent XSS attacks

### Bug Fixes

#### 🐛 Known Issues
- None
