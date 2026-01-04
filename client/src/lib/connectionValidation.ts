import type { Connection } from '@xyflow/react';
import type { WorkflowNode, WorkflowEdge } from '@/types/workflow.types';

// ============================================================================
// Data Types for Handles
// ============================================================================

export type HandleDataType = 'text' | 'image';

/**
 * Maps source node type + handle to the data type it outputs.
 */
export function getSourceDataType(
    nodeType: string | undefined,
    handleId: string | null | undefined
): HandleDataType | null {
    if (!nodeType) return null;

    switch (nodeType) {
        case 'text':
            // Text node output is always text
            if (handleId === 'output') return 'text';
            break;
        case 'image':
            // Image node output is always image
            if (handleId === 'output') return 'image';
            break;
        case 'llm':
            // LLM node output is text
            if (handleId === 'output') return 'text';
            break;
    }
    return null;
}

/**
 * Maps target node type + handle to the expected input data type.
 */
export function getTargetExpectedType(
    nodeType: string | undefined,
    handleId: string | null | undefined
): HandleDataType | null {
    if (!nodeType || !handleId) return null;

    switch (nodeType) {
        case 'text':
            // Text node input expects text
            if (handleId === 'input') return 'text';
            break;
        case 'llm':
            // LLM node has multiple inputs
            if (handleId === 'system_prompt') return 'text';
            if (handleId === 'user_message') return 'text';
            if (handleId === 'images') return 'image';
            break;
        case 'image':
            // Image node has no inputs
            break;
    }
    return null;
}

// ============================================================================
// Type-Safe Connection Validation
// ============================================================================

/**
 * Checks if a connection is type-compatible.
 * Returns true if the connection is valid, false otherwise.
 */
export function isConnectionTypeValid(
    connection: Connection,
    nodes: WorkflowNode[]
): boolean {
    const sourceNode = nodes.find((n) => n.id === connection.source);
    const targetNode = nodes.find((n) => n.id === connection.target);

    if (!sourceNode || !targetNode) return false;

    const sourceType = getSourceDataType(sourceNode.type, connection.sourceHandle);
    const targetExpected = getTargetExpectedType(targetNode.type, connection.targetHandle);

    // If we can't determine types, allow the connection (fail-open for unknown types)
    if (sourceType === null || targetExpected === null) return true;

    return sourceType === targetExpected;
}

// ============================================================================
// DAG Validation (Cycle Detection)
// ============================================================================

/**
 * Builds an adjacency list from edges.
 * Returns a Map where key is source node ID, value is array of target node IDs.
 */
function buildAdjacencyList(edges: WorkflowEdge[]): Map<string, string[]> {
    const adjacency = new Map<string, string[]>();

    for (const edge of edges) {
        const targets = adjacency.get(edge.source) || [];
        targets.push(edge.target);
        adjacency.set(edge.source, targets);
    }

    return adjacency;
}

/**
 * Detects if adding a new edge would create a cycle in the graph.
 * Uses DFS to check if there's a path from target to source (which would create a cycle).
 * 
 * @returns true if adding the edge would create a cycle, false otherwise.
 */
export function wouldCreateCycle(
    edges: WorkflowEdge[],
    newSource: string,
    newTarget: string
): boolean {
    // Self-loop is always a cycle
    if (newSource === newTarget) return true;

    // Build adjacency list including the new edge
    const adjacency = buildAdjacencyList(edges);

    // Add the new edge to the adjacency list
    const existingTargets = adjacency.get(newSource) || [];
    existingTargets.push(newTarget);
    adjacency.set(newSource, existingTargets);

    // DFS to detect if there's a path from newTarget back to newSource
    const visited = new Set<string>();
    const stack = [newTarget];

    while (stack.length > 0) {
        const current = stack.pop()!;

        if (current === newSource) {
            // Found a path back to source = cycle!
            return true;
        }

        if (visited.has(current)) continue;
        visited.add(current);

        const neighbors = adjacency.get(current) || [];
        for (const neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                stack.push(neighbor);
            }
        }
    }

    return false;
}

// ============================================================================
// Duplicate Connection Check
// ============================================================================

/**
 * Checks if a connection already exists between the same source and target handles.
 */
export function isDuplicateConnection(
    connection: Connection,
    edges: WorkflowEdge[]
): boolean {
    return edges.some(
        (edge) =>
            edge.source === connection.source &&
            edge.target === connection.target &&
            edge.sourceHandle === connection.sourceHandle &&
            edge.targetHandle === connection.targetHandle
    );
}

// ============================================================================
// Combined Validation
// ============================================================================

export interface ConnectionValidationResult {
    valid: boolean;
    error: string | null;
}

/**
 * Validates a connection for all error types.
 * Returns a result object with valid status and error message if invalid.
 */
export function validateConnection(
    connection: Connection,
    nodes: WorkflowNode[],
    edges: WorkflowEdge[]
): ConnectionValidationResult {
    // Check for missing source/target
    if (!connection.source || !connection.target) {
        return { valid: false, error: 'Invalid connection: missing source or target' };
    }

    // Check for self-loop
    if (connection.source === connection.target) {
        return { valid: false, error: 'Cannot connect a node to itself' };
    }

    // Check for duplicate connection
    if (isDuplicateConnection(connection, edges)) {
        return { valid: false, error: 'This connection already exists' };
    }

    // Check for type compatibility
    if (!isConnectionTypeValid(connection, nodes)) {
        const sourceNode = nodes.find((n) => n.id === connection.source);
        const targetNode = nodes.find((n) => n.id === connection.target);
        const sourceType = getSourceDataType(sourceNode?.type, connection.sourceHandle);
        const targetExpected = getTargetExpectedType(targetNode?.type, connection.targetHandle);

        return {
            valid: false,
            error: `Type mismatch: ${sourceType || 'unknown'} output cannot connect to ${targetExpected || 'unknown'} input`,
        };
    }

    // Check for cycle
    if (wouldCreateCycle(edges, connection.source, connection.target)) {
        return { valid: false, error: 'Cannot create circular connection (would create a cycle)' };
    }

    return { valid: true, error: null };
}

/**
 * Quick validation check for React Flow's isValidConnection callback.
 * This is called during drag operations for visual feedback.
 */
export function isValidConnection(
    connection: Connection,
    nodes: WorkflowNode[],
    edges: WorkflowEdge[]
): boolean {
    return validateConnection(connection, nodes, edges).valid;
}
