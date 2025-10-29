import { config } from '@/config/index.js';
import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import 'dotenv/config';

const app = new Hono();

app.get('/', c => c.text('Hello, World!'));

serve({ fetch: app.fetch, port: config.port }, info => {
  console.log(`Server is running on http://localhost:${info.port}`);
});
