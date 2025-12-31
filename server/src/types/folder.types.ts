/**
 * Folder-related type definitions
 */

export interface FolderResponse {
    id: string;
    name: string;
    parentId: string | null;
    fileCount: number;
    createdAt: Date;
    updatedAt: Date;
}
