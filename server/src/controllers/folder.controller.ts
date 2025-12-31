import { Response } from 'express';
import mongoose from 'mongoose';
import Folder from '../models/Folder.js';
import Workflow from '../models/Workflow.js';
import { AuthRequest } from '../middleware/auth.js';
import { createFolderSchema, updateFolderSchema, folderIdSchema } from '../schemas/folder.js';
import { sendSuccess, sendError, HttpStatus } from '../utils/index.js';
import { FolderResponse } from '../types/index.js';

/**
 * Format folder for API response
 */
const formatFolderResponse = (folder: {
    _id: unknown;
    name: string;
    parentId?: unknown;
    createdAt: Date;
    updatedAt: Date;
}, fileCount: number = 0): FolderResponse => ({
    id: folder._id?.toString() ?? '',
    name: folder.name,
    parentId: folder.parentId?.toString() || null,
    fileCount,
    createdAt: folder.createdAt,
    updatedAt: folder.updatedAt,
});

/**
 * GET /folder - List user's folders
 */
export const getFolders = async (req: AuthRequest, res: Response): Promise<void> => {
    const userId = req.user?.userId;

    if (!userId) {
        sendError(res, 'User not authenticated', HttpStatus.UNAUTHORIZED);
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

    sendSuccess(res, {
        folders: folders.map(f => formatFolderResponse(f, countMap.get(f._id.toString()) || 0)),
    });
};

/**
 * POST /folder - Create new folder
 */
export const createFolder = async (req: AuthRequest, res: Response): Promise<void> => {
    const userId = req.user?.userId;

    if (!userId) {
        sendError(res, 'User not authenticated', HttpStatus.UNAUTHORIZED);
        return;
    }

    const validation = createFolderSchema.safeParse(req.body);

    if (!validation.success) {
        sendError(res, 'Invalid request', HttpStatus.BAD_REQUEST, validation.error.errors);
        return;
    }

    const { name, parentId } = validation.data;

    // If parentId provided, verify it belongs to user
    if (parentId) {
        const parentFolder = await Folder.findOne({ _id: parentId, userId });
        if (!parentFolder) {
            sendError(res, 'Parent folder not found', HttpStatus.NOT_FOUND);
            return;
        }
    }

    const folder = await Folder.create({
        userId,
        name,
        parentId: parentId || null,
    });

    console.log('✅ Folder created:', folder._id);

    sendSuccess(res, { folder: formatFolderResponse(folder) }, HttpStatus.CREATED);
};

/**
 * GET /folder/:id - Get single folder
 */
export const getFolder = async (req: AuthRequest, res: Response): Promise<void> => {
    const userId = req.user?.userId;

    if (!userId) {
        sendError(res, 'User not authenticated', HttpStatus.UNAUTHORIZED);
        return;
    }

    const paramValidation = folderIdSchema.safeParse(req.params);

    if (!paramValidation.success) {
        sendError(res, 'Invalid folder ID', HttpStatus.BAD_REQUEST);
        return;
    }

    const folder = await Folder.findOne({
        _id: paramValidation.data.id,
        userId,
    });

    if (!folder) {
        sendError(res, 'Folder not found', HttpStatus.NOT_FOUND);
        return;
    }

    // Get workflow count
    const fileCount = await Workflow.countDocuments({ userId, folderId: folder._id });

    sendSuccess(res, { folder: formatFolderResponse(folder, fileCount) });
};

/**
 * PUT /folder/:id - Update folder
 */
export const updateFolder = async (req: AuthRequest, res: Response): Promise<void> => {
    const userId = req.user?.userId;

    if (!userId) {
        sendError(res, 'User not authenticated', HttpStatus.UNAUTHORIZED);
        return;
    }

    const paramValidation = folderIdSchema.safeParse(req.params);

    if (!paramValidation.success) {
        sendError(res, 'Invalid folder ID', HttpStatus.BAD_REQUEST);
        return;
    }

    const bodyValidation = updateFolderSchema.safeParse(req.body);

    if (!bodyValidation.success) {
        sendError(res, 'Invalid request', HttpStatus.BAD_REQUEST, bodyValidation.error.errors);
        return;
    }

    const folder = await Folder.findOneAndUpdate(
        { _id: paramValidation.data.id, userId },
        { $set: bodyValidation.data },
        { new: true }
    );

    if (!folder) {
        sendError(res, 'Folder not found', HttpStatus.NOT_FOUND);
        return;
    }

    sendSuccess(res, { folder: formatFolderResponse(folder) });
};

/**
 * DELETE /folder/:id - Delete folder
 */
export const deleteFolder = async (req: AuthRequest, res: Response): Promise<void> => {
    const userId = req.user?.userId;

    if (!userId) {
        sendError(res, 'User not authenticated', HttpStatus.UNAUTHORIZED);
        return;
    }

    const paramValidation = folderIdSchema.safeParse(req.params);

    if (!paramValidation.success) {
        sendError(res, 'Invalid folder ID', HttpStatus.BAD_REQUEST);
        return;
    }

    const folder = await Folder.findOneAndDelete({
        _id: paramValidation.data.id,
        userId,
    });

    if (!folder) {
        sendError(res, 'Folder not found', HttpStatus.NOT_FOUND);
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

    sendSuccess(res, { message: 'Folder deleted successfully' });
};
