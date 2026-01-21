import { config } from './config';

export async function apiFetch<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(
    `${config.apiHost}/api/${config.apiToken}${url}`,
    {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    }
  );

  if (!response.ok) {
    const error = await response.json();

    throw new Error(
      `Error ${response.status}: ${response.statusText} - ${error.error}`
    );
  }

  const data = await response.json();

  return data as T;
}
