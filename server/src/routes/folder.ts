import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { asyncHandler } from '../utils/index.js';
import * as folderController from '../controllers/folder.controller.js';

const router = Router();

// All routes require authentication
router.use(authMiddleware);

// GET /folder - List user's folders
router.get('/', asyncHandler(folderController.getFolders));

// POST /folder - Create new folder
router.post('/', asyncHandler(folderController.createFolder));

// GET /folder/:id - Get single folder
router.get('/:id', asyncHandler(folderController.getFolder));

// PUT /folder/:id - Update folder
router.put('/:id', asyncHandler(folderController.updateFolder));

// DELETE /folder/:id - Delete folder
router.delete('/:id', asyncHandler(folderController.deleteFolder));

export default router;
