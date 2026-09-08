# SmartTable Plugin Developer Guide

This guide is for third-party developers: how to build, package, debug and publish plugins on top of the SmartTable plugin system. Before reading, it is recommended to review the "Manifest Specification", "Permission Model" and "Communication Interfaces" sections of the [Plugin Architecture](./architecture.html).

---

## 1. Plugin Types at a Glance

| Type | `manifest.type` | Runs in | Communication | Typical scenarios |
| ---- | --------------- | ------- | ------------- | ----------------- |
| Frontend UI plugin | `ui` | Browser iframe (`sandbox="allow-scripts"`, opaque origin) | postMessage JSON-RPC (handshake token auth) | Toolbar buttons, side panels, custom interactions |
| Backend script plugin | `script` | Controlled subprocess (restricted builtins + import allowlist) | stdio protocol frames, host proxies table APIs | Batch data processing, manual/scheduled automation |

Both types share the same manifest, lifecycle, permission and configuration mechanisms. Inter-plugin dependencies are not supported in the first release; only host version compatibility declarations (`engines`) are supported.

---

## 2. Manifest (manifest.json)

The package root must contain `manifest.json`. Core fields:

| Field | Type | Description |
| ----- | ---- | ----------- |
| `id` | string | Globally unique plugin ID, reverse-domain recommended (e.g. `com.yourorg.demo`) |
| `name` | string | Display name |
| `description` | string | Short description |
| `author` | object | `{ name?, url?, email? }` |
| `version` | string | SemVer, e.g. `1.0.0`; upgrades must be higher than the installed version |
| `type` | `"ui" \| "script"` | Plugin type |
| `apiVersion` | string | SDK protocol version, currently `"1"` |
| `engines.smarttable` | string | Host version compatibility range, e.g. `">=1.7.0 <2.0.0"` |
| `entry` | string | Entry file name (JS for UI, py for script) |
| `permissions` | object | Permission declaration (see §3) |
| `extensionPoints` | array | UI extension point declarations (UI plugins only) |
| `configSchema` | object | Configuration JSON Schema (optional) |
| `script.timeout` | number | Script timeout in seconds (optional, max 300) |

### 2.1 Object-based Graded Permissions

```json
"permissions": {
  "records": "read" | "write",   // record read/write
  "tables":  "read" | "write",   // schema read/write
  "storage": true,               // plugin-owned KV (localStorage)
  "network": ["api.example.com"] // allowed outbound domains (reserved)
}
```

Undeclared permission points are rejected by the host (deny by default). The object-based structure leaves room for finer-grained permissions (table/field scoping) in the future.

### 2.2 UI Extension Points

```json
"extensionPoints": [
  {
    "type": "toolbar-button",
    "title": "Batch Fill",
    "icon": "Star",
    "requiresSelection": true,
    "maxSelection": 500
  },
  { "type": "side-panel", "title": "Fill Panel", "requiresSelection": true }
]
```

Supported types: `toolbar-button` (toolbar button), `side-panel` (iframe inside the right drawer), `base-menu` (Base-level menu), `record-detail-block` (block at the bottom of the record detail drawer). Plugins register declaratively through the manifest; the host mounts them automatically once enabled — no host code changes required.

**Optional selection dependency declarations** (apply to that extension point entry):

| Field | Type | Description |
| ----- | ---- | ----------- |
| `requiresSelection` | boolean | When `true`, the host disables the entry and hints "select records first" if nothing is selected |
| `maxSelection` | number(1-1000) | Maximum number of selected records allowed; the host disables the entry and shows a hint when exceeded |

Selection data is passed to the plugin via `ui.getContext()` / `selection.get()` — see §3.3.

---

## 3. Frontend UI Plugin Development

### 3.1 Sandbox and SDK

UI plugins run in an iframe loaded from a same-origin URL but with `sandbox="allow-scripts"` (without `allow-same-origin`), giving the plugin an **opaque origin** (`event.origin === "null"`). It therefore cannot access host cookies, localStorage or the DOM.

The host serves a loader HTML (with the mount point `<div id="app">`) and injects two globals:

- `window.SmartTableSDK`: the plugin SDK
  - `SmartTableSDK.ready(cb)`: called after handshake; receives `sdk`
  - `sdk.request(method, params)`: performs an RPC call, returns a `Promise`
  - `sdk.request("ui.getContext")` → `{ pluginId, baseId, tableId, selection }` (`selection` is the table selection snapshot taken when the plugin was opened — see §3.3)
  - `sdk.request("selection.get")` → get the selection snapshot alone (same source as `ui.getContext().selection`)
- `window.Vue`: Vue 3 global build (`vue.global.prod.js`, **includes the template compiler**), injected by the host from the same-origin `vendor/` directory

> Writing plugin UI with **Vue template syntax** is recommended (`Vue.createApp({ template: \`...\` })`), supporting `v-model`, `v-for`, `@click`, `:disabled` and reactive data with no build toolchain. Rendering the mount point with plain HTML/JS is also allowed.
> The Vue runtime is hosted same-origin by the host (no external CDN, works offline); the production CSP already includes `'unsafe-eval'` (required by the template compiler).

### 3.2 Available Methods (bound by `permissions`)

| Method | Required permission | Description |
| ------ | ------------------- | ----------- |
| `ui.getContext()` | — | Current context (including the `selection` snapshot) |
| `selection.get()` | — | Table selection snapshot taken when the plugin was opened |
| `ui.notify({ message, type })` | — | Show a toast |
| `config.get()` | — (implicitly granted) | Effective config (base merged over global) |
| `storage.get/set/remove({ key, value })` | `storage` | Plugin-owned KV |
| `table.getSchema({ tableId })` | `tables:read` | Table schema + fields |
| `table.listTables()` | `tables:read` | Tables of the current Base |
| `table.getRecords({ tableId, page, per_page, search })` | `records:read` | Paginated records |
| `table.getRecord({ recordId })` | `records:read` | Single record |
| `record.create({ tableId, values })` | `records:write` | Create record |
| `record.update({ recordId, values })` | `records:write` | Update record |
| `record.delete({ recordId })` | `records:write` | Delete record |

> Data requests are forwarded by the host to existing REST APIs using the **current user's JWT identity**; plugins never hold credentials. Unauthorized calls return `{ code: "PERMISSION_DENIED" }`.

### 3.3 Table Selection Data (selection)

The host generates a selection snapshot **at the moment the plugin is opened** and injects it into the RPC context. The plugin reads it via `ui.getContext()` or `selection.get()`:

```ts
type SelectionSnapshot = {
  recordIds: string[];     // selected record IDs (truncated above the cap)
  total: number;           // total selected (real total even when truncated)
  truncated: boolean;      // whether it was truncated by the cap
  selectAll: boolean;      // whether "select all" was used
  scope: "page" | "view";  // selection scope: current page / current view result
  at: number;              // snapshot timestamp (ms)
};
```

Conventions and boundaries:

- **IDs only**: the snapshot contains no record content; fetch details on demand with `table.getRecord({ recordId })` to avoid pushing bulk data into the sandbox context;
- **Snapshot on open**: selection changes are **not pushed** in real time — reopen the plugin to get the latest selection (simple, predictable semantics; avoids coupling sandbox and table state);
- **Cap protection**: at most **1000** IDs per snapshot; beyond that `truncated = true` (`total` remains the real total) and the plugin should tell the user to narrow the selection;
- **Select-all semantics**: header select-all maps to all row IDs of the current view/page, with `selectAll = true`;
- **Integrity**: stale IDs are cleaned after refresh/delete; the host clears the selection when switching tables to avoid cross-table leakage.

Typical flow:

```js
SDK.ready(async function (sdk) {
  var ctx = await sdk.request("ui.getContext", {});      // or sdk.request("selection.get")
  var ids = (ctx.selection && ctx.selection.recordIds) || [];
  if (!ids.length) {
    await sdk.request("ui.notify", { message: "Please select records first", type: "warning" });
    return;
  }
  for (var i = 0; i < ids.length; i++) {
    var rec = await sdk.request("table.getRecord", { recordId: ids[i] });
    await sdk.request("record.update", {
      recordId: ids[i],
      values: { fld_xxx: "new value" },
    });
  }
  await sdk.request("ui.notify", { message: "Done", type: "success" });
});
```

**Framework / component library compatibility**: the SDK only depends on `window.SmartTableSDK` (postMessage + Promise) and is independent of the framework used inside the plugin — Vue, React or vanilla JS all work the same way. On the host side, different table implementations are adapted through a pluggable `SelectionProvider` interface (VTable is integrated today; the native table can adopt the same interface later), so plugins never need to know which table component is in use.

### 3.4 Minimal Example (Zero-build IIFE)

No build toolchain is needed — a single JS file is enough. Using the host-injected Vue with templates is recommended:

```js
(function () {
  "use strict";
  var SDK = window.SmartTableSDK;
  var Vue = window.Vue;

  Vue.createApp({
    // Standard Vue template: v-model / v-for / @click / :disabled all work
    template: `
      <div class="my-plugin">
        <select v-model="fieldId">
          <option v-for="f in fields" :key="f.id" :value="f.id">{{ f.name }}</option>
        </select>
        <input v-model="keyword" placeholder="Search value" />
        <button :disabled="loading" @click="search">Search</button>
        <p v-if="!records.length">No records</p>
        <div v-for="r in records" :key="r.id">{{ r.id }}</div>
      </div>
    `,
    data() {
      return { fields: [], records: [], fieldId: "", keyword: "", loading: false };
    },
    methods: {
      async search() {
        this.loading = true;
        try {
          var ctx = await SDK.request("ui.getContext", {});
          var schema = await SDK.request("table.getSchema", { tableId: ctx.tableId });
          this.fields = (schema && schema.fields) || [];
          var res = await SDK.request("table.getRecords", {
            tableId: ctx.tableId,
            search: this.keyword,
            per_page: 20,
          });
          this.records = (res && res.items) || [];
          await SDK.request("ui.notify", { message: "Loaded " + this.records.length + " records", type: "success" });
        } finally {
          this.loading = false;
        }
      },
    },
    mounted() {
      this.search();
    },
  }).mount("#app");
})();
```

Notes:

- The mount point is the loader-provided `<div id="app">`; do not wipe `document.body` yourself;
- Styles can be injected with a `<style>` tag from the script (there is no SFC style block in zero-build mode), or use inline `style`;
- If you don't use Vue, you can render into `#app` yourself — SDK capabilities are independent of the template approach;
- When `window.Vue` is missing, show a clear message (the host loader injects the vendor runtime).

A complete runnable example is in `examples/plugins/hello-panel/` (`manifest.json` + `main.js`): a toolbar button + side panel rendered with Vue templates that reads the selected records and batch-fills a field.

### 3.5 Debugging

1. An admin uploads the `.stplugin.zip` on the "Plugin Management" page to install it;
2. Enable the plugin inside the target Base;
3. Open a table and click the toolbar button to open the panel;
4. In DevTools Console you only see the host-injected `SmartTableSDK` and the plugin's own logs (iframe isolation — host context is unreachable).

---

## 4. Backend Script Plugin Development

### 4.1 Sandbox and Injected Objects

Scripts run in a restricted subprocess: only allowlisted modules (`json/re/math/datetime/...`), with no network, filesystem or system access. Every data operation goes through **stdio protocol frames**, executed and authorized by the host as the **triggering user**.

The host injects:

- `base`: restricted proxy object (methods below)
- `context`: `{ plugin_id, base_id, table_id? }`
- `config`: effective configuration of the current Base (validated by `configSchema`)
- `set_result(v)` / `result`: set the final result

> **Business failure convention**: if the script finishes normally but its result dict contains a non-empty `error` field, the host marks the run as `failed` (error summary taken from that `error` value). To report failure, prefer `set_result({"error": "reason"})` or raise an exception (which includes a traceback).

### 4.2 `base` Proxy Methods (bound by `permissions`)

| Method | Required permission | Returns |
| ------ | ------------------- | ------- |
| `base.list_tables()` | `tables:read` | `[{id, name, description}]` |
| `base.get_fields(table_id)` | `tables:read` | `[{id, name, type}]` |
| `base.list_records(table_id, page, per_page)` | `records:read` | `{items:[{id, values}], total}` |
| `base.get_record(record_id)` | `records:read` | `{id, values}` |
| `base.create_record(table_id, values)` | `records:write` | `{id}` |
| `base.update_record(record_id, values)` | `records:write` | `{id}` |
| `base.delete_record(record_id)` | `records:write` | `{deleted:true}` |
| `base.get_config()` | — (implicitly granted) | dict |
| `base.log(message)` | — | written to run logs |

### 4.3 Minimal Example

```python
table_id = config.get("tableId")
field_id = config.get("fieldId")
resp = base.list_records(table_id, page=1, per_page=100)
for rec in resp["items"]:
    values = rec.get("values") or {}
    if not values.get(field_id):
        base.update_record(rec["id"], {field_id: "default value"})
base.log("Batch fill done")
set_result({"updated": len(resp["items"])})
```

A complete example is in `examples/plugins/batch-clean/` (`manifest.json` + `main.py`): batch-fills empty values of a given field.

### 4.4 Security Boundaries

Restricted builtins plus module allowlisting are "controlled execution", not a strong sandbox — escape surfaces exist. In production, run the subprocess as a **low-privilege OS user**. The default timeout is 30s (declared via `script.timeout`, max 300s); after N consecutive failures the host automatically sets the plugin to `error` and suggests disabling it.

Script runs can be triggered manually by a Base admin via the "Run" button on the plugin management page (as the triggering user); runs are recorded as `run_logs`.

---

## 5. Packaging and Installation

1. Directory layout (package root is the extraction root):

   ```
   your-plugin/
   ├── manifest.json
   └── main.js        # or main.py
   # optional static assets (UI plugins)
   ```

2. Compress to `.stplugin.zip` (paths must not contain traversal segments such as `../`; the host validates this):

   ```bash
   cd your-plugin && zip -r ../your-plugin.stplugin.zip .
   ```

3. An admin opens the "Plugin Management" page → "Upload Package" → selects the zip. The system validates:
   - manifest schema validity (fields, version, type, engines)
   - entry file exists (the file referenced by `entry` is inside the package)
   - semver and host `engines` compatibility
   - zip path-traversal protection

4. **Installation and enabling (all done on the "Plugin Management" page; Base pages provide no install/management UI)**:
   - **Global enable/disable**: the enable/disable button on the plugin card (global switch).
   - **Base-level install/enable/remove**: the **Base Installation** block on the card (**UI plugins only**) — first pick the target Base in the filter area, then "Install to Base" and enable it.
   - A UI plugin appears in a Base page (toolbar button / side panel) only when it is **globally enabled and installed+enabled in that Base**.
   - **Script plugins need no (and have no) Base installation step**: running is governed by the triggering user's RBAC on that Base (Editor+) plus the global status; `installations` is not part of the script path.
   - **Base-level configuration** (e.g. base/table bindings for a UI plugin): Plugin Management page → **Config** dialog → "Current Base Configuration" tab → select the target Base and fill in. Users simply open the plugin in the Base page and it uses the effective configuration — no install/config work required.

### 5.1 Upgrade and Rollback

- Uploading a higher `version` with the same `id` is an upgrade: configuration and Base installation relations are preserved, and old version directories are kept for rollback.
- Use "Rollback" on the plugin management page to switch back to a retained historical version.

---

## 6. Configuration (configSchema)

A plugin may declare `configSchema` (JSON Schema). Configuration has two scopes:

- **global**: system-level defaults (maintained by system admins)
- **base**: Base overrides (maintained per Base in the **Config** dialog of the plugin management page; Base admins may also maintain it via the REST API)

Endpoints: `GET/PUT /api/plugins/<id>/config` (differentiated by the `scope` parameter). At runtime `config.get()` returns the effective configuration with **base deep-merged over global**. Writes are validated against `configSchema` and rejected when invalid.

---

## 7. REST Management APIs (Host Side)

Plugin management APIs are prefixed with `/api/plugins` and driven by the plugin manifest. Key endpoints:

| Method | Path | Permission |
| ------ | ---- | ---------- |
| POST | `/upload` | System admin |
| GET | `/` (`?base_id=`) | List (with Base-level status) |
| GET | `/<plugin_id>` | Detail (with version history) |
| PUT | `/<plugin_id>/status` | System admin (enable/disable/restore) |
| POST | `/<plugin_id>/rollback` | System admin |
| DELETE | `/<plugin_id>` | System admin (uninstall) |
| GET/PUT | `/<plugin_id>/config` | By scope |
| POST | `/<plugin_id>/installations` | Base admin (install and enable; UI plugins only, 400 for script plugins) |
| PUT/DELETE | `/<plugin_id>/installations` | Base admin (enable/disable/remove; PUT is UI-only) |
| POST | `/<plugin_id>/run` | Triggering user (script) |
| GET | `/<plugin_id>/run-logs` | Base admin |
| POST | `/<plugin_id>/sandbox-url` | UI sandbox signed URL |
| GET | `/<plugin_id>/versions/<version>/loader.html` | Sandbox loader (signature auth) |

---

## 8. FAQ

- **Plugin button not visible?** Check that the plugin is globally `enabled` and `enabled` in the Base, that `extensionPoints` declares `toolbar-button`, and that the manifest `type` is `ui`.
- **RPC returns PERMISSION_DENIED?** The method's required permission is not declared in `permissions`, or the current user lacks the matching RBAC permission on the target Base.
- **Script run reports a permission error?** Make sure `permissions.records` is `write` (for write methods) and the triggering user has write access to the target table.
- **Can't read host globals from the iframe?** That is by design (opaque origin sandbox); all capabilities must go through `SmartTableSDK.request` RPC.
