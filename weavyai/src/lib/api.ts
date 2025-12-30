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
}

export const api = new ApiClient(API_URL);
export default api;
