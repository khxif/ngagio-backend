import 'dotenv/config';

interface Config {
  port: number;
  supabaseUrl: string;
  supabaseServiceRoleKey: string;
  jwtSecret: string;
}

if (
  !process.env.PORT ||
  !process.env.SUPABASE_URL ||
  !process.env.SUPABASE_SERVICE_ROLE_KEY ||
  !process.env.JWT_SECRET
)
  throw new Error('Missing Environment Variable');

export const config: Config = {
  port: Number(process.env.PORT ?? 8888),
  supabaseUrl: process.env.SUPABASE_URL,
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  jwtSecret: process.env.JWT_SECRET,
};
