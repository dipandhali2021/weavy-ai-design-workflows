import { Router, Response } from 'express';
import Workflow from '../models/Workflow.js';
import { authMiddleware, AuthRequest } from '../middleware/auth.js';
import { createWorkflowSchema, updateWorkflowSchema, workflowIdSchema } from '../schemas/workflow.js';

const router = Router();

// All routes require authentication
router.use(authMiddleware);

// GET /workflow - List user's workflows
router.get('/', async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.userId;

        if (!userId) {
            res.status(401).json({ success: false, message: 'User not authenticated' });
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

        res.json({
            success: true,
            workflows: workflows.map((w) => ({
                id: w._id.toString(),
                name: w.name,
                thumbnail: w.thumbnail,
                folderId: w.folderId?.toString() || null,
                createdAt: w.createdAt,
                updatedAt: w.updatedAt,
            })),
        });
    } catch (error) {
        console.error('❌ Get workflows error:', error);
        res.status(500).json({ success: false, message: 'Failed to get workflows' });
    }
});

// POST /workflow - Create new workflow
router.post('/', async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.userId;

        if (!userId) {
            res.status(401).json({ success: false, message: 'User not authenticated' });
            return;
        }

        const validation = createWorkflowSchema.safeParse(req.body);

        if (!validation.success) {
            res.status(400).json({
                success: false,
                message: 'Invalid request',
                errors: validation.error.errors,
            });
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

        res.status(201).json({
            success: true,
            workflow: {
                id: workflow._id.toString(),
                name: workflow.name,
                folderId: workflow.folderId?.toString() || null,
                nodes: workflow.nodes,
                edges: workflow.edges,
                createdAt: workflow.createdAt,
                updatedAt: workflow.updatedAt,
            },
        });
    } catch (error) {
        console.error('❌ Create workflow error:', error);
        res.status(500).json({ success: false, message: 'Failed to create workflow' });
    }
});

// GET /workflow/:id - Get single workflow
router.get('/:id', async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.userId;

        if (!userId) {
            res.status(401).json({ success: false, message: 'User not authenticated' });
            return;
        }

        const paramValidation = workflowIdSchema.safeParse(req.params);

        if (!paramValidation.success) {
            res.status(400).json({ success: false, message: 'Invalid workflow ID' });
            return;
        }

        const workflow = await Workflow.findOne({
            _id: paramValidation.data.id,
            userId,
        });

        if (!workflow) {
            res.status(404).json({ success: false, message: 'Workflow not found' });
            return;
        }

        res.json({
            success: true,
            workflow: {
                id: workflow._id.toString(),
                name: workflow.name,
                nodes: workflow.nodes,
                edges: workflow.edges,
                thumbnail: workflow.thumbnail,
                createdAt: workflow.createdAt,
                updatedAt: workflow.updatedAt,
            },
        });
    } catch (error) {
        console.error('❌ Get workflow error:', error);
        res.status(500).json({ success: false, message: 'Failed to get workflow' });
    }
});

// PUT /workflow/:id - Update workflow
router.put('/:id', async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.userId;

        if (!userId) {
            res.status(401).json({ success: false, message: 'User not authenticated' });
            return;
        }

        const paramValidation = workflowIdSchema.safeParse(req.params);

        if (!paramValidation.success) {
            res.status(400).json({ success: false, message: 'Invalid workflow ID' });
            return;
        }

        const bodyValidation = updateWorkflowSchema.safeParse(req.body);

        if (!bodyValidation.success) {
            res.status(400).json({
                success: false,
                message: 'Invalid request',
                errors: bodyValidation.error.errors,
            });
            return;
        }

        const workflow = await Workflow.findOneAndUpdate(
            { _id: paramValidation.data.id, userId },
            { $set: bodyValidation.data },
            { new: true }
        );

        if (!workflow) {
            res.status(404).json({ success: false, message: 'Workflow not found' });
            return;
        }

        res.json({
            success: true,
            workflow: {
                id: workflow._id.toString(),
                name: workflow.name,
                nodes: workflow.nodes,
                edges: workflow.edges,
                thumbnail: workflow.thumbnail,
                createdAt: workflow.createdAt,
                updatedAt: workflow.updatedAt,
            },
        });
    } catch (error) {
        console.error('❌ Update workflow error:', error);
        res.status(500).json({ success: false, message: 'Failed to update workflow' });
    }
});

// DELETE /workflow/:id - Delete workflow
router.delete('/:id', async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.userId;

        if (!userId) {
            res.status(401).json({ success: false, message: 'User not authenticated' });
            return;
        }

        const paramValidation = workflowIdSchema.safeParse(req.params);

        if (!paramValidation.success) {
            res.status(400).json({ success: false, message: 'Invalid workflow ID' });
            return;
        }

        const workflow = await Workflow.findOneAndDelete({
            _id: paramValidation.data.id,
            userId,
        });

        if (!workflow) {
            res.status(404).json({ success: false, message: 'Workflow not found' });
            return;
        }

        res.json({
            success: true,
            message: 'Workflow deleted successfully',
        });
    } catch (error) {
        console.error('❌ Delete workflow error:', error);
        res.status(500).json({ success: false, message: 'Failed to delete workflow' });
    }
});

export default router;
