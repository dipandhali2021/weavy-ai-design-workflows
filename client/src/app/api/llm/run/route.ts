import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import { z } from 'zod';

// ============================================================================
// Zod Schema for Request Validation
// ============================================================================

const llmRunSchema = z.object({
    model: z.enum(['gemini-2.5-flash', 'gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-1.0-pro']),
    systemPrompt: z.string().optional(),
    userMessage: z.string().min(1, 'User message is required'),
    images: z.array(z.string()).optional(), // base64 encoded strings (without data URI prefix)
});

// ============================================================================
// API Route Handler
// ============================================================================

export async function POST(request: NextRequest) {
    try {
        // Parse and validate request body
        const body = await request.json();
        const validationResult = llmRunSchema.safeParse(body);

        if (!validationResult.success) {
            return NextResponse.json(
                {
                    success: false,
                    error: validationResult.error.errors.map((e) => e.message).join(', '),
                },
                { status: 400 }
            );
        }

        const { model, systemPrompt, userMessage, images } = validationResult.data;

        // Check for API key
        const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
        if (!apiKey) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'GOOGLE_GEMINI_API_KEY is not configured. Please add it to your .env file.',
                },
                { status: 500 }
            );
        }

        // Initialize Gemini
        const genAI = new GoogleGenerativeAI(apiKey);

        // Select the appropriate model
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
                // Detect image type from base64 or default to jpeg
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

        return NextResponse.json({
            success: true,
            output: text,
        });
    } catch (error) {
        console.error('LLM API Error:', error);

        // Handle specific error types
        if (error instanceof Error) {
            // Check for quota/rate limit errors
            if (error.message.includes('quota') || error.message.includes('rate')) {
                return NextResponse.json(
                    {
                        success: false,
                        error: 'API quota exceeded. Please try again later or check your API key limits.',
                    },
                    { status: 429 }
                );
            }

            // Check for invalid API key
            if (error.message.includes('API key') || error.message.includes('authentication')) {
                return NextResponse.json(
                    {
                        success: false,
                        error: 'Invalid API key. Please check your GOOGLE_GEMINI_API_KEY.',
                    },
                    { status: 401 }
                );
            }

            return NextResponse.json(
                {
                    success: false,
                    error: error.message,
                },
                { status: 500 }
            );
        }

        return NextResponse.json(
            {
                success: false,
                error: 'An unexpected error occurred while processing your request.',
            },
            { status: 500 }
        );
    }
}
