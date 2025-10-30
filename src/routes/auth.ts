import { getAuthMe, googleLogin } from '@/controllers/auth-controllers.js';
import { verifyToken } from '@/middlewares/verify-token.js';
import { TryCatch } from '@/utils/try-catch.js';
import { Hono } from 'hono';

export const authRouter = new Hono();

authRouter.get('/me', verifyToken, TryCatch(getAuthMe));
authRouter.post('/login/google', TryCatch(googleLogin));
