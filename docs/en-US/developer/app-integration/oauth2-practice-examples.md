# Third-Party Application Integration Examples

This document demonstrates how a third-party application integrates with the SmartTable Open API via the **OAuth2 Client Credentials** grant to pull all records of a specified Base/Table. It provides two complete implementation samples in **Python** and **Java**.

> Prerequisite reading: [OAuth2 Integration Doc](./oauth2-integration.md) (token endpoint, scope and token management), [Open API Doc](./open-api.md) (endpoint list).

---

## 1. Scenario

The third-party application holds the `client_id` / `client_secret` assigned by an administrator and calls the Open API as the **application's own service account**, with no end user involved.

**Goals of this demo**:
- Obtain an access token: `POST /api/oauth/token` (`grant_type=client_credentials`)
- Pull records page by page: `GET /api/open/v1/bases/{base_id}/tables/{table_id}/records`

### 1.1 Sample Credentials

```
Client ID:     oa_6075240dd4d58c1cb19271eb621f08d2
Client Secret: os_TO_-UfHRPgKIltQapi9U2wYG8iGakGAUY2uzxwGfNM0
```

> ⚠️ **Security reminder**: the above are demo credentials only. Do not hard-code real secrets in code/docs; in production, inject them via environment variables or a secret management service.

### 1.2 Demo Resources

```
Base ID:  5e6ab2ad-d45b-4535-a4c9-fe7af69cbe8b
Table ID: d57618ce-6942-4d9a-b7f2-3144e35f704f
```

### 1.3 Call Flow

```
① POST /api/oauth/token
   Request: Basic Auth (client_id:client_secret) + grant_type=client_credentials
   Response: { "access_token": "...", "token_type": "Bearer", "expires_in": 7200, ... }

② GET /api/open/v1/bases/{base_id}/tables/{table_id}/records?page=1&per_page=200
   Header: Authorization: Bearer <access_token>
   Response: { "success": true, "data": [ ...records... ], "meta": { "pagination": { ... } } }
```

Pagination parameter description:

| Parameter | Description |
|------|------|
| `page` | Page number, starting at 1 |
| `per_page` | Records per page, default 20, **max 200** |
| `meta.pagination` | Contains `total` (total count) and `total_pages` (total pages), used to determine when paging ends |

---

## 2. Python Implementation

**Source file**: `tools/fetch_open_table_data.py` (depends only on the Python standard library, no third-party packages needed)

### 2.1 How to Run

```bash
# Option 1: pass arguments directly
python fetch_open_table_data.py \
  --base-id 5e6ab2ad-d45b-4535-a4c9-fe7af69cbe8b \
  --table-id d57618ce-6942-4d9a-b7f2-3144e35f704f \
  --client-id oa_6075240dd4d58c1cb19271eb621f08d2 \
  --client-secret "os_TO_-UfHRPgKIltQapi9U2wYG8iGakGAUY2uzxwGfNM0"

# Option 2: credentials via environment variables (recommended, avoids leaking into shell history)
export OAUTH_CLIENT_ID="oa_6075240dd4d58c1cb19271eb621f08d2"
export OAUTH_CLIENT_SECRET="os_TO_-UfHRPgKIltQapi9U2wYG8iGakGAUY2uzxwGfNM0"
python fetch_open_table_data.py --base-id 5e6ab2ad-... --table-id d57618ce-...
```

### 2.2 Parameter Description

| Parameter / Env Var | Description | Default |
|----------------|------|--------|
| `--base-url` / `SMART_TABLE_BASE_URL` | Service address | `http://localhost:5000` |
| `--client-id` / `OAUTH_CLIENT_ID` | Application ID | required |
| `--client-secret` / `OAUTH_CLIENT_SECRET` | Application secret | required |
| `--page-size` | Records per page | 200 (max 200) |
| `--out` | Export JSON file path | no export |
| `--verbose` | Print per-page request details | off |

### 2.3 Full Source

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Simulate a third-party application calling the Open API (OAuth2 Client Credentials) to pull
all records of a specified Base/Table.

Usage:
    python fetch_open_table_data.py --base-id 5e6ab2ad-... --table-id d57618ce-...

Optional arguments (may also be provided via environment variables):
    --base-url      Service address, default http://localhost:5000
    --client-id    OAuth client_id (defaults to env var OAUTH_CLIENT_ID)
    --client-secret OAuth client_secret (defaults to env var OAUTH_CLIENT_SECRET)
    --page-size    Page size, default 200 (server max 200)
    --out          Export JSON file path (optional)
    --verbose      Print detailed request logs

Environment variables:
    OAUTH_CLIENT_ID
    OAUTH_CLIENT_SECRET
    SMART_TABLE_BASE_URL
"""

import argparse
import json
import os
import sys
import urllib.request
import urllib.parse
import base64


def get_env(name: str, default: str = "") -> str:
    return os.environ.get(name, default).strip()


def request_json(url: str, method: str = "GET", headers: dict | None = None,
                 body: dict | None = None) -> dict:
    """Send an HTTP request and parse the JSON response"""
    data = None
    if body is not None:
        data = json.dumps(body).encode("utf-8")
    req = urllib.request.Request(url, data=data, method=method)
    if body is not None:
        req.add_header("Content-Type", "application/json")
    for k, v in (headers or {}).items():
        req.add_header(k, v)
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        detail = e.read().decode("utf-8", errors="replace")
        raise RuntimeError(f"HTTP {e.code}: {url}\n{detail}") from e
    except urllib.error.URLError as e:
        raise RuntimeError(f"Unable to connect {url}: {e.reason}") from e


def get_access_token(base_url: str, client_id: str, client_secret: str) -> str:
    """Exchange an access token using the Client Credentials grant"""
    # Use Basic Auth to carry client credentials (RFC 6749 recommended approach)
    basic = base64.b64encode(f"{client_id}:{client_secret}".encode()).decode()
    token_url = f"{base_url}/api/oauth/token"
    payload = "grant_type=client_credentials"
    req = urllib.request.Request(token_url, data=payload.encode(), method="POST")
    req.add_header("Authorization", f"Basic {basic}")
    req.add_header("Content-Type", "application/x-www-form-urlencoded")
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            data = json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        detail = e.read().decode("utf-8", errors="replace")
        raise RuntimeError(f"Token exchange failed HTTP {e.code}:\n{detail}") from e
    if "access_token" not in data:
        raise RuntimeError(f"Token exchange failed, response missing access_token: {data}")
    return data["access_token"]


def fetch_all_records(base_url: str, token: str, base_id: str, table_id: str,
                      page_size: int = 200, verbose: bool = False) -> list:
    """Paginate through all records of a specified table"""
    records: list = []
    page = 1
    while True:
        url = (
            f"{base_url}/api/open/v1/bases/{base_id}/tables/{table_id}/records"
            f"?page={page}&per_page={page_size}"
        )
        if verbose:
            print(f"[GET] {url}")
        resp = request_json(url, headers={"Authorization": f"Bearer {token}"})
        if not isinstance(resp.get("data"), list):
            raise RuntimeError(f"Unexpected response format: {resp}")
        records.extend(resp["data"])
        pagination = resp.get("meta", {}).get("pagination", {})
        total = pagination.get("total", 0)
        total_pages = pagination.get("total_pages", 0)
        if verbose:
            print(f"  Page {page}: accumulated {len(records)}/{total} records")
        if page >= total_pages:
            break
        page += 1
    return records


def main() -> int:
    parser = argparse.ArgumentParser(description="Pull all records of a SmartTable Open API table")
    parser.add_argument("--base-id", required=True, help="Base ID")
    parser.add_argument("--table-id", required=True, help="Table ID")
    parser.add_argument("--base-url", default=get_env("SMART_TABLE_BASE_URL", "http://localhost:5000"),
                        help="Service address (default http://localhost:5000)")
    parser.add_argument("--client-id", default=get_env("OAUTH_CLIENT_ID"), help="OAuth client_id")
    parser.add_argument("--client-secret", default=get_env("OAUTH_CLIENT_SECRET"), help="OAuth client_secret")
    parser.add_argument("--page-size", type=int, default=200, help="Page size, default 200, max 200")
    parser.add_argument("--out", help="Export JSON file path (optional)")
    parser.add_argument("--verbose", action="store_true", help="Print detailed logs")
    args = parser.parse_args()

    if not args.client_id or not args.client_secret:
        print("Error: client-id/client-secret required (or set env vars OAUTH_CLIENT_ID / OAUTH_CLIENT_SECRET)")
        return 2

    if args.page_size < 1:
        args.page_size = 1
    if args.page_size > 200:
        args.page_size = 200

    try:
        print(f"[1/3] Exchanging access token via Client Credentials ...")
        token = get_access_token(args.base_url, args.client_id, args.client_secret)
        print("[2/3] Token obtained")

        print(f"[3/3] Pulling all records of base={args.base_id} table={args.table_id} ...")
        records = fetch_all_records(
            args.base_url, token, args.base_id, args.table_id,
            page_size=args.page_size, verbose=args.verbose,
        )

        print(f"Done: fetched {len(records)} records")
        if records:
            print(f"Sample (record 1): {json.dumps(records[0], ensure_ascii=False)}")

        if args.out:
            with open(args.out, "w", encoding="utf-8") as f:
                json.dump({"base_id": args.base_id, "table_id": args.table_id,
                           "total": len(records), "records": records}, f,
                          ensure_ascii=False, indent=2)
            print(f"Exported to: {args.out}")
        return 0
    except RuntimeError as e:
        print(f"Failed: {e}")
        return 1


if __name__ == "__main__":
    sys.exit(main())
```

---

## 3. Java Implementation

**Source file**: `tools/FetchOpenTableData.java` (JDK 11+ standard library `java.net.http.HttpClient`, zero third-party dependencies)

### 3.1 How to Run

```bash
# JDK 11+ can run single-file source code directly
java FetchOpenTableData.java \
  --base-id 5e6ab2ad-d45b-4535-a4c9-fe7af69cbe8b \
  --table-id d57618ce-6942-4d9a-b7f2-3144e35f704f \
  --client-id oa_6075240dd4d58c1cb19271eb621f08d2 \
  --client-secret os_TO_-UfHRPgKIltQapi9U2wYG8iGakGAUY2uzxwGfNM0
```

Credentials can also be injected via environment variables: `OAUTH_CLIENT_ID`, `OAUTH_CLIENT_SECRET`, `SMART_TABLE_BASE_URL`.

### 3.2 Full Source

> Note: the response JSON parsing uses a **placeholder implementation** (`JsonHelper`) to demonstrate paging and field extraction logic; in production, integrate a mature JSON library such as **Jackson / Gson** to parse the `data` array and `meta.pagination.total_pages`.

```java
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

/**
 * Simulate a third-party application calling the SmartTable Open API (OAuth2 Client Credentials)
 * to pull all records of a specified Base/Table.
 *
 * Sample only, no third-party libraries, using the JDK 11+ standard library HttpClient.
 * Notes:
 *   - Response JSON parsing is expressed by the placeholder parseJsonRecords(); in production
 *     integrate Jackson/Gson to parse the data array and meta.pagination.total_pages;
 *   - Paging logic is complete (while page <= totalPages), totalPages read from the response meta.
 *
 * Usage (example):
 *   java FetchOpenTableData.java \
 *     --base-id 5e6ab2ad-... \
 *     --table-id d57618ce-... \
 *     --client-id oa_xxx \
 *     --client-secret os_xxx \
 *     [--base-url http://localhost:5000] \
 *     [--page-size 200] \
 *     [--out records.json]
 */
public class FetchOpenTableData {

    // -------------------- Parameter model --------------------
    static class Args {
        String baseUrl = System.getenv().getOrDefault("SMART_TABLE_BASE_URL", "http://localhost:5000");
        String clientId = System.getenv().getOrDefault("OAUTH_CLIENT_ID", "");
        String clientSecret = System.getenv().getOrDefault("OAUTH_CLIENT_SECRET", "");
        String baseId;
        String tableId;
        int pageSize = 200;
        String outFile;

        static Args parse(String[] argv) {
            Args a = new Args();
            for (int i = 0; i < argv.length; i++) {
                switch (argv[i]) {
                    case "--base-url": a.baseUrl = argv[++i]; break;
                    case "--client-id": a.clientId = argv[++i]; break;
                    case "--client-secret": a.clientSecret = argv[++i]; break;
                    case "--base-id": a.baseId = argv[++i]; break;
                    case "--table-id": a.tableId = argv[++i]; break;
                    case "--page-size": a.pageSize = Integer.parseInt(argv[++i]); break;
                    case "--out": a.outFile = argv[++i]; break;
                    default: throw new IllegalArgumentException("Unknown argument: " + argv[i]);
                }
            }
            if (a.clientId.isEmpty() || a.clientSecret.isEmpty() || a.baseId == null || a.tableId == null) {
                throw new IllegalArgumentException(
                        "Must provide --client-id / --client-secret / --base-id / --table-id");
            }
            a.pageSize = Math.min(200, Math.max(1, a.pageSize)); // server max 200
            return a;
        }
    }

    // -------------------- Client wrapper --------------------
    private final HttpClient http = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(30)).build();
    private final String baseUrl;
    private String accessToken;

    public FetchOpenTableData(String baseUrl) {
        this.baseUrl = baseUrl;
    }

    /** Send a JSON request, return the response body string; throw on non-2xx */
    private String send(HttpRequest.Builder builder) throws Exception {
        HttpRequest req = builder.build();
        HttpResponse<String> resp = http.send(req, HttpResponse.BodyHandlers.ofString());
        if (resp.statusCode() / 100 != 2) {
            throw new RuntimeException("HTTP " + resp.statusCode() + ": " + resp.body());
        }
        return resp.body();
    }

    /** Exchange access token (Basic Auth + grant_type=client_credentials) */
    public String getAccessToken(String clientId, String clientSecret) throws Exception {
        String basic = Base64.getEncoder().encodeToString(
                (clientId + ":" + clientSecret).getBytes(StandardCharsets.UTF_8));
        String body = send(HttpRequest.newBuilder()
                .uri(URI.create(baseUrl + "/api/oauth/token"))
                .header("Authorization", "Basic " + basic)
                .header("Content-Type", "application/x-www-form-urlencoded")
                .POST(HttpRequest.BodyPublishers.ofString("grant_type=client_credentials")));
        String token = JsonHelper.extractString(body, "access_token");
        if (token == null) {
            throw new RuntimeException("Token exchange failed, response missing access_token: " + body);
        }
        this.accessToken = token;
        return token;
    }

    /** Paginate through all records of a specified table */
    public List<String> fetchAllRecords(String baseId, String tableId, int pageSize) throws Exception {
        List<String> records = new ArrayList<>();
        int page = 1;
        int totalPages = 1;

        do {
            String url = baseUrl + "/api/open/v1/bases/" + baseId + "/tables/" + tableId
                    + "/records?page=" + page + "&per_page=" + pageSize;
            String json = send(HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .header("Authorization", "Bearer " + accessToken)
                    .GET());

            // data: current page record array; meta.pagination.total_pages: total pages
            List<String> pageRecords = JsonHelper.parseJsonArray(json, "data");
            records.addAll(pageRecords);
            totalPages = JsonHelper.extractInt(json, "total_pages", totalPages);
            System.out.printf("  Page %d: accumulated %d records%n", page, records.size());

            page++;
        } while (page <= totalPages);

        return records;
    }

    public static void main(String[] args) {
        try {
            Args a = Args.parse(args);
            FetchOpenTableData fetcher = new FetchOpenTableData(a.baseUrl);

            System.out.println("[1/3] Exchanging access token via Client Credentials ...");
            fetcher.getAccessToken(a.clientId, a.clientSecret);
            System.out.println("[2/3] Token obtained");

            System.out.println("[3/3] Pulling all records of base=" + a.baseId + " table=" + a.tableId + " ...");
            List<String> records = fetcher.fetchAllRecords(a.baseId, a.tableId, a.pageSize);

            System.out.println("Done: fetched " + records.size() + " records");
            if (!records.isEmpty()) {
                System.out.println("Sample (record 1): " + records.get(0));
            }
            if (a.outFile != null) {
                java.nio.file.Files.writeString(
                        java.nio.file.Path.of(a.outFile),
                        "{\"total\":" + records.size() + ",\"records\":" + records + "}",
                        StandardCharsets.UTF_8);
                System.out.println("Exported to: " + a.outFile);
            }
        } catch (Exception e) {
            System.err.println("Failed：" + e.getMessage());
            System.exit(1);
        }
    }

    // -------------------- Minimal JSON utility (sample placeholder; use Jackson/Gson in production) --------------------
    static class JsonHelper {
        /** Extract a string field value (quotes auto-stripped) */
        static String extractString(String json, String field) {
            String key = "\"" + field + "\"";
            int i = json.indexOf(key);
            if (i < 0) return null;
            int colon = json.indexOf(':', i + key.length());
            if (colon < 0) return null;
            int s = skipWs(json, colon + 1);
            if (s >= json.length() || json.charAt(s) != '"') return null;
            StringBuilder sb = new StringBuilder();
            boolean esc = false;
            for (int j = s + 1; j < json.length(); j++) {
                char c = json.charAt(j);
                if (esc) { sb.append(c); esc = false; }
                else if (c == '\\') esc = true;
                else if (c == '"') return sb.toString();
                else sb.append(c);
            }
            return null;
        }

        /** Extract an integer field value */
        static int extractInt(String json, String field, int def) {
            String key = "\"" + field + "\"";
            int i = json.indexOf(key);
            if (i < 0) return def;
            int colon = json.indexOf(':', i + key.length());
            if (colon < 0) return def;
            int s = skipWs(json, colon + 1);
            int e = s;
            while (e < json.length() && Character.isDigit(json.charAt(e))) e++;
            if (e == s) return def;
            try { return Integer.parseInt(json.substring(s, e)); }
            catch (NumberFormatException ex) { return def; }
        }

        /**
         * Extract a JSON array and split into string elements (sample placeholder).
         * Note: simplified for demo; in practice use a JSON library to parse into an object list;
         * this method assumes array elements are simple JSON objects, splitting by comma.
         */
        static List<String> parseJsonArray(String json, String field) {
            List<String> out = new ArrayList<>();
            String key = "\"" + field + "\"";
            int i = json.indexOf(key);
            if (i < 0) return out;
            int colon = json.indexOf(':', i + key.length());
            if (colon < 0) return out;
            int s = skipWs(json, colon + 1);
            if (s >= json.length() || json.charAt(s) != '[') return out;
            // Bracket-pair split of top-level array elements (ignore commas inside nested {})
            int depth = 0, start = s + 1;
            for (int j = s + 1; j < json.length(); j++) {
                char c = json.charAt(j);
                if (c == '{' || c == '[') depth++;
                else if (c == '}' || c == ']') {
                    if (depth == 0 && c == ']') { // array end
                        if (j > start) out.add(json.substring(start, j).trim());
                        break;
                    }
                    depth--;
                } else if (c == ',' && depth == 0) {
                    out.add(json.substring(start, j).trim());
                    start = j + 1;
                }
            }
            return out;
        }

        private static int skipWs(String json, int i) {
            while (i < json.length() && Character.isWhitespace(json.charAt(i))) i++;
            return i;
        }
    }
}
```

---

## 4. Two Implementations Compared

| Dimension | Python | Java |
|------|--------|------|
| Runtime | Python 3.10+ (`dict | None` syntax) | JDK 11+ |
| Dependencies | Standard library only (urllib) | Standard library only (HttpClient) |
| Token exchange | Basic Auth + `grant_type=client_credentials` | Same |
| Paging strategy | `while` loop, end judged by `total_pages` | `do-while` loop, end judged by `total_pages` |
| JSON parsing | Standard library `json` | Placeholder `JsonHelper`, Jackson/Gson recommended for production |
| Credential management | CLI args or env vars | Same |
| Output | Console print + optional JSON export | Same |

---

## 5. Common Errors and Troubleshooting

| Symptom | Possible cause | Handling |
|------|---------|------|
| `HTTP 401` (token exchange failed) | client_id/secret wrong, or app disabled | Check credentials and app status |
| `HTTP 403` (record pull failed) | App not authorized for the Base, or missing `record:read` scope | Grant the Base authorization and scope for the app in the backend |
| `HTTP 404` | base_id / table_id not in authorized scope or doesn't exist | Verify the resource IDs |
| Token expired | access_token validity (default 7200s) | Re-exchange token each run; for long-running tasks, cache by `expires_in` and auto-renew |

> Tip: all Open API calls (including read operations `api_read`) are recorded to the application audit log (`ApiAppAuditLog`), which can be used with the backend "Audit Log" to troubleshoot calls.

---

## 6. Related Files Index

- Practice doc: `doc/oauth2-practice-examples.md` (this document)
- Python script: `tools/fetch_open_table_data.py`
- Java script: `tools/FetchOpenTableData.java`
- Integration doc: `doc/oauth2-integration.md`
- Open API list: `doc/open-api.md`
