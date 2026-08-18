# Authentication

The SmartTable Open API authenticates third-party applications using the OAuth2 **client credentials grant**. Credentials are issued by the developer platform. The caller first exchanges them for an access token, then uses that token to call business endpoints.

> To authorize on behalf of a user in a browser or mobile app (e.g. web login integration), see [App Integration - OAuth2 Third-Party Integration](/en-US/developer/app-integration/oauth2-integration.md) for the authorization code and PKCE flows.

## Create an Application

After creating an application on the SmartTable developer platform, the platform assigns the following credentials:

- `client_id`: unique application identifier
- `client_secret`: application secret (keep it safe and never leak it)

## Grant Type

API calls currently use the OAuth2 client credentials grant:

```
grant_type = client_credentials
```

## Obtain an Access Token

```http
POST /api/v1/auth/oauth2/token
Content-Type: application/json

{
  "client_id": "your-client-id",
  "client_secret": "your-client-secret",
  "grant_type": "client_credentials"
}
```

**Response example**:

```json
{
  "code": 0,
  "msg": "success",
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh_token": "def50200...",
    "token_type": "Bearer",
    "expires_in": 7200,
    "scope": "table:read table:write record:read record:write"
  }
}
```

| Field | Description |
| --- | --- |
| `access_token` | Access token used to authenticate business requests |
| `refresh_token` | Refresh token used to obtain a new access token |
| `token_type` | Token type, always `Bearer` |
| `expires_in` | Access token lifetime (seconds) |
| `scope` | Permissions granted to the token |

## Use the Token

Carry the access token in the Header of every business API request:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Refresh the Token

When the access token is about to expire, exchange the refresh token for a new one:

```http
POST /api/v1/auth/oauth2/token
Content-Type: application/json

{
  "client_id": "your-client-id",
  "client_secret": "your-client-secret",
  "grant_type": "refresh_token",
  "refresh_token": "your-refresh-token"
}
```

## Revoke

Actively revoke a token to invalidate it:

```http
POST /api/v1/auth/oauth2/revoke
Content-Type: application/json

{
  "client_id": "your-client-id",
  "token": "your-access-token-or-refresh-token"
}
```

## Security Recommendations

1. Never store `client_secret` or tokens in frontend code or public repositories.
2. Always use HTTPS.
3. After the access token expires, use the refresh token to renew instead of re-authorizing frequently.
4. Revoke and reset credentials promptly when an app is decommissioned or a secret is leaked.

## Next Steps

- [Table API](./table.md)
- [Record API](./record.md)
