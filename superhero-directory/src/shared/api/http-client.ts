import { config } from '~shared/config';
import { noop } from '~shared/lib';

class HttpClient {
  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    try {
      const response = await fetch(
        `${config.apiHost}/api/${config.apiToken}${endpoint}`,
        {
          ...options,
          headers: {
            'Content-Type': 'application/json',
            ...options?.headers,
          },
        }
      );

      if (!response.ok) {
        const error = await response.json().catch(noop);

        throw new Error(
          `Error ${response.status}: ${response.statusText} - ${error.error}`
        );
      }

      const data = await response.json();

      if (data.response === 'error') {
        throw new Error(data.error);
      }

      return data as T;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
        throw error;
      }
      console.error('Unknown error occured');
      throw new Error('Unknown error occured');
    }
  }

  get<T>(url: string) {
    return this.request<T>(url, { method: 'GET' });
  }
}

export const httpClient = new HttpClient();
