import { type WorkflowNode, type WorkflowEdge } from '@/types/workflow.types';

/**
 * Sample Product Listing Generator Workflow
 * 
 * Flow:
 * - 3 Image nodes → "Analyze product" LLM
 * - System prompt → "Analyze product" LLM
 * - Product specs → "Analyze product" LLM
 * - "Analyze product" output → 3 downstream LLM nodes (Amazon, Instagram, SEO)
 * - Each downstream LLM → Output Text node
 */
export const productListingWorkflow = {
    name: 'Product Listing Generator',
    nodes: [
        // ========== INPUT LAYER (Left) ==========
        // Product Images
        {
            id: 'img-1',
            type: 'image',
            position: { x: 50, y: 50 },
            data: { images: [], currentIndex: 0, viewMode: 'single' },
        },
        {
            id: 'img-2',
            type: 'image',
            position: { x: 50, y: 280 },
            data: { images: [], currentIndex: 0, viewMode: 'single' },
        },
        {
            id: 'img-3',
            type: 'image',
            position: { x: 50, y: 510 },
            data: { images: [], currentIndex: 0, viewMode: 'single' },
        },
        // System Prompt
        {
            id: 'system-prompt',
            type: 'text',
            position: { x: 50, y: 740 },
            data: {
                text: 'You are a professional e-commerce copywriter and product analyst. Analyze product images and specs to create compelling, SEO-optimized content that drives conversions.',
            },
        },
        // Product Specs
        {
            id: 'product-specs',
            type: 'text',
            position: { x: 50, y: 970 },
            data: {
                text: 'Product Name: Mini Projector\n\nKey Features:\n- 1080p Full HD\n- WiFi & Bluetooth\n- Portable design\n\nDimensions: 5.9 x 4.3 x 2.1 inches\nPrice: $89.99',
            },
        },

        // ========== ANALYZE LAYER (Middle) ==========
        // Analyze Product LLM - receives images + system prompt + product specs
        {
            id: 'llm-analyze',
            type: 'llm',
            position: { x: 400, y: 280 },
            data: {
                model: 'gemini-2.5-flash',
            },
        },

        // ========== CONTENT GENERATION LAYER ==========
        // Amazon prompt
        {
            id: 'prompt-amazon',
            type: 'text',
            position: { x: 750, y: 50 },
            data: {
                text: 'Based on the product analysis, write a compelling Amazon product listing with:\n- Attention-grabbing title (under 200 chars)\n- 5 bullet points highlighting key benefits\n- Detailed product description\n- Keywords for search optimization',
            },
        },
        // Amazon LLM
        {
            id: 'llm-amazon',
            type: 'llm',
            position: { x: 1100, y: 50 },
            data: {
                model: 'gemini-2.5-flash',
            },
        },
        // Amazon Result (Output Text Node)
        {
            id: 'result-amazon',
            type: 'text',
            position: { x: 1450, y: 50 },
            data: {
                text: '(Amazon listing will appear here after running)',
            },
        },

        // Instagram prompt
        {
            id: 'prompt-instagram',
            type: 'text',
            position: { x: 750, y: 350 },
            data: {
                text: 'Create an engaging Instagram caption for this product that:\n- Hooks attention in the first line\n- Highlights 3 key benefits\n- Includes relevant emojis\n- Ends with a call-to-action\n- Suggests 10 relevant hashtags',
            },
        },
        // Instagram LLM
        {
            id: 'llm-instagram',
            type: 'llm',
            position: { x: 1100, y: 350 },
            data: {
                model: 'gemini-2.5-flash',
            },
        },
        // Instagram Result (Output Text Node)
        {
            id: 'result-instagram',
            type: 'text',
            position: { x: 1450, y: 350 },
            data: {
                text: '(Instagram caption will appear here after running)',
            },
        },

        // SEO prompt
        {
            id: 'prompt-seo',
            type: 'text',
            position: { x: 750, y: 650 },
            data: {
                text: 'Write an SEO meta description (under 160 chars) that:\n- Includes primary keywords naturally\n- Has a compelling value proposition\n- Encourages click-through\nAlso provide a suggested meta title (under 60 chars).',
            },
        },
        // SEO LLM
        {
            id: 'llm-seo',
            type: 'llm',
            position: { x: 1100, y: 650 },
            data: {
                model: 'gemini-2.5-flash',
            },
        },
        // SEO Result (Output Text Node)
        {
            id: 'result-seo',
            type: 'text',
            position: { x: 1450, y: 650 },
            data: {
                text: '(SEO meta will appear here after running)',
            },
        },
    ] as WorkflowNode[],
    edges: [
        // ========== INPUTS TO ANALYZE LLM ==========
        // Images to Analyze LLM
        {
            id: 'e-img1-analyze',
            source: 'img-1',
            sourceHandle: 'output',
            target: 'llm-analyze',
            targetHandle: 'images',
            animated: true,
            style: { stroke: '#8B5CF6', strokeWidth: 2 },
        },
        {
            id: 'e-img2-analyze',
            source: 'img-2',
            sourceHandle: 'output',
            target: 'llm-analyze',
            targetHandle: 'images',
            animated: true,
            style: { stroke: '#8B5CF6', strokeWidth: 2 },
        },
        {
            id: 'e-img3-analyze',
            source: 'img-3',
            sourceHandle: 'output',
            target: 'llm-analyze',
            targetHandle: 'images',
            animated: true,
            style: { stroke: '#8B5CF6', strokeWidth: 2 },
        },
        // System prompt to Analyze LLM
        {
            id: 'e-system-analyze',
            source: 'system-prompt',
            sourceHandle: 'output',
            target: 'llm-analyze',
            targetHandle: 'system_prompt',
            animated: true,
            style: { stroke: '#8B5CF6', strokeWidth: 2 },
        },
        // Product specs to Analyze LLM
        {
            id: 'e-specs-analyze',
            source: 'product-specs',
            sourceHandle: 'output',
            target: 'llm-analyze',
            targetHandle: 'user_message',
            animated: true,
            style: { stroke: '#8B5CF6', strokeWidth: 2 },
        },

        // ========== ANALYZE OUTPUT TO DOWNSTREAM LLMs ==========
        // Analyze output → Amazon LLM (as system context)
        {
            id: 'e-analyze-amazon',
            source: 'llm-analyze',
            sourceHandle: 'output',
            target: 'llm-amazon',
            targetHandle: 'system_prompt',
            animated: true,
            style: { stroke: '#8B5CF6', strokeWidth: 2 },
        },
        // Analyze output → Instagram LLM (as system context)
        {
            id: 'e-analyze-instagram',
            source: 'llm-analyze',
            sourceHandle: 'output',
            target: 'llm-instagram',
            targetHandle: 'system_prompt',
            animated: true,
            style: { stroke: '#8B5CF6', strokeWidth: 2 },
        },
        // Analyze output → SEO LLM (as system context)
        {
            id: 'e-analyze-seo',
            source: 'llm-analyze',
            sourceHandle: 'output',
            target: 'llm-seo',
            targetHandle: 'system_prompt',
            animated: true,
            style: { stroke: '#8B5CF6', strokeWidth: 2 },
        },

        // ========== PROMPTS TO DOWNSTREAM LLMs ==========
        // Amazon prompt to Amazon LLM
        {
            id: 'e-prompt-amazon',
            source: 'prompt-amazon',
            sourceHandle: 'output',
            target: 'llm-amazon',
            targetHandle: 'user_message',
            animated: true,
            style: { stroke: '#8B5CF6', strokeWidth: 2 },
        },
        // Instagram prompt to Instagram LLM
        {
            id: 'e-prompt-instagram',
            source: 'prompt-instagram',
            sourceHandle: 'output',
            target: 'llm-instagram',
            targetHandle: 'user_message',
            animated: true,
            style: { stroke: '#8B5CF6', strokeWidth: 2 },
        },
        // SEO prompt to SEO LLM
        {
            id: 'e-prompt-seo',
            source: 'prompt-seo',
            sourceHandle: 'output',
            target: 'llm-seo',
            targetHandle: 'user_message',
            animated: true,
            style: { stroke: '#8B5CF6', strokeWidth: 2 },
        },

        // ========== LLM OUTPUTS TO RESULT TEXT NODES ==========
        // Amazon LLM output → Amazon Result Text
        {
            id: 'e-amazon-result',
            source: 'llm-amazon',
            sourceHandle: 'output',
            target: 'result-amazon',
            targetHandle: 'input',
            animated: true,
            style: { stroke: '#8B5CF6', strokeWidth: 2 },
        },
        // Instagram LLM output → Instagram Result Text
        {
            id: 'e-instagram-result',
            source: 'llm-instagram',
            sourceHandle: 'output',
            target: 'result-instagram',
            targetHandle: 'input',
            animated: true,
            style: { stroke: '#8B5CF6', strokeWidth: 2 },
        },
        // SEO LLM output → SEO Result Text
        {
            id: 'e-seo-result',
            source: 'llm-seo',
            sourceHandle: 'output',
            target: 'result-seo',
            targetHandle: 'input',
            animated: true,
            style: { stroke: '#8B5CF6', strokeWidth: 2 },
        },
    ] as WorkflowEdge[],
};

/**
 * Simple demo workflow for testing
 */
export const simpleTestWorkflow = {
    name: 'Simple LLM Test',
    nodes: [
        {
            id: 'text-1',
            type: 'text',
            position: { x: 100, y: 100 },
            data: {
                text: 'You are a helpful AI assistant.',
            },
        },
        {
            id: 'text-2',
            type: 'text',
            position: { x: 100, y: 300 },
            data: {
                text: 'Explain quantum computing in simple terms.',
            },
        },
        {
            id: 'llm-1',
            type: 'llm',
            position: { x: 450, y: 150 },
            data: {
                model: 'gemini-2.5-flash',
            },
        },
    ] as WorkflowNode[],
    edges: [
        {
            id: 'e-text1-llm',
            source: 'text-1',
            sourceHandle: 'output',
            target: 'llm-1',
            targetHandle: 'system_prompt',
            animated: true,
            style: { stroke: '#8B5CF6', strokeWidth: 2 },
        },
        {
            id: 'e-text2-llm',
            source: 'text-2',
            sourceHandle: 'output',
            target: 'llm-1',
            targetHandle: 'user_message',
            animated: true,
            style: { stroke: '#8B5CF6', strokeWidth: 2 },
        },
    ] as WorkflowEdge[],
};
