import { UserManagerSettings } from 'oidc-client-ts';

// Safe environment variable access
const getEnvVar = (key: string, fallback: string = ''): string =>
  typeof process !== 'undefined' && process.env ? process.env[key] || fallback : fallback;

export const isAuthEnabled = (): boolean =>
  getEnvVar('REACT_APP_AUTH_ENABLED') === 'true';

export const authConfig: UserManagerSettings = {
  authority: getEnvVar('REACT_APP_OIDC_AUTHORITY'),
  client_id: getEnvVar('REACT_APP_OIDC_CLIENT_ID'),
  redirect_uri:
    getEnvVar('REACT_APP_OIDC_REDIRECT_URI') || `${window.location.origin}/callback`,
  silent_redirect_uri:
    getEnvVar('REACT_APP_OIDC_SILENT_REDIRECT_URI') ||
    `${window.location.origin}/silent-callback`,
  post_logout_redirect_uri:
    getEnvVar('REACT_APP_OIDC_POST_LOGOUT_REDIRECT_URI') || window.location.origin,
  scope: getEnvVar('REACT_APP_OIDC_SCOPE') || 'openid profile email',
  response_type: 'code',
  automaticSilentRenew: true,
  includeIdTokenInSilentRenew: false,
  loadUserInfo: true,
  monitorSession: false,
  query_status_response_type: 'code',
  filterProtocolClaims: true,
};

export const apiConfig = {
  baseURL: getEnvVar('REACT_APP_API_BASE_URL') || '/api',
  timeout: 30000,
};
