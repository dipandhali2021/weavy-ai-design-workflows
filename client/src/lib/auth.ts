export const AUTH_TOKEN_KEY = 'weavyai:token';
export const AUTH_USER_KEY = 'weavyai:user';

export interface AuthUser {
    id: string;
    email: string;
    name: string;
    avatar?: string;
}

export function getStoredToken(): string | null {
    if (typeof window === 'undefined') return null;
    try {
        return localStorage.getItem(AUTH_TOKEN_KEY);
    } catch {
        return null;
    }
}

export function setStoredToken(token: string | null): void {
    if (typeof window === 'undefined') return;
    try {
        if (token) {
            localStorage.setItem(AUTH_TOKEN_KEY, token);
        } else {
            localStorage.removeItem(AUTH_TOKEN_KEY);
        }
    } catch {
        // Storage error, ignore
    }
}

export function getStoredUser(): AuthUser | null {
    if (typeof window === 'undefined') return null;
    try {
        const userJson = localStorage.getItem(AUTH_USER_KEY);
        if (!userJson) return null;
        return JSON.parse(userJson);
    } catch {
        return null;
    }
}

export function setStoredUser(user: AuthUser | null): void {
    if (typeof window === 'undefined') return;
    try {
        if (user) {
            localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
        } else {
            localStorage.removeItem(AUTH_USER_KEY);
        }
    } catch {
        // Storage error, ignore
    }
}

export function isAuthenticated(): boolean {
    return !!getStoredToken() && !!getStoredUser();
}

export function clearAuth(): void {
    setStoredToken(null);
    setStoredUser(null);
}
