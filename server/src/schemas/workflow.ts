import { z } from 'zod';

// Node position schema
const positionSchema = z.object({
    x: z.number(),
    y: z.number(),
});

// Workflow node schema
const workflowNodeSchema = z.object({
    id: z.string(),
    type: z.string(),
    position: positionSchema,
    data: z.record(z.unknown()).default({}),
});

// Workflow edge schema
const workflowEdgeSchema = z.object({
    id: z.string(),
    source: z.string(),
    target: z.string(),
    sourceHandle: z.string().optional(),
    targetHandle: z.string().optional(),
    type: z.string().optional(),
});

// Create workflow schema
export const createWorkflowSchema = z.object({
    name: z.string().min(1).max(200).default('untitled'),
    folderId: z.string().regex(/^[a-f\d]{24}$/i, 'Invalid folder ID').optional().nullable(),
    nodes: z.array(workflowNodeSchema).optional().default([]),
    edges: z.array(workflowEdgeSchema).optional().default([]),
});

// Update workflow schema
export const updateWorkflowSchema = z.object({
    name: z.string().min(1).max(200).optional(),
    folderId: z.string().regex(/^[a-f\d]{24}$/i, 'Invalid folder ID').optional().nullable(),
    nodes: z.array(workflowNodeSchema).optional(),
    edges: z.array(workflowEdgeSchema).optional(),
    thumbnail: z.string().optional(),
});

// Workflow ID param schema
export const workflowIdSchema = z.object({
    id: z.string().regex(/^[a-f\d]{24}$/i, 'Invalid workflow ID'),
});

export type CreateWorkflowInput = z.infer<typeof createWorkflowSchema>;
export type UpdateWorkflowInput = z.infer<typeof updateWorkflowSchema>;
