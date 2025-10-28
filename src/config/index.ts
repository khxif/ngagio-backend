import 'dotenv/config';

interface Config {
  port: number;
}

if (!process.env.PORT) throw new Error('Missing Environment Variable');

export const config: Config = {
  port: Number(process.env.PORT ?? 8888),
};
