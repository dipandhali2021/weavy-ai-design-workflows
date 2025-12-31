import { Response } from 'express';
import Workflow from '../models/Workflow.js';
import { AuthRequest } from '../middleware/auth.js';
import { createWorkflowSchema, updateWorkflowSchema, workflowIdSchema } from '../schemas/workflow.js';
import { sendSuccess, sendError, HttpStatus } from '../utils/index.js';
import { WorkflowResponse, WorkflowListItem } from '../types/index.js';

/**
 * Format workflow for list response
 */
const formatWorkflowListItem = (w: {
    _id: unknown;
    name: string;
    thumbnail?: string;
    folderId?: unknown;
    createdAt: Date;
    updatedAt: Date;
}): WorkflowListItem => ({
    id: w._id?.toString() ?? '',
    name: w.name,
    thumbnail: w.thumbnail,
    folderId: w.folderId?.toString() || null,
    createdAt: w.createdAt,
    updatedAt: w.updatedAt,
});

/**
 * Format workflow for full response
 */
const formatWorkflowResponse = (workflow: {
    _id: unknown;
    name: string;
    nodes: unknown[];
    edges: unknown[];
    thumbnail?: string;
    folderId?: unknown;
    createdAt: Date;
    updatedAt: Date;
}): WorkflowResponse => ({
    id: workflow._id?.toString() ?? '',
    name: workflow.name,
    nodes: workflow.nodes as WorkflowResponse['nodes'],
    edges: workflow.edges as WorkflowResponse['edges'],
    thumbnail: workflow.thumbnail,
    folderId: workflow.folderId?.toString() || null,
    createdAt: workflow.createdAt,
    updatedAt: workflow.updatedAt,
});

/**
 * GET /workflow - List user's workflows
 */
export const getWorkflows = async (req: AuthRequest, res: Response): Promise<void> => {
    const userId = req.user?.userId;

    if (!userId) {
        sendError(res, 'User not authenticated', HttpStatus.UNAUTHORIZED);
        return;
    }

    const folderId = req.query.folderId as string | undefined;
    const query: { userId: string; folderId?: string | null } = { userId };

    if (folderId) {
        query.folderId = folderId;
    } else if (folderId === '' || req.query.folderId === null) {
        // Explicitly requesting root folder
        query.folderId = null;
    }
    // If folderId not specified at all, return all workflows

    const workflows = await Workflow.find(query)
        .sort({ updatedAt: -1 })
        .select('_id name thumbnail folderId createdAt updatedAt')
        .lean();

    sendSuccess(res, {
        workflows: workflows.map(formatWorkflowListItem),
    });
};

/**
 * POST /workflow - Create new workflow
 */
export const createWorkflow = async (req: AuthRequest, res: Response): Promise<void> => {
    const userId = req.user?.userId;

    if (!userId) {
        sendError(res, 'User not authenticated', HttpStatus.UNAUTHORIZED);
        return;
    }

    const validation = createWorkflowSchema.safeParse(req.body);

    if (!validation.success) {
        sendError(res, 'Invalid request', HttpStatus.BAD_REQUEST, validation.error.errors);
        return;
    }

    const { name, folderId, nodes, edges } = validation.data;

    const workflow = await Workflow.create({
        userId,
        name,
        folderId: folderId || null,
        nodes,
        edges,
    });

    console.log('✅ Workflow created:', workflow._id);

    sendSuccess(res, { workflow: formatWorkflowResponse(workflow) }, HttpStatus.CREATED);
};

/**
 * GET /workflow/:id - Get single workflow
 */
export const getWorkflow = async (req: AuthRequest, res: Response): Promise<void> => {
    const userId = req.user?.userId;

    if (!userId) {
        sendError(res, 'User not authenticated', HttpStatus.UNAUTHORIZED);
        return;
    }

    const paramValidation = workflowIdSchema.safeParse(req.params);

    if (!paramValidation.success) {
        sendError(res, 'Invalid workflow ID', HttpStatus.BAD_REQUEST);
        return;
    }

    const workflow = await Workflow.findOne({
        _id: paramValidation.data.id,
        userId,
    });

    if (!workflow) {
        sendError(res, 'Workflow not found', HttpStatus.NOT_FOUND);
        return;
    }

    sendSuccess(res, { workflow: formatWorkflowResponse(workflow) });
};

/**
 * PUT /workflow/:id - Update workflow
 */
export const updateWorkflow = async (req: AuthRequest, res: Response): Promise<void> => {
    const userId = req.user?.userId;

    if (!userId) {
        sendError(res, 'User not authenticated', HttpStatus.UNAUTHORIZED);
        return;
    }

    const paramValidation = workflowIdSchema.safeParse(req.params);

    if (!paramValidation.success) {
        sendError(res, 'Invalid workflow ID', HttpStatus.BAD_REQUEST);
        return;
    }

    const bodyValidation = updateWorkflowSchema.safeParse(req.body);

    if (!bodyValidation.success) {
        sendError(res, 'Invalid request', HttpStatus.BAD_REQUEST, bodyValidation.error.errors);
        return;
    }

    const workflow = await Workflow.findOneAndUpdate(
        { _id: paramValidation.data.id, userId },
        { $set: bodyValidation.data },
        { new: true }
    );

    if (!workflow) {
        sendError(res, 'Workflow not found', HttpStatus.NOT_FOUND);
        return;
    }

    sendSuccess(res, { workflow: formatWorkflowResponse(workflow) });
};

/**
 * DELETE /workflow/:id - Delete workflow
 */
export const deleteWorkflow = async (req: AuthRequest, res: Response): Promise<void> => {
    const userId = req.user?.userId;

    if (!userId) {
        sendError(res, 'User not authenticated', HttpStatus.UNAUTHORIZED);
        return;
    }

    const paramValidation = workflowIdSchema.safeParse(req.params);

    if (!paramValidation.success) {
        sendError(res, 'Invalid workflow ID', HttpStatus.BAD_REQUEST);
        return;
    }

    const workflow = await Workflow.findOneAndDelete({
        _id: paramValidation.data.id,
        userId,
    });

    if (!workflow) {
        sendError(res, 'Workflow not found', HttpStatus.NOT_FOUND);
        return;
    }

    sendSuccess(res, { message: 'Workflow deleted successfully' });
};
