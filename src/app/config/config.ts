import { LogLevel, PassedInitialConfig } from 'angular-auth-oidc-client';

export const authConfig : PassedInitialConfig = {
    config: {
        authority: 'http://localhost:8080/realms/ecom-ms',
        redirectUrl: window.location.origin,
        postLogoutRedirectUri: window.location.origin,
        clientId: 'ecom-client',
        scope: 'openid profile offline_access roles',
        responseType: 'code',
        silentRenew: true,
        useRefreshToken: true,
        renewTimeBeforeTokenExpiresInSeconds: 30,
        ignoreNonceAfterRefresh: true,
    }
}