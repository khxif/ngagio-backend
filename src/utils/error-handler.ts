import type { Context } from 'hono';
import type { ContentfulStatusCode } from 'hono/utils/http-status';

interface AppError extends Error {
  status?: number;
}

export const errorHandler = (err: AppError, c: Context) => {
  const status = (err.status || 500) as ContentfulStatusCode;

  return c.json({ message: err.message || 'Internal Server Error' }, status);
};
