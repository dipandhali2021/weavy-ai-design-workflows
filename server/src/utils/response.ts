import { Response } from 'express';

/**
 * Standardized API response helpers for consistent response structure.
 */

export interface ApiSuccessResponse<T = unknown> {
    success: true;
    data?: T;
    message?: string;
}

export interface ApiErrorResponse {
    success: false;
    message: string;
    errors?: unknown[];
}

export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse;

/**
 * Send a success response with data
 */
export const sendSuccess = <T>(
    res: Response,
    data: T,
    statusCode: number = 200
): void => {
    res.status(statusCode).json({
        success: true,
        ...data,
    });
};

/**
 * Send an error response
 */
export const sendError = (
    res: Response,
    message: string,
    statusCode: number = 500,
    errors?: unknown[]
): void => {
    const response: ApiErrorResponse = {
        success: false,
        message,
    };

    if (errors) {
        response.errors = errors;
    }

    res.status(statusCode).json(response);
};

/**
 * Common HTTP status codes
 */
export const HttpStatus = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    TOO_MANY_REQUESTS: 429,
    INTERNAL_SERVER_ERROR: 500,
} as const;
