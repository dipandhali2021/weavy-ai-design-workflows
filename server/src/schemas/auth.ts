import { z } from 'zod';

// Google OAuth token schema
export const googleAuthSchema = z.object({
    credential: z.string().min(1, 'Google credential is required'),
});

export type GoogleAuthInput = z.infer<typeof googleAuthSchema>;

// User response schema
export const userResponseSchema = z.object({
    id: z.string(),
    email: z.string().email(),
    name: z.string(),
    avatar: z.string().optional(),
});

export type UserResponse = z.infer<typeof userResponseSchema>;

// Auth response schema
export const authResponseSchema = z.object({
    success: z.boolean(),
    user: userResponseSchema.optional(),
    token: z.string().optional(),
    message: z.string().optional(),
});

export type AuthResponse = z.infer<typeof authResponseSchema>;

// Session validation schema
export const sessionSchema = z.object({
    userId: z.string(),
    email: z.string().email(),
    iat: z.number(),
    exp: z.number(),
});

export type SessionPayload = z.infer<typeof sessionSchema>;
