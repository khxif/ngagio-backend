import type { Context, Handler, Next } from 'hono';

export const TryCatch = (handler: Handler): Handler => {
  return async function (c: Context, next: Next) {
    try {
      return await handler(c, next);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
};
