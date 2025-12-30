import { Router, Response } from 'express';
import mongoose from 'mongoose';
import Folder from '../models/Folder.js';
import Workflow from '../models/Workflow.js';
import { authMiddleware, AuthRequest } from '../middleware/auth.js';
import { createFolderSchema, updateFolderSchema, folderIdSchema } from '../schemas/folder.js';

const router = Router();

// All routes require authentication
router.use(authMiddleware);

// GET /folder - List user's folders
router.get('/', async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.userId;

        if (!userId) {
            res.status(401).json({ success: false, message: 'User not authenticated' });
            return;
        }

        const parentId = req.query.parentId as string | undefined;

        // Convert userId to ObjectId for query
        const userObjectId = new mongoose.Types.ObjectId(userId);

        const query: Record<string, unknown> = { userId: userObjectId };

        if (parentId) {
            query.parentId = new mongoose.Types.ObjectId(parentId);
        } else {
            query.parentId = null;
        }

        const folders = await Folder.find(query)
            .sort({ updatedAt: -1 })
            .lean();

        // Get workflow counts for each folder
        const folderIds = folders.map(f => f._id);
        const workflowCounts = await Workflow.aggregate([
            { $match: { userId: userObjectId, folderId: { $in: folderIds } } },
            { $group: { _id: '$folderId', count: { $sum: 1 } } }
        ]);

        const countMap = new Map(workflowCounts.map(c => [c._id.toString(), c.count]));

        res.json({
            success: true,
            folders: folders.map((f) => ({
                id: f._id.toString(),
                name: f.name,
                parentId: f.parentId?.toString() || null,
                fileCount: countMap.get(f._id.toString()) || 0,
                createdAt: f.createdAt,
                updatedAt: f.updatedAt,
            })),
        });
    } catch (error) {
        console.error('❌ Get folders error:', error);
        res.status(500).json({ success: false, message: 'Failed to get folders' });
    }
});

// POST /folder - Create new folder
router.post('/', async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.userId;

        if (!userId) {
            res.status(401).json({ success: false, message: 'User not authenticated' });
            return;
        }

        const validation = createFolderSchema.safeParse(req.body);

        if (!validation.success) {
            res.status(400).json({
                success: false,
                message: 'Invalid request',
                errors: validation.error.errors,
            });
            return;
        }

        const { name, parentId } = validation.data;

        // If parentId provided, verify it belongs to user
        if (parentId) {
            const parentFolder = await Folder.findOne({ _id: parentId, userId });
            if (!parentFolder) {
                res.status(404).json({ success: false, message: 'Parent folder not found' });
                return;
            }
        }

        const folder = await Folder.create({
            userId,
            name,
            parentId: parentId || null,
        });

        console.log('✅ Folder created:', folder._id);

        res.status(201).json({
            success: true,
            folder: {
                id: folder._id.toString(),
                name: folder.name,
                parentId: folder.parentId?.toString() || null,
                fileCount: 0,
                createdAt: folder.createdAt,
                updatedAt: folder.updatedAt,
            },
        });
    } catch (error) {
        console.error('❌ Create folder error:', error);
        res.status(500).json({ success: false, message: 'Failed to create folder' });
    }
});

// GET /folder/:id - Get single folder
router.get('/:id', async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.userId;

        if (!userId) {
            res.status(401).json({ success: false, message: 'User not authenticated' });
            return;
        }

        const paramValidation = folderIdSchema.safeParse(req.params);

        if (!paramValidation.success) {
            res.status(400).json({ success: false, message: 'Invalid folder ID' });
            return;
        }

        const folder = await Folder.findOne({
            _id: paramValidation.data.id,
            userId,
        });

        if (!folder) {
            res.status(404).json({ success: false, message: 'Folder not found' });
            return;
        }

        // Get workflow count
        const fileCount = await Workflow.countDocuments({ userId, folderId: folder._id });

        res.json({
            success: true,
            folder: {
                id: folder._id.toString(),
                name: folder.name,
                parentId: folder.parentId?.toString() || null,
                fileCount,
                createdAt: folder.createdAt,
                updatedAt: folder.updatedAt,
            },
        });
    } catch (error) {
        console.error('❌ Get folder error:', error);
        res.status(500).json({ success: false, message: 'Failed to get folder' });
    }
});

// PUT /folder/:id - Update folder
router.put('/:id', async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.userId;

        if (!userId) {
            res.status(401).json({ success: false, message: 'User not authenticated' });
            return;
        }

        const paramValidation = folderIdSchema.safeParse(req.params);

        if (!paramValidation.success) {
            res.status(400).json({ success: false, message: 'Invalid folder ID' });
            return;
        }

        const bodyValidation = updateFolderSchema.safeParse(req.body);

        if (!bodyValidation.success) {
            res.status(400).json({
                success: false,
                message: 'Invalid request',
                errors: bodyValidation.error.errors,
            });
            return;
        }

        const folder = await Folder.findOneAndUpdate(
            { _id: paramValidation.data.id, userId },
            { $set: bodyValidation.data },
            { new: true }
        );

        if (!folder) {
            res.status(404).json({ success: false, message: 'Folder not found' });
            return;
        }

        res.json({
            success: true,
            folder: {
                id: folder._id.toString(),
                name: folder.name,
                parentId: folder.parentId?.toString() || null,
                createdAt: folder.createdAt,
                updatedAt: folder.updatedAt,
            },
        });
    } catch (error) {
        console.error('❌ Update folder error:', error);
        res.status(500).json({ success: false, message: 'Failed to update folder' });
    }
});

// DELETE /folder/:id - Delete folder
router.delete('/:id', async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.userId;

        if (!userId) {
            res.status(401).json({ success: false, message: 'User not authenticated' });
            return;
        }

        const paramValidation = folderIdSchema.safeParse(req.params);

        if (!paramValidation.success) {
            res.status(400).json({ success: false, message: 'Invalid folder ID' });
            return;
        }

        const folder = await Folder.findOneAndDelete({
            _id: paramValidation.data.id,
            userId,
        });

        if (!folder) {
            res.status(404).json({ success: false, message: 'Folder not found' });
            return;
        }

        // Move workflows in this folder to root (null folderId)
        await Workflow.updateMany(
            { userId, folderId: folder._id },
            { $set: { folderId: null } }
        );

        // Move child folders to root
        await Folder.updateMany(
            { userId, parentId: folder._id },
            { $set: { parentId: null } }
        );

        res.json({
            success: true,
            message: 'Folder deleted successfully',
        });
    } catch (error) {
        console.error('❌ Delete folder error:', error);
        res.status(500).json({ success: false, message: 'Failed to delete folder' });
    }
});

export default router;
