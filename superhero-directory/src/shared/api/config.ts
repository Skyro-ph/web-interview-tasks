type ApiConfig = {
  apiHost: string;
  apiToken: string;
};

export const API_RETRY_COUNT = 3;

export const apiConfig: ApiConfig = {
  apiHost: import.meta.env.VITE_API_HOST,
  apiToken: import.meta.env.VITE_API_TOKEN,
};
