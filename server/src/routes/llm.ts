import { Router } from 'express';
import { asyncHandler } from '../utils/index.js';
import * as llmController from '../controllers/llm.controller.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

// All routes require authentication
router.use(authMiddleware);

// POST /llm/run - Execute LLM request
router.post('/run', asyncHandler(llmController.runLLM));

export default router;
