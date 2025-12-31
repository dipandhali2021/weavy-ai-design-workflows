/**
 * Authentication Utilities
 * 
 * Client-side auth state management using localStorage.
 * Works with the API client for token management.
 */

import type { User } from '@/types/api.types';

// Re-export User type as AuthUser for backward compatibility
export type AuthUser = User;

/** localStorage key for auth token */
export const AUTH_TOKEN_KEY = 'weavyai:token';

/** localStorage key for user data */
export const AUTH_USER_KEY = 'weavyai:user';

/**
 * Get the stored authentication token
 * @returns Token string or null if not found
 */
export function getStoredToken(): string | null {
    if (typeof window === 'undefined') return null;
    try {
        return localStorage.getItem(AUTH_TOKEN_KEY);
    } catch {
        return null;
    }
}

/**
 * Store or clear the authentication token
 * @param token - Token to store, or null to clear
 */
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

/**
 * Get the stored user data
 * @returns User object or null if not found
 */
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

/**
 * Store or clear user data
 * @param user - User object to store, or null to clear
 */
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

/**
 * Check if the user is authenticated
 * @returns true if both token and user are stored
 */
export function isAuthenticated(): boolean {
    return !!getStoredToken() && !!getStoredUser();
}

/**
 * Clear all authentication data
 */
export function clearAuth(): void {
    setStoredToken(null);
    setStoredUser(null);
}
