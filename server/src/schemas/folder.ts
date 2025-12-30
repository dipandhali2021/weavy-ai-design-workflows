import { z } from 'zod';

// Create folder schema
export const createFolderSchema = z.object({
    name: z.string().min(1).max(200),
    parentId: z.string().regex(/^[a-f\d]{24}$/i, 'Invalid folder ID').optional().nullable(),
});

// Update folder schema
export const updateFolderSchema = z.object({
    name: z.string().min(1).max(200).optional(),
    parentId: z.string().regex(/^[a-f\d]{24}$/i, 'Invalid folder ID').optional().nullable(),
});

// Folder ID param schema
export const folderIdSchema = z.object({
    id: z.string().regex(/^[a-f\d]{24}$/i, 'Invalid folder ID'),
});

export type CreateFolderInput = z.infer<typeof createFolderSchema>;
export type UpdateFolderInput = z.infer<typeof updateFolderSchema>;
