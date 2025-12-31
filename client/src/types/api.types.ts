/**
 * API Types
 * 
 * Centralized type definitions for API requests and responses.
 * These types are shared between the API client and components.
 */

// ============================================================================
// User & Auth Types
// ============================================================================

/**
 * User information returned from the API
 */
export interface User {
    id: string;
    email: string;
    name: string;
    avatar?: string;
}

/**
 * Authentication response from login/session endpoints
 */
export interface AuthResponse {
    success: boolean;
    user?: User;
    token?: string;
    message?: string;
}

// ============================================================================
// Workflow Types
// ============================================================================

/**
 * A node in a workflow graph (API representation)
 */
export interface ApiWorkflowNode {
    id: string;
    type: string;
    position: { x: number; y: number };
    data: Record<string, unknown>;
}

/**
 * An edge connecting two nodes in a workflow (API representation)
 */
export interface ApiWorkflowEdge {
    id: string;
    source: string;
    target: string;
    sourceHandle?: string;
    targetHandle?: string;
    type?: string;
}

/**
 * A workflow document with metadata
 */
export interface Workflow {
    id: string;
    name: string;
    folderId?: string | null;
    nodes?: ApiWorkflowNode[];
    edges?: ApiWorkflowEdge[];
    thumbnail?: string;
    createdAt: string;
    updatedAt: string;
}

/**
 * Data for updating a workflow
 */
export interface UpdateWorkflowData {
    name?: string;
    folderId?: string | null;
    nodes?: ApiWorkflowNode[];
    edges?: ApiWorkflowEdge[];
    thumbnail?: string;
}

/**
 * Response for workflow list requests
 */
export interface WorkflowListResponse {
    success: boolean;
    workflows?: Workflow[];
    message?: string;
}

/**
 * Response for single workflow requests
 */
export interface WorkflowResponse {
    success: boolean;
    workflow?: Workflow;
    message?: string;
}

// ============================================================================
// Folder Types
// ============================================================================

/**
 * A folder for organizing workflows
 */
export interface Folder {
    id: string;
    name: string;
    parentId: string | null;
    fileCount: number;
    createdAt: string;
    updatedAt: string;
}

/**
 * Response for folder list requests
 */
export interface FolderListResponse {
    success: boolean;
    folders?: Folder[];
    message?: string;
}

/**
 * Response for single folder requests
 */
export interface FolderResponse {
    success: boolean;
    folder?: Folder;
    message?: string;
}

// ============================================================================
// LLM Types
// ============================================================================

/**
 * Parameters for running an LLM inference
 */
export interface LLMRunParams {
    model: string;
    systemPrompt?: string;
    userMessage: string;
    images?: string[];
}

/**
 * Response from LLM inference
 */
export interface LLMRunResponse {
    success: boolean;
    output?: string;
    error?: string;
}

// ============================================================================
// Generic Response Types
// ============================================================================

/**
 * Generic success/failure response
 */
export interface ApiResponse {
    success: boolean;
    message?: string;
}
