import { Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import User from '../models/User.js';
import { generateToken, AuthRequest } from '../middleware/auth.js';
import { googleAuthSchema } from '../schemas/auth.js';
import { sendSuccess, sendError, HttpStatus, COOKIE_CONFIG } from '../utils/index.js';
import { UserResponse } from '../types/index.js';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);

/**
 * Format user data for API response
 */
const formatUserResponse = (user: { _id: unknown; email: string; name: string; avatar?: string }): UserResponse => ({
    id: user._id?.toString() ?? '',
    email: user.email,
    name: user.name,
    avatar: user.avatar,
});

/**
 * Set authentication cookie on response
 */
const setAuthCookie = (res: Response, token: string): void => {
    res.cookie(COOKIE_CONFIG.TOKEN_NAME, token, {
        httpOnly: COOKIE_CONFIG.HTTP_ONLY,
        secure: COOKIE_CONFIG.SECURE,
        sameSite: COOKIE_CONFIG.SAME_SITE,
        maxAge: COOKIE_CONFIG.MAX_AGE,
    });
};

/**
 * POST /auth/google - Handle Google OAuth token from frontend
 */
export const googleAuth = async (req: AuthRequest, res: Response): Promise<void> => {
    // Validate request body
    const validation = googleAuthSchema.safeParse(req.body);

    if (!validation.success) {
        sendError(res, 'Invalid request', HttpStatus.BAD_REQUEST, validation.error.errors);
        return;
    }

    const { credential } = validation.data;

    // Verify the Google token
    const ticket = await googleClient.verifyIdToken({
        idToken: credential,
        audience: GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload || !payload.email) {
        sendError(res, 'Invalid Google token', HttpStatus.BAD_REQUEST);
        return;
    }

    const { sub: googleId, email, name, picture } = payload;

    // Find or create user
    let user = await User.findOne({ googleId });

    if (!user) {
        user = await User.create({
            googleId,
            email,
            name: name || email.split('@')[0],
            avatar: picture || '',
        });
        console.log('✅ New user created:', user.email);
    } else {
        // Update user info if changed
        user.name = name || user.name;
        user.avatar = picture || user.avatar;
        await user.save();
    }

    // Generate JWT token
    const token = generateToken({
        userId: user._id.toString(),
        email: user.email,
    });

    // Set HTTP-only cookie
    setAuthCookie(res, token);

    sendSuccess(res, {
        user: formatUserResponse(user),
        token,
    });
};

/**
 * GET /auth/session - Validate session and return user
 */
export const getSession = async (req: AuthRequest, res: Response): Promise<void> => {
    const user = await User.findById(req.user?.userId);

    if (!user) {
        sendError(res, 'User not found', HttpStatus.NOT_FOUND);
        return;
    }

    sendSuccess(res, { user: formatUserResponse(user) });
};

/**
 * POST /auth/logout - Invalidate session
 */
export const logout = (req: AuthRequest, res: Response): void => {
    res.clearCookie(COOKIE_CONFIG.TOKEN_NAME, {
        httpOnly: COOKIE_CONFIG.HTTP_ONLY,
        secure: COOKIE_CONFIG.SECURE,
        sameSite: COOKIE_CONFIG.SAME_SITE,
    });

    sendSuccess(res, { message: 'Logged out successfully' });
};

/**
 * GET /auth/me - Get current user
 */
export const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
    const user = await User.findById(req.user?.userId);

    if (!user) {
        sendError(res, 'User not found', HttpStatus.NOT_FOUND);
        return;
    }

    sendSuccess(res, { user: formatUserResponse(user) });
};

/**
 * Google OAuth callback handler (for redirect-based flow)
 */
export const googleCallback = (req: AuthRequest, res: Response): void => {
    const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';
    const sessionUser = req.user as { userId: string; email: string } | undefined;

    if (!sessionUser || !sessionUser.userId) {
        res.redirect(`${CLIENT_URL}/signin?error=no_user`);
        return;
    }

    // Generate JWT token
    const token = generateToken({
        userId: sessionUser.userId,
        email: sessionUser.email,
    });

    // Set HTTP-only cookie
    setAuthCookie(res, token);

    // Redirect to dashboard with token
    res.redirect(`${CLIENT_URL}/dashboard?token=${token}`);
};
