import { Request, Response, NextFunction, RequestHandler } from 'express';

/**
 * Wraps an async route handler to catch errors and forward them to Express error handler.
 * Eliminates the need for try-catch blocks in every route handler.
 * 
 * @example
 * router.get('/users', asyncHandler(async (req, res) => {
 *   const users = await User.find();
 *   res.json({ success: true, users });
 * }));
 */
export const asyncHandler = <T extends Request = Request>(
    fn: (req: T, res: Response, next: NextFunction) => Promise<void>
): RequestHandler => {
    return (req, res, next) => {
        Promise.resolve(fn(req as T, res, next)).catch(next);
    };
};

export default asyncHandler;
