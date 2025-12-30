import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { SessionPayload } from '../schemas/auth.js';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-change-in-production';

export interface AuthRequest extends Request {
    user?: SessionPayload;
}

export function generateToken(payload: Omit<SessionPayload, 'iat' | 'exp'>): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): SessionPayload | null {
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as SessionPayload;
        return decoded;
    } catch {
        return null;
    }
}

export function authMiddleware(
    req: AuthRequest,
    res: Response,
    next: NextFunction
): void {
    // Check for token in Authorization header or cookie
    const authHeader = req.headers.authorization;
    const tokenFromHeader = authHeader?.startsWith('Bearer ')
        ? authHeader.slice(7)
        : null;
    const tokenFromCookie = req.cookies?.token;

    const token = tokenFromHeader || tokenFromCookie;

    if (!token) {
        res.status(401).json({
            success: false,
            message: 'Authentication required',
        });
        return;
    }

    const decoded = verifyToken(token);

    if (!decoded) {
        res.status(401).json({
            success: false,
            message: 'Invalid or expired token',
        });
        return;
    }

    req.user = decoded;
    next();
}
