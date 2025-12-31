import { Router, Request, Response } from 'express';
import passport from '../config/passport.js';
import { authMiddleware } from '../middleware/auth.js';
import { asyncHandler } from '../utils/index.js';
import * as authController from '../controllers/auth.controller.js';

const router = Router();

const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';

// POST /auth/google - Handle Google OAuth token from frontend
router.post('/google', asyncHandler(authController.googleAuth));

// GET /auth/google - Initiate Google OAuth flow (redirect-based)
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// GET /auth/google/callback - Handle Google OAuth callback
router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: `${CLIENT_URL}/signin?error=auth_failed` }),
    (req: Request, res: Response) => authController.googleCallback(req, res)
);

// GET /auth/session - Validate session and return user
router.get('/session', authMiddleware, asyncHandler(authController.getSession));

// POST /auth/logout - Invalidate session
router.post('/logout', (req: Request, res: Response) => authController.logout(req, res));

// GET /auth/me - Get current user (alias for session)
router.get('/me', authMiddleware, asyncHandler(authController.getMe));

export default router;
