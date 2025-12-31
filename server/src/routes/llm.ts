import { Router, Request, Response } from 'express';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import { llmRunSchema } from '../schemas/llm.js';

const router = Router();

// ============================================================================
// POST /llm/run - Execute LLM request
// ============================================================================

router.post('/run', async (req: Request, res: Response) => {
    try {
        // Validate request body
        const validationResult = llmRunSchema.safeParse(req.body);

        if (!validationResult.success) {
            res.status(400).json({
                success: false,
                error: validationResult.error.errors.map((e) => e.message).join(', '),
            });
            return;
        }

        const { model, systemPrompt, userMessage, images } = validationResult.data;

        // Check for API key
        const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
        if (!apiKey) {
            res.status(500).json({
                success: false,
                error: 'GOOGLE_GEMINI_API_KEY is not configured. Please add it to your .env file.',
            });
            return;
        }

        // Initialize Gemini
        const genAI = new GoogleGenerativeAI(apiKey);

        // Select the appropriate model with safety settings
        const generativeModel = genAI.getGenerativeModel({
            model,
            safetySettings: [
                {
                    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                },
                {
                    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                },
                {
                    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                },
                {
                    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                },
            ],
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
                // Detect image type from base64 magic bytes
                let mimeType = 'image/jpeg';
                if (imageBase64.startsWith('/9j/')) {
                    mimeType = 'image/jpeg';
                } else if (imageBase64.startsWith('iVBORw')) {
                    mimeType = 'image/png';
                } else if (imageBase64.startsWith('R0lGOD')) {
                    mimeType = 'image/gif';
                } else if (imageBase64.startsWith('UklGR')) {
                    mimeType = 'image/webp';
                }

                parts.push({
                    inlineData: {
                        mimeType,
                        data: imageBase64,
                    },
                });
            }
        }

        // Generate content
        const result = await generativeModel.generateContent(parts);
        const response = await result.response;
        const text = response.text();

        res.json({
            success: true,
            output: text,
        });
    } catch (error) {
        console.error('❌ LLM API Error:', error);

        // Handle specific error types
        if (error instanceof Error) {
            // Check for quota/rate limit errors
            if (error.message.includes('quota') || error.message.includes('rate')) {
                res.status(429).json({
                    success: false,
                    error: 'API quota exceeded. Please try again later or check your API key limits.',
                });
                return;
            }

            // Check for invalid API key
            if (error.message.includes('API key') || error.message.includes('authentication')) {
                res.status(401).json({
                    success: false,
                    error: 'Invalid API key. Please check your GOOGLE_GEMINI_API_KEY.',
                });
                return;
            }

            res.status(500).json({
                success: false,
                error: error.message,
            });
            return;
        }

        res.status(500).json({
            success: false,
            error: 'An unexpected error occurred while processing your request.',
        });
    }
});

export default router;
