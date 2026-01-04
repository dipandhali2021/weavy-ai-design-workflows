import type {
    TextNodeData,
    ImageNodeData,
    LLMNodeData,
    GeminiModel,
} from '@/types/workflow.types';

// ============================================================================
// ID Generators
// ============================================================================

let nodeIdCounter = 0;

export const generateNodeId = () => `node_${Date.now()}_${++nodeIdCounter}`;

export const generateEdgeId = (
    source: string,
    target: string,
    sourceHandle?: string,
    targetHandle?: string
) => `e_${source}_${sourceHandle || 's'}_${target}_${targetHandle || 't'}`;

export const generateTaskId = () => `task_${Date.now()}_${++nodeIdCounter}`;

// ============================================================================
// Default Node Data
// ============================================================================

export const getDefaultNodeData = (
    type: 'text' | 'image' | 'llm'
): TextNodeData | ImageNodeData | LLMNodeData => {
    switch (type) {
        case 'text':
            return { text: '' };
        case 'image':
            return { images: [], currentIndex: 0, viewMode: 'single' as const };
        case 'llm':
            return { model: 'gemini-2.5-flash' as GeminiModel };
    }
};
