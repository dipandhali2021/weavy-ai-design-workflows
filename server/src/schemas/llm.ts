import { z } from 'zod';

// ============================================================================
// LLM Run Schema
// ============================================================================

export const llmRunSchema = z.object({
    model: z.enum(['gemini-2.5-flash', 'gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-1.0-pro']),
    systemPrompt: z.string().optional(),
    userMessage: z.string().min(1, 'User message is required'),
    images: z.array(z.string()).optional(), // base64 encoded strings (without data URI prefix)
});

export type LLMRunInput = z.infer<typeof llmRunSchema>;
