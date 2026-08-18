# Open API (/api/open/v1)

This document describes the interface list for a third-party application to access SmartTable data via the Open API, using the Bearer token obtained through OAuth2 client credentials.

> All endpoints are prefixed with `/api/open/v1` and require `Authorization: Bearer <access_token>` (issued by `/api/oauth/token`).

---

## 1. General Conventions

### Authentication

```
Authorization: Bearer <access_token>
```

Server-side validation:
1. JWT signature is valid and not expired;
2. The token's `token_type == app` (application token; user tokens are rejected);
3. The token is not revoked (Redis blacklist);
4. The target Base is within the application's `allowed_bases` allow-list;
5. The scope required by the request is within the application's granted scope.

If any step fails, the corresponding error is returned.

### Rate Limiting

The Open API uses an independent rate limit (default 600 requests/minute per application, and 300 requests/minute for `record:write` write endpoints), isolated from user API quotas. Exceeding it returns `429`.

### Unified Response Format

Success:

```json
{
  "code": 0,
  "message": "Operation succeeded",
  "data": { },
  "request_id": "req_xxx"
}
```

Paginated list (`paginated_response`):

```json
{
  "code": 0,
  "message": "Fetched successfully",
  "data": [ ... ],
  "pagination": { "page": 1, "per_page": 20, "total": 135, "pages": 7 },
  "request_id": "req_xxx"
}
```

Error:

```json
{
  "code": 403,
  "message": "Application is not authorized to access this Base",
  "error": "forbidden",
  "request_id": "req_xxx"
}
```

### Error Codes

| HTTP | error | Meaning |
| --- | --- | --- |
| 401 | `unauthorized` | Token missing / invalid / application not found |
| 403 | `forbidden` | Application disabled / no Base authorization / missing scope |
| 404 | `not_found` | Base / table / record does not exist |
| 429 | `rate_limit` | Open API rate limit triggered |

---

## 2. Endpoint List

### 2.1 Base

| Method | Path | Required scope |
| --- | --- | --- |
| GET | `/bases` | `base:read` |
| GET | `/bases/{base_id}` | `base:read` |

#### List Authorized Bases

```bash
curl "https://your-domain/api/open/v1/bases" \
  -H "Authorization: Bearer <access_token>"
```

Returns a summary (id / name / fields, etc.) of all Bases within the application's `allowed_bases`.

#### Get Base Details

```bash
curl "https://your-domain/api/open/v1/bases/11111111-1111-1111-1111-111111111111" \
  -H "Authorization: Bearer <access_token>"
```

---

### 2.2 Table

| Method | Path | Required scope |
| --- | --- | --- |
| GET | `/bases/{base_id}/tables` | `table:read` |
| GET | `/bases/{base_id}/tables/{table_id}` | `table:read` |

#### List Tables

```bash
curl "https://your-domain/api/open/v1/bases/11111111-1111-1111-1111-111111111111/tables" \
  -H "Authorization: Bearer <access_token>"
```

#### Get Table Details

```bash
curl "https://your-domain/api/open/v1/bases/11111111-1111-1111-1111-111111111111/tables/22222222-2222-2222-2222-222222222222" \
  -H "Authorization: Bearer <access_token>"
```

---

### 2.3 Field

| Method | Path | Required scope |
| --- | --- | --- |
| GET | `/bases/{base_id}/tables/{table_id}/fields` | `field:read` |

#### List Field Structure

```bash
curl "https://your-domain/api/open/v1/bases/11111111-1111-1111-1111-111111111111/tables/22222222-2222-2222-2222-222222222222/fields" \
  -H "Authorization: Bearer <access_token>"
```

Returns the metadata structure of all fields in the table (field name, type, configuration, etc.).

---

### 2.4 Record

| Method | Path | Required scope |
| --- | --- | --- |
| GET | `/bases/{base_id}/tables/{table_id}/records` | `record:read` |
| GET | `/bases/{base_id}/tables/{table_id}/records/search?q=` | `record:read` |
| GET | `/bases/{base_id}/tables/{table_id}/records/{record_id}` | `record:read` |
| POST | `/bases/{base_id}/tables/{table_id}/records` | `record:write` |
| PUT | `/bases/{base_id}/tables/{table_id}/records/{record_id}` | `record:write` |
| DELETE | `/bases/{base_id}/tables/{table_id}/records/{record_id}` | `record:write` |

#### List Records (Paginated)

Query parameters: `page` (default 1), `per_page` (default 20, max 200).

```bash
curl "https://your-domain/api/open/v1/bases/11111111-1111-1111-1111-111111111111/tables/22222222-2222-2222-2222-222222222222/records?page=1&per_page=20" \
  -H "Authorization: Bearer <access_token>"
```

#### Search Records

Query parameter: `q` (keyword, required).

```bash
curl "https://your-domain/api/open/v1/bases/11111111-1111-1111-1111-111111111111/tables/22222222-2222-2222-2222-222222222222/records/search?q=keyword" \
  -H "Authorization: Bearer <access_token>"
```

#### Get a Single Record

```bash
curl "https://your-domain/api/open/v1/bases/11111111-1111-1111-1111-111111111111/tables/22222222-2222-2222-2222-222222222222/records/33333333-3333-3333-3333-333333333333" \
  -H "Authorization: Bearer <access_token>"
```

#### Create Record

The request body is a field-value object (it can also be wrapped in `{"values": {...}}`).

```bash
curl -X POST "https://your-domain/api/open/v1/bases/11111111-1111-1111-1111-111111111111/tables/22222222-2222-2222-2222-222222222222/records" \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "Name": "Example Record",
    "Status": "In Progress",
    "Count": 42
  }'
```

> Field names must match the field identifiers returned by `/fields`. The operator of the record is automatically recorded as the application ID for audit purposes.

#### Update Record

```bash
curl -X PUT "https://your-domain/api/open/v1/bases/11111111-1111-1111-1111-111111111111/tables/22222222-2222-2222-2222-222222222222/records/33333333-3333-3333-3333-333333333333" \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "Status": "Done"
  }'
```

#### Delete Record

```bash
curl -X DELETE "https://your-domain/api/open/v1/bases/11111111-1111-1111-1111-111111111111/tables/22222222-2222-2222-2222-222222222222/records/33333333-3333-3333-3333-333333333333" \
  -H "Authorization: Bearer <access_token>"
```

---

## 3. End-to-End Example

```bash
# 1. Exchange for a token
TOKEN=$(curl -s -X POST "https://your-domain/api/oauth/token" \
  -u "oa_client_id:os_client_secret" \
  -d "grant_type=client_credentials" \
  -d "scope=base:read table:read record:read record:write" \
  | python -c "import sys,json; print(json.load(sys.stdin)['access_token'])")

# 2. Read the authorized Base list
curl "https://your-domain/api/open/v1/bases" \
  -H "Authorization: Bearer $TOKEN"

# 3. Create a record in a specified table
curl -X POST "https://your-domain/api/open/v1/bases/$BASE_ID/tables/$TABLE_ID/records" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"Task Name": "Created via Open API", "Priority": 1}'
```

---

## 4. Notes and Limitations

- The application reads/writes data from the "owner's perspective" of the authorized Base; cross-`allowed_bases` access is rejected (`403`).
- The operator of record writes is recorded as the application ID, and all writes are written to the application audit log.
- The current version supports **only** Client Credentials; user authorization (authorization code / PKCE) endpoints are not open.
- Field names (keys) follow the identifiers returned by `/fields`; type validation is handled by the underlying record service, and illegal values return `400`.

## Related Documents

- [OAuth2 Third-Party Application Integration](./oauth2-integration.md)
- [Third-Party Application Integration Examples](./oauth2-practice-examples.md)
