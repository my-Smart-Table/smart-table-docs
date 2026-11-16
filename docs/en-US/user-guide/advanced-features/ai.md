---
title: AI Capabilities
---

# AI Capabilities

SmartTable ships with a full set of AI capabilities: the AI assistant for conversational Q&A, semantic table search (RAG), AI fields for bulk content generation, workflow AI nodes, dashboard smart insights and document AI — together with complete administrator configuration and usage governance.

> AI capabilities are a feature of the **Professional Edition**.

## Feature Overview

| Module | Description | Main users | Entry |
|---|---|---|---|
| AI model configuration | Connect LLM providers, configure keys and purposes | Administrators | System Management → AI → AI Model Configuration |
| Feature-domain switches | Enable/disable AI capabilities per domain | Administrators | System Settings → AI → Feature-domain Switches |
| AI usage dashboard | Usage statistics / call logs / quota policies | Administrators | System Management → AI → AI Usage Dashboard |
| AI assistant | Conversational table Q&A, statistics, write operations | All Base members | AI button at the top of the Base page |
| Table data Q&A (RAG) | Semantic retrieval over large tables | Base members | Inside the AI assistant (with index management entry) |
| AI fields | Generate cell contents per prompt | Editors and above | Field type "AI" |
| Workflow AI nodes | Invoke LLMs in automations | Flow editors | Workflow editor → add AI node |
| Dashboard smart insights | Chart interpretation / anomaly detection / chart suggestions | Base members | Chart action "AI Interpret" on dashboards |
| Document AI | Summarize / continue / rewrite / translate | Document editors | "AI Assistant" in the document editor toolbar |
| AI task center | Bulk task progress | Task creators | System Management → AI → AI Task Center |

## Administrator Configuration (Prerequisites)

### Configure AI Models

**Path**: System Management → AI → AI Model Configuration.

1. Click "Add Model"; choose a **preset** to auto-fill the Base URL, default model and parameters (built-in presets: DeepSeek / Tongyi Qianwen / Zhipu GLM / Kimi / MiniMax / Doubao Seed / Tencent Hunyuan / OpenAI / Ollama) — usually only the API Key is required
2. Key fields: **Base URL** (full API root including `/v1`), **API Key** (stored encrypted), **model name**, **purpose** (bulk tasks / AI assistant / embedding / image understanding; multiple models per purpose allowed), **priority** (lower value = higher priority; automatic failover when the primary model fails), temperature / max tokens
3. After saving, click **Test Connection**; the system probes model capabilities (tool calling / JSON mode / streaming usage / reasoning)
4. Set the model as default and enable it

> The AI assistant requires a model with **tool calling**; RAG requires an **embedding** model; image understanding requires a **vision** model.

### Feature-domain Switches & Quotas

- **Feature-domain switches**: System Settings → AI; six domains toggled independently (AI fields / AI assistant / workflow AI nodes / RAG / dashboard insights / document AI), enforced by the backend
- **Quota policies**: AI Usage Dashboard → Quota Policies; set daily / monthly call and token limits (0 = unlimited). When the budget alert threshold (%) is reached the task center shows an alert; once a limit is hit, AI calls are suspended

## AI Assistant

Click the **AI button** at the top of a Base page to open the right-side drawer panel.

- **Interface**: a welcome page with four scenario cards (data query / statistics / field structure / content generation); the conversation supports full Markdown replies; quick-command pills, attachment button, history and new-conversation buttons
- **Data queries**: e.g. "Show records whose status is overdue" or "Find records with a deadline after 2026-10-01"; results are shown as cards; Chinese dates and multiple date formats are supported
- **Name semantics**: use **option names** for single/multi-select and **user names** for member fields — the system maps them to stored ids automatically
- **Write operations** (editors and above): the assistant can create / update records; **bulk updates** are dangerous operations — the assistant first shows a **confirmation card** (affected record count + preview of the first 20 changes) and executes only after confirmation; Viewers have no write capability
- **Attachment understanding**: images (parsed by a vision model) and text files are supported
- **History**: search, switch, rename and delete conversations; synchronized with the server
- **Sensitive field protection**: values of fields marked `ai_excluded` never appear in assistant context, query results or the RAG index

## Table Data Q&A (RAG)

Prerequisites for semantic retrieval on large tables (≥500 rows): an **embedding model is configured** and **the table has an index**.

- **Index management** (top-right of the AI assistant panel, editors and above): view index status (not indexed / indexing / ready / failed), rebuild (background batching), clear (with confirmation); sensitive fields are excluded from indexes by default
- **Automatic incremental updates**: record changes update indexes automatically (indexed tables only)
- **Small-table fallback**: tables with fewer than 500 rows fall back to direct sampling and need no index

## AI Fields

Drive LLM generation of cell contents per record via prompts.

**Create**: click "+" in the field area → choose type **AI** → configure the prompt template (reference other fields via `{FieldName}`), output type (text / number / single-select / multi-select); built-in prompt templates can be applied with one click.

**Single generation**: right-click a record row → AI Generate; content streams in typewriter style and can be stopped; overwriting existing values requires confirmation. Prerequisites: the table already has an AI field + the user has edit permission.

**Bulk fill**: select ≥2 records → right-click → AI Fill (N rows) → choose the field, confirm the estimated consumption (~1 call per record) → start; a single task is capped at 1000 records and can be cancelled while running (completed parts are kept).

**AI Task Center** (System Management → AI): view status and progress of bulk tasks (WebSocket live refresh), retry failed items one by one, cancel running tasks, and see budget alert banners. Only bulk fills create tasks; single generations are tracked in the usage dashboard call logs.

## Workflow AI Nodes

Add an **AI node** in the workflow editor: configure system prompt / prompt (upstream variables supported), JSON mode (structured output); **test runs** are supported (no flow instances created); failure feedback is explicit (no available model 503, quota exceeded 429, generation failed 502).

## Dashboard Insights & Document AI

- **Dashboards**: click "AI Interpret" on a chart — chart interpretation (trends and highlights), anomaly detection, chart suggestions (one-click apply)
- **Document AI**: the "AI Assistant" in the document editor toolbar — summarize / continue / rewrite / translate; scope is the selection or the full text; results can replace (full-text replacement is recoverable via version history), insert or be discarded

## AI Usage Dashboard (Administrators)

System Management → AI → AI Usage Dashboard:

- **Usage statistics**: calls, errors, tokens and average latency over the last 7 / 30 / 90 days / year; daily trends with breakdowns by user / table / model / domain
- **Call logs**: per-call records filterable by domain and status, with input/output summaries (sensitive data masked)
- **Quota policies**: daily / monthly limits and budget alerts

## Permissions & Security

| Mechanism | Description |
|---|---|
| Feature switches | System-level per-domain toggles, enforced by the backend |
| Model-level RBAC | Tools distributed by role: viewers get no write tools; writes are re-authorized by the backend |
| Confirmation flow | Bulk updates require manual confirmation (confirmation card + one-time token, tamper-proof / replay-proof / time-limited) |
| Sensitive fields | `ai_excluded` values never appear in prompts / tool results / RAG indexes |
| Write audit | Assistant writes are traced in record history (trigger attributed to the current user); all calls are logged |
| Output sanitization | Assistant Markdown replies are sanitized with DOMPurify before rendering |

## FAQ

- **Test connection fails (Connection error / 401)**: check that the Base URL includes `/v1`, the API Key is valid and the network reaches the provider
- **AI assistant button missing**: confirm the "AI assistant" domain switch is on and the user has Base membership
- **Empty query results**: use option names / user names in conditions (not ids); multiple date formats are supported; narrow conditions step by step
- **Quota exceeded**: administrators adjust quota policies or wait for the daily / monthly reset
- **RAG finds nothing**: confirm the index status is "ready", wait for incremental indexing of new records, and check excluded fields
- **No "AI Generate / AI Fill" in the context menu**: check in order whether the table has an AI field, whether you have edit permission, and the number of selected rows (0/1 rows show "AI Generate", ≥2 rows show "AI Fill")
- **Bulk task failed**: check the failure count in the task center; common causes: no available model for bulk tasks, exhausted quota, prompts referencing deleted fields
