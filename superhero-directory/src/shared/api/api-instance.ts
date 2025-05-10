import { ApiError } from './api-error';
import { ResponseError } from './types/response';

export const isResponseError = (data: unknown): data is ResponseError => {
  return typeof data === 'object' && data !== null && 'error' in data;
};

export const apiInstance = async <T>(
  url: string,
  init?: RequestInit & { json?: unknown }
) => {
  let headers = init?.headers ?? {};

  if (init?.json) {
    headers = {
      'Content-Type': 'application/json',
      ...headers,
    };

    init.body = JSON.stringify(init.json);
  }

  const res = await fetch(url, {
    ...init,
    headers,
  });

  if (!res.ok) {
    const error: ResponseError = await res.json();
    throw new ApiError(res.status, res.statusText, error.error);
  }

  const data = (await res.json()) as Promise<T>;

  if (isResponseError(data)) {
    throw new ApiError(res.status, data.error, data.error);
  }

  return data;
};
