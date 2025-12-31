/**
 * User-related type definitions
 */

export interface UserResponse {
    id: string;
    email: string;
    name: string;
    avatar?: string;
}

export interface AuthUserData {
    userId: string;
    email: string;
}
