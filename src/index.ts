import { config } from '@/config/index.js';
import { authRouter } from '@/routes/auth.js';
import { errorHandler } from '@/utils/error-handler.js';
import { serve } from '@hono/node-server';
import 'dotenv/config';
import { Hono } from 'hono';
import { cors } from 'hono/cors';

const app = new Hono().basePath('/api');

app.use('*', cors());

app.get('/', c => c.text('Hello, World!'));

app.route('/auth', authRouter);

app.onError(errorHandler);

serve({ fetch: app.fetch, port: config.port }, info => {
  console.log(`Server is running on http://localhost:${info.port}`);
});
