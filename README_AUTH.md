# Authentication System Documentation

This project includes a comprehensive authentication system using OpenID Connect (OIDC) with `oidc-client-ts`.

## Features

- **Toggle-able Authentication**: Can be enabled/disabled via environment variable
- **OIDC Integration**: Full OpenID Connect support with automatic token management
- **HTTP Client with Token Handling**: Axios-based client with automatic token injection and refresh
- **Route Protection**: Auth guards for protecting routes
- **Silent Token Renewal**: Automatic background token refresh
- **Error Handling**: Comprehensive error handling for auth scenarios

## Quick Start

### 1. Environment Configuration

Copy `.env.example` to `.env.local` and configure:

```bash
# Enable/disable authentication
REACT_APP_AUTH_ENABLED=false  # Set to 'true' when ready

# OIDC Configuration (required when auth enabled)
REACT_APP_OIDC_AUTHORITY=https://your-auth-server.com
REACT_APP_OIDC_CLIENT_ID=your-client-id
REACT_APP_OIDC_REDIRECT_URI=http://localhost:3000/callback
REACT_APP_OIDC_SILENT_REDIRECT_URI=http://localhost:3000/silent-callback
REACT_APP_OIDC_POST_LOGOUT_REDIRECT_URI=http://localhost:3000
REACT_APP_OIDC_SCOPE=openid profile email

# API Configuration
REACT_APP_API_BASE_URL=https://your-api-server.com/api
```

### 2. Development Mode (Auth Disabled)

While developing without auth servers:

```bash
REACT_APP_AUTH_ENABLED=false
```

This allows you to work on UI components without authentication requirements.

### 3. Production Mode (Auth Enabled)

When you have auth servers ready:

```bash
REACT_APP_AUTH_ENABLED=true
# ... configure OIDC settings
```

## Usage

### Making API Calls

Use the HTTP client for all API requests:

```typescript
import { useHttpClient } from '../hooks/useHttpClient';

function MyComponent() {
  const httpClient = useHttpClient();

  const fetchData = async () => {
    try {
      // Token automatically included in headers if auth enabled
      const data = await httpClient.get('/api/data');
      console.log(data);
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  return (
    <button onClick={fetchData}>Fetch Data</button>
  );
}
```

### Using Auth Context

Access authentication state:

```typescript
import { useAuth } from '../contexts/AuthContext';

function UserProfile() {
  const { user, isAuthenticated, login, logout } = useAuth();

  if (!isAuthenticated) {
    return <button onClick={login}>Login</button>;
  }

  return (
    <div>
      <p>Welcome, {user?.profile?.name}!</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### Protecting Routes

Routes are automatically protected when `REACT_APP_AUTH_ENABLED=true`:

```typescript
// Routes wrapped with AuthGuard in App.tsx
<Route path="/protected" element={
  <AuthGuard>
    <ProtectedComponent />
  </AuthGuard>
} />
```

## Architecture

### Components

- **AuthProvider**: Manages OIDC user state and provides auth context
- **AuthGuard**: Protects routes and redirects to login when needed
- **CallbackHandler**: Handles OIDC authentication callbacks
- **SilentCallback**: Handles silent token renewal

### Services

- **HttpClient**: Axios wrapper with automatic token handling
- **Auth Config**: Centralized configuration from environment variables

### Key Features

1. **Automatic Token Management**: Tokens are automatically:

   - Injected into API requests
   - Refreshed when expired
   - Cleared when invalid

2. **Error Handling**: 401 responses trigger:

   - Silent token refresh attempt
   - Redirect to login if refresh fails

3. **Development Friendly**:
   - Feature can be completely disabled
   - No impact on UI development when disabled
   - Easy to toggle for different environments

## Testing

### Without Auth Server

Set `REACT_APP_AUTH_ENABLED=false` and develop normally.

### With Mock Auth

You can mock the auth context for testing:

```typescript
// In your tests
const mockAuthContext = {
  user: { profile: { name: 'Test User' } },
  isAuthenticated: true,
  login: jest.fn(),
  logout: jest.fn(),
  // ... other properties
};
```

## Configuration Reference

| Environment Variable                      | Description           | Default                | Required          |
| ----------------------------------------- | --------------------- | ---------------------- | ----------------- |
| `REACT_APP_AUTH_ENABLED`                  | Enable/disable auth   | `false`                | Yes               |
| `REACT_APP_OIDC_AUTHORITY`                | OIDC provider URL     | -                      | When auth enabled |
| `REACT_APP_OIDC_CLIENT_ID`                | Client ID             | -                      | When auth enabled |
| `REACT_APP_OIDC_REDIRECT_URI`             | Redirect after login  | `/callback`            | When auth enabled |
| `REACT_APP_OIDC_SILENT_REDIRECT_URI`      | Silent renewal URL    | `/silent-callback`     | When auth enabled |
| `REACT_APP_OIDC_POST_LOGOUT_REDIRECT_URI` | Redirect after logout | `/`                    | When auth enabled |
| `REACT_APP_OIDC_SCOPE`                    | OIDC scopes           | `openid profile email` | When auth enabled |
| `REACT_APP_API_BASE_URL`                  | API base URL          | `/api`                 | No                |

## Troubleshooting

### Common Issues

1. **CORS Issues**: Ensure your OIDC provider allows your domain
2. **Redirect URI Mismatch**: Verify callback URLs match OIDC client config
3. **Token Refresh Issues**: Check silent redirect URI configuration

### Debug Mode

Enable verbose logging in development:

```typescript
// The HTTP client automatically logs errors in development mode
if (process.env.NODE_ENV === 'development') {
  console.error('API Error:', apiError);
}
```
