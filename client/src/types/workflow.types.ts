import type { Node, Edge } from '@xyflow/react';

// ============================================================================
// Node Data Types
// ============================================================================

export interface TextNodeData {
    [key: string]: unknown;
    text: string;
    label?: string;
    isLocked?: boolean;
}

export interface ImageItem {
    imageUrl: string;
    imageBase64: string;
    fileName: string;
    width?: number;
    height?: number;
}

export interface ImageNodeData {
    [key: string]: unknown;
    images: ImageItem[];
    currentIndex: number;
    viewMode: 'single' | 'all';
    label?: string;
    isLocked?: boolean;
}

export interface LLMNodeData {
    [key: string]: unknown;
    model: GeminiModel;
    systemPrompt?: string;
    userMessage?: string;
    images?: string[]; // base64 encoded
    output?: string;
    isLoading?: boolean;
    error?: string;
    label?: string;
    isLocked?: boolean;
}

// ============================================================================
// Task Manager Types
// ============================================================================

export type RunTaskStatus = 'running' | 'completed' | 'failed';

export interface RunTask {
    id: string;
    nodeId: string;
    nodeName: string;
    status: RunTaskStatus;
    startedAt: Date;
    completedAt?: Date;
    progress?: string; // e.g., "1/1", "2/3"
    error?: string;
}

// ============================================================================
// Gemini Models
// ============================================================================

export type GeminiModel =
    | 'gemini-2.5-flash'
    | 'gemini-1.5-flash'
    | 'gemini-1.5-pro'
    | 'gemini-1.0-pro';

export const GEMINI_MODELS: { value: GeminiModel; label: string }[] = [
    { value: 'gemini-2.5-flash', label: 'Gemini 2.5 Flash' },
    { value: 'gemini-1.5-flash', label: 'Gemini 1.5 Flash' },
    { value: 'gemini-1.5-pro', label: 'Gemini 1.5 Pro' },
    { value: 'gemini-1.0-pro', label: 'Gemini 1.0 Pro' },
];

// ============================================================================
// Node Type Definitions
// ============================================================================

export type TextFlowNode = Node<TextNodeData, 'text'>;
export type ImageFlowNode = Node<ImageNodeData, 'image'>;
export type LLMFlowNode = Node<LLMNodeData, 'llm'>;

export type WorkflowNode = TextFlowNode | ImageFlowNode | LLMFlowNode;
export type WorkflowEdge = Edge;

// ============================================================================
// Handle Types
// ============================================================================

export const LLM_HANDLES = {
    SYSTEM_PROMPT: 'system_prompt',
    USER_MESSAGE: 'user_message',
    IMAGES: 'images',
    OUTPUT: 'output',
} as const;

export const TEXT_HANDLES = {
    OUTPUT: 'output',
} as const;

export const IMAGE_HANDLES = {
    OUTPUT: 'output',
} as const;

// ============================================================================
// API Types
// ============================================================================

export interface LLMRunRequest {
    model: GeminiModel;
    systemPrompt?: string;
    userMessage: string;
    images?: string[]; // base64 encoded without data URI prefix
}

// LLMRunResponse is exported from api.types.ts

// ============================================================================
// Workflow Persistence
// ============================================================================

export interface WorkflowData {
    id?: string;
    name: string;
    nodes: WorkflowNode[];
    edges: WorkflowEdge[];
    viewport?: { x: number; y: number; zoom: number };
}

// ============================================================================
// History for Undo/Redo
// ============================================================================

export interface HistoryState {
    nodes: WorkflowNode[];
    edges: WorkflowEdge[];
}
