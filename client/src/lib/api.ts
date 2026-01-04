/**
 * API Client
 * 
 * Centralized HTTP client for all backend API calls.
 * Handles authentication, request formatting, and error handling.
 */

import type {
  User,
  AuthResponse,
  Workflow,
  WorkflowListResponse,
  WorkflowResponse,
  UpdateWorkflowData,
  Folder,
  FolderListResponse,
  FolderResponse,
  LLMRunParams,
  LLMRunResponse,
  ApiResponse,
} from '@/types/api.types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

/**
 * API Client class for making authenticated requests to the backend.
 * 
 * Features:
 * - Automatic token management (localStorage)
 * - Type-safe request/response handling
 * - Consistent error handling
 */
class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    // Load token from localStorage on init
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('weavyai:token');
    }
  }

  /**
   * Set the authentication token
   * @param token - JWT token or null to clear
   */
  setToken(token: string | null): void {
    this.token = token;
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem('weavyai:token', token);
      } else {
        localStorage.removeItem('weavyai:token');
      }
    }
  }

  /**
   * Get the current authentication token
   */
  getToken(): string | null {
    return this.token;
  }

  /**
   * Get the Google OAuth redirect URL
   */
  getGoogleAuthUrl(): string {
    return `${this.baseUrl}/auth/google`;
  }

  /**
   * Make an authenticated request to the API
   * @param endpoint - API endpoint path
   * @param options - Fetch options
   * @returns Parsed JSON response
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers,
      credentials: 'include',
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  }

  // =========================================================================
  // Auth Endpoints
  // =========================================================================

  /**
   * Authenticate with Google OAuth credential
   * @param credential - Google OAuth credential token
   */
  async googleAuth(credential: string): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>('/auth/google', {
      method: 'POST',
      body: JSON.stringify({ credential }),
    });

    if (response.success && response.token) {
      this.setToken(response.token);
    }

    return response;
  }

  /**
   * Get the current session status
   */
  async getSession(): Promise<AuthResponse> {
    try {
      return await this.request<AuthResponse>('/auth/session');
    } catch {
      this.setToken(null);
      return { success: false, message: 'Session invalid' };
    }
  }

  /**
   * Get the currently authenticated user
   */
  async getCurrentUser(): Promise<AuthResponse> {
    try {
      return await this.request<AuthResponse>('/auth/me');
    } catch {
      return { success: false, message: 'Not authenticated' };
    }
  }

  /**
   * Log out the current user
   */
  async logout(): Promise<AuthResponse> {
    try {
      const response = await this.request<AuthResponse>('/auth/logout', {
        method: 'POST',
      });
      this.setToken(null);
      return response;
    } catch {
      this.setToken(null);
      return { success: true, message: 'Logged out locally' };
    }
  }

  // =========================================================================
  // Workflow Endpoints
  // =========================================================================

  /**
   * Get all workflows, optionally filtered by folder
   * @param folderId - Filter by folder ID (null for root)
   */
  async getWorkflows(folderId?: string | null): Promise<WorkflowListResponse> {
    const params = new URLSearchParams();
    if (folderId !== undefined) {
      params.set('folderId', folderId || '');
    }
    const query = params.toString() ? `?${params.toString()}` : '';
    return this.request<WorkflowListResponse>(`/workflow${query}`);
  }

  /**
   * Create a new workflow
   * @param name - Workflow name
   * @param folderId - Parent folder ID (null for root)
   */
  async createWorkflow(name: string = 'untitled', folderId?: string | null): Promise<WorkflowResponse> {
    return this.request<WorkflowResponse>('/workflow', {
      method: 'POST',
      body: JSON.stringify({ name, folderId }),
    });
  }

  /**
   * Get a workflow by ID
   * @param id - Workflow ID
   */
  async getWorkflow(id: string): Promise<WorkflowResponse> {
    return this.request<WorkflowResponse>(`/workflow/${id}`);
  }

  /**
   * Update a workflow
   * @param id - Workflow ID
   * @param data - Fields to update
   */
  async updateWorkflow(id: string, data: UpdateWorkflowData): Promise<WorkflowResponse> {
    return this.request<WorkflowResponse>(`/workflow/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  /**
   * Delete a workflow
   * @param id - Workflow ID
   */
  async deleteWorkflow(id: string): Promise<ApiResponse> {
    return this.request<ApiResponse>(`/workflow/${id}`, {
      method: 'DELETE',
    });
  }

  // =========================================================================
  // Folder Endpoints
  // =========================================================================

  /**
   * Get all folders, optionally filtered by parent
   * @param parentId - Filter by parent folder ID
   */
  async getFolders(parentId?: string | null): Promise<FolderListResponse> {
    const params = new URLSearchParams();
    if (parentId) {
      params.set('parentId', parentId);
    }
    const query = params.toString() ? `?${params.toString()}` : '';
    return this.request<FolderListResponse>(`/folder${query}`);
  }

  /**
   * Create a new folder
   * @param name - Folder name
   * @param parentId - Parent folder ID (null for root)
   */
  async createFolder(name: string, parentId?: string | null): Promise<FolderResponse> {
    return this.request<FolderResponse>('/folder', {
      method: 'POST',
      body: JSON.stringify({ name, parentId }),
    });
  }

  /**
   * Get a folder by ID
   * @param id - Folder ID
   */
  async getFolder(id: string): Promise<FolderResponse> {
    return this.request<FolderResponse>(`/folder/${id}`);
  }

  /**
   * Update a folder name
   * @param id - Folder ID
   * @param name - New folder name
   */
  async updateFolder(id: string, name: string): Promise<FolderResponse> {
    return this.request<FolderResponse>(`/folder/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ name }),
    });
  }

  /**
   * Delete a folder
   * @param id - Folder ID
   */
  async deleteFolder(id: string): Promise<ApiResponse> {
    return this.request<ApiResponse>(`/folder/${id}`, {
      method: 'DELETE',
    });
  }

  // =========================================================================
  // LLM Endpoints
  // =========================================================================

  /**
   * Run LLM inference
   * @param params - LLM parameters (model, prompts, images)
   */
  async runLLM(params: LLMRunParams): Promise<LLMRunResponse> {
    return this.request<LLMRunResponse>('/llm/run', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }
}

// Export singleton instance
export const api = new ApiClient(API_URL);
export default api;

// Re-export types for convenience
export type { User, Workflow, Folder } from '@/types/api.types';
