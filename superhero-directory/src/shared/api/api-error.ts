export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public response?: unknown
  ) {
    super(message);
  }
}

export const isApiError = (error: unknown): error is ApiError => {
  return error instanceof ApiError;
};
