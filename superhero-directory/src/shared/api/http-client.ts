import { config } from '../config';

export class HttpClient {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${config.apiHost}/api/${config.apiToken}${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: { 'Content-Type': 'application/json', ...options?.headers },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP Error: ${response.status}`);
    }

    const data = await response.json();

    if (data.response === 'error') throw new Error(data.error);
    
    return data as T;
  }

  get<T>(url: string, signal?: AbortSignal) {
    return this.request<T>(url, { method: 'GET', signal });
  }
}

export const httpClient = new HttpClient();