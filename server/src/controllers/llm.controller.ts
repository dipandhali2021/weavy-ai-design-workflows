import { Request, Response } from 'express';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import { llmRunSchema } from '../schemas/llm.js';
import { sendSuccess, sendError, HttpStatus } from '../utils/index.js';

/**
 * Detect MIME type from base64 image data
 */
const detectImageMimeType = (imageBase64: string): string => {
    if (imageBase64.startsWith('/9j/')) return 'image/jpeg';
    if (imageBase64.startsWith('iVBORw')) return 'image/png';
    if (imageBase64.startsWith('R0lGOD')) return 'image/gif';
    if (imageBase64.startsWith('UklGR')) return 'image/webp';
    return 'image/jpeg';
};

/**
 * Default safety settings for Gemini
 */
const SAFETY_SETTINGS = [
    { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
];

/**
 * POST /llm/run - Execute LLM request
 */
export const runLLM = async (req: Request, res: Response): Promise<void> => {
    // Validate request body
    const validationResult = llmRunSchema.safeParse(req.body);

    if (!validationResult.success) {
        sendError(
            res,
            validationResult.error.errors.map((e) => e.message).join(', '),
            HttpStatus.BAD_REQUEST
        );
        return;
    }

    const { model, systemPrompt, userMessage, images } = validationResult.data;

    // Check for API key
    const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
    if (!apiKey) {
        sendError(
            res,
            'GOOGLE_GEMINI_API_KEY is not configured. Please add it to your .env file.',
            HttpStatus.INTERNAL_SERVER_ERROR
        );
        return;
    }

    // Initialize Gemini
    const genAI = new GoogleGenerativeAI(apiKey);
    const generativeModel = genAI.getGenerativeModel({
        model,
        safetySettings: SAFETY_SETTINGS,
    });

    // Build the prompt parts
    const parts: Array<{ text: string } | { inlineData: { mimeType: string; data: string } }> = [];

    // Add system prompt if provided
    if (systemPrompt) {
        parts.push({ text: `System Instructions: ${systemPrompt}\n\n` });
    }

    // Add user message
    parts.push({ text: userMessage });

    // Add images if provided (multimodal support)
    if (images && images.length > 0) {
        for (const imageBase64 of images) {
            parts.push({
                inlineData: {
                    mimeType: detectImageMimeType(imageBase64),
                    data: imageBase64,
                },
            });
        }
    }

    try {
        // Generate content
        const result = await generativeModel.generateContent(parts);
        const response = await result.response;
        const text = response.text();

        sendSuccess(res, { output: text });
    } catch (error) {
        console.error('❌ LLM API Error:', error);

        if (error instanceof Error) {
            // Check for quota/rate limit errors
            if (error.message.includes('quota') || error.message.includes('rate')) {
                sendError(
                    res,
                    'API quota exceeded. Please try again later or check your API key limits.',
                    HttpStatus.TOO_MANY_REQUESTS
                );
                return;
            }

            // Check for invalid API key
            if (error.message.includes('API key') || error.message.includes('authentication')) {
                sendError(res, 'Invalid API key. Please check your GOOGLE_GEMINI_API_KEY.', HttpStatus.UNAUTHORIZED);
                return;
            }

            sendError(res, error.message, HttpStatus.INTERNAL_SERVER_ERROR);
            return;
        }

        sendError(res, 'An unexpected error occurred while processing your request.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
};
