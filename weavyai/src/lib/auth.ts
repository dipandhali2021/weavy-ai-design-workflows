export const AUTH_STORAGE_KEY = 'weavyai:isAuthenticated';

export function getIsAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;

    try {
        return window.localStorage.getItem(AUTH_STORAGE_KEY) === 'true';
    } catch {
        return false;
    }
}

export function setIsAuthenticated(isAuthenticated: boolean): void {
    if (typeof window === 'undefined') return;

    try {
        window.localStorage.setItem(AUTH_STORAGE_KEY, String(isAuthenticated));
    } catch {
        // non-fatal (e.g., storage disabled)
    }
}
