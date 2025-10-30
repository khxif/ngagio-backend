import { config } from '@/config/index.js';
import { createMiddleware } from 'hono/factory';
import jwt, { type JwtPayload } from 'jsonwebtoken';

export const verifyToken = createMiddleware(async (c, next) => {
  try {
    const header = c.req.header('Authorization') || c.req.header('authorization');
    if (!header) return c.json({ message: 'Authorization header missing' }, 401);

    const token = header.split(' ')[1];

    const decoded = jwt.verify(token, config.jwtSecret) as JwtPayload;
    if (!decoded || !decoded.id) return c.json({ message: 'Invalid JWT' }, 401);

    c.set('userId', decoded.id);

    await next();
  } catch (error) {
    throw error;
  }
});
