/**
 * Application-wide constants
 */

// JWT Configuration
export const JWT_CONFIG = {
    SECRET: process.env.JWT_SECRET || 'fallback-secret-change-in-production',
    EXPIRES_IN: '7d',
} as const;

// Cookie Configuration
export const COOKIE_CONFIG = {
    TOKEN_NAME: 'token',
    MAX_AGE: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    HTTP_ONLY: true,
    SAME_SITE: 'lax' as const,
    SECURE: process.env.NODE_ENV === 'production',
} as const;

// Session Configuration
export const SESSION_CONFIG = {
    MAX_AGE: 24 * 60 * 60 * 1000, // 1 day in milliseconds
} as const;

// API Configuration
export const API_CONFIG = {
    JSON_LIMIT: '50mb',
    URLENCODED_LIMIT: '50mb',
} as const;

// Environment
export const ENV = {
    IS_PRODUCTION: process.env.NODE_ENV === 'production',
    CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:3000',
    PORT: process.env.PORT || 4000,
} as const;
