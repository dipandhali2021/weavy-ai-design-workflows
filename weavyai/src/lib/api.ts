const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  token?: string;
  message?: string;
}

export interface WorkflowNode {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: Record<string, unknown>;
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
  type?: string;
}

export interface Workflow {
  id: string;
  name: string;
  folderId?: string | null;
  nodes?: WorkflowNode[];
  edges?: WorkflowEdge[];
  thumbnail?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Folder {
  id: string;
  name: string;
  parentId: string | null;
  fileCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface WorkflowListResponse {
  success: boolean;
  workflows?: Workflow[];
  message?: string;
}

export interface WorkflowResponse {
  success: boolean;
  workflow?: Workflow;
  message?: string;
}

export interface FolderListResponse {
  success: boolean;
  folders?: Folder[];
  message?: string;
}

export interface FolderResponse {
  success: boolean;
  folder?: Folder;
  message?: string;
}

export interface UpdateWorkflowData {
  name?: string;
  folderId?: string | null;
  nodes?: WorkflowNode[];
  edges?: WorkflowEdge[];
  thumbnail?: string;
}

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

  getToken(): string | null {
    return this.token;
  }

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

  // Auth endpoints
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

  async getSession(): Promise<AuthResponse> {
    try {
      return await this.request<AuthResponse>('/auth/session');
    } catch {
      this.setToken(null);
      return { success: false, message: 'Session invalid' };
    }
  }

  async getCurrentUser(): Promise<AuthResponse> {
    try {
      return await this.request<AuthResponse>('/auth/me');
    } catch {
      return { success: false, message: 'Not authenticated' };
    }
  }

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

  // Workflow endpoints
  async getWorkflows(folderId?: string | null): Promise<WorkflowListResponse> {
    const params = new URLSearchParams();
    if (folderId !== undefined) {
      params.set('folderId', folderId || '');
    }
    const query = params.toString() ? `?${params.toString()}` : '';
    return this.request<WorkflowListResponse>(`/workflow${query}`);
  }

  async createWorkflow(name: string = 'untitled', folderId?: string | null): Promise<WorkflowResponse> {
    return this.request<WorkflowResponse>('/workflow', {
      method: 'POST',
      body: JSON.stringify({ name, folderId }),
    });
  }

  async getWorkflow(id: string): Promise<WorkflowResponse> {
    return this.request<WorkflowResponse>(`/workflow/${id}`);
  }

  async updateWorkflow(id: string, data: UpdateWorkflowData): Promise<WorkflowResponse> {
    return this.request<WorkflowResponse>(`/workflow/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteWorkflow(id: string): Promise<{ success: boolean; message?: string }> {
    return this.request<{ success: boolean; message?: string }>(`/workflow/${id}`, {
      method: 'DELETE',
    });
  }

  // Folder endpoints
  async getFolders(parentId?: string | null): Promise<FolderListResponse> {
    const params = new URLSearchParams();
    if (parentId) {
      params.set('parentId', parentId);
    }
    const query = params.toString() ? `?${params.toString()}` : '';
    return this.request<FolderListResponse>(`/folder${query}`);
  }

  async createFolder(name: string, parentId?: string | null): Promise<FolderResponse> {
    return this.request<FolderResponse>('/folder', {
      method: 'POST',
      body: JSON.stringify({ name, parentId }),
    });
  }

  async getFolder(id: string): Promise<FolderResponse> {
    return this.request<FolderResponse>(`/folder/${id}`);
  }

  async updateFolder(id: string, name: string): Promise<FolderResponse> {
    return this.request<FolderResponse>(`/folder/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ name }),
    });
  }

  async deleteFolder(id: string): Promise<{ success: boolean; message?: string }> {
    return this.request<{ success: boolean; message?: string }>(`/folder/${id}`, {
      method: 'DELETE',
    });
  }
}

export const api = new ApiClient(API_URL);
export default api;

