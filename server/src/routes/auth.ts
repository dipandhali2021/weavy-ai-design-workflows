import { Router, Request, Response } from 'express';
import passport from '../config/passport.js';
import User, { IUser } from '../models/User.js';
import { generateToken, authMiddleware, AuthRequest } from '../middleware/auth.js';
import { googleAuthSchema } from '../schemas/auth.js';
import { OAuth2Client } from 'google-auth-library';

const router = Router();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';

const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);

// POST /auth/google - Handle Google OAuth token from frontend
router.post('/google', async (req: Request, res: Response) => {
    try {
        // Validate request body
        const validation = googleAuthSchema.safeParse(req.body);

        if (!validation.success) {
            res.status(400).json({
                success: false,
                message: 'Invalid request',
                errors: validation.error.errors,
            });
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
            res.status(400).json({
                success: false,
                message: 'Invalid Google token',
            });
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
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        res.json({
            success: true,
            user: {
                id: user._id.toString(),
                email: user.email,
                name: user.name,
                avatar: user.avatar,
            },
            token,
        });
    } catch (error) {
        console.error('❌ Google auth error:', error);
        res.status(500).json({
            success: false,
            message: 'Authentication failed',
        });
    }
});

// GET /auth/google - Initiate Google OAuth flow (redirect-based)
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// GET /auth/google/callback - Handle Google OAuth callback
router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: `${CLIENT_URL}/signin?error=auth_failed` }),
    (req: Request, res: Response) => {
        // req.user is now a SessionPayload with userId and email
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
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        // Redirect to dashboard with token
        res.redirect(`${CLIENT_URL}/dashboard?token=${token}`);
    }
);

// GET /auth/session - Validate session and return user
router.get('/session', authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
        const user = await User.findById(req.user?.userId);

        if (!user) {
            res.status(404).json({
                success: false,
                message: 'User not found',
            });
            return;
        }

        res.json({
            success: true,
            user: {
                id: user._id.toString(),
                email: user.email,
                name: user.name,
                avatar: user.avatar,
            },
        });
    } catch (error) {
        console.error('❌ Session error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get session',
        });
    }
});

// POST /auth/logout - Invalidate session
router.post('/logout', (req: Request, res: Response) => {
    // Clear the token cookie
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
    });

    res.json({
        success: true,
        message: 'Logged out successfully',
    });
});

// GET /auth/me - Get current user (alias for session)
router.get('/me', authMiddleware, async (req: AuthRequest, res: Response) => {
    try {
        const user = await User.findById(req.user?.userId);

        if (!user) {
            res.status(404).json({
                success: false,
                message: 'User not found',
            });
            return;
        }

        res.json({
            success: true,
            user: {
                id: user._id.toString(),
                email: user.email,
                name: user.name,
                avatar: user.avatar,
            },
        });
    } catch (error) {
        console.error('❌ Get user error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get user',
        });
    }
});

export default router;
