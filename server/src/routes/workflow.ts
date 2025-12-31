import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { asyncHandler } from '../utils/index.js';
import * as workflowController from '../controllers/workflow.controller.js';

const router = Router();

// All routes require authentication
router.use(authMiddleware);

// GET /workflow - List user's workflows
router.get('/', asyncHandler(workflowController.getWorkflows));

// POST /workflow - Create new workflow
router.post('/', asyncHandler(workflowController.createWorkflow));

// GET /workflow/:id - Get single workflow
router.get('/:id', asyncHandler(workflowController.getWorkflow));

// PUT /workflow/:id - Update workflow
router.put('/:id', asyncHandler(workflowController.updateWorkflow));

// DELETE /workflow/:id - Delete workflow
router.delete('/:id', asyncHandler(workflowController.deleteWorkflow));

export default router;
