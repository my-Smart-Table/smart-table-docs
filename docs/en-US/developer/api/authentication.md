# Authentication

This document introduces the authentication mechanism of the SmartTable API.

## Get Access Token

### Login Endpoint

```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "your-password"
}
```

### Response Example

```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": "7d",
    "user": {
      "id": 1,
      "email": "user@example.com",
      "name": "User Name"
    }
  }
}
```

## Use Token

Add the authentication token to the Header of all API requests:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Refresh Token

When the token is about to expire, you can use the refresh endpoint:

```http
POST /api/v1/auth/refresh
Authorization: Bearer <current-token>
```

## Logout

```http
POST /api/v1/auth/logout
Authorization: Bearer <token>
```

## Error Handling

### 401 Unauthorized

```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Please log in first"
  }
}
```

### 403 Forbidden

```json
{
  "success": false,
  "error": {
    "code": "FORBIDDEN",
    "message": "You do not have permission to access this resource"
  }
}
```

## Security Recommendations

1. Do not expose tokens on the client side
2. Use HTTPS transmission
3. Refresh tokens regularly
4. Log out in time

## Next Steps

- [Table API](/en-US/developer/api/table)
- [Record API](/en-US/developer/api/record)
