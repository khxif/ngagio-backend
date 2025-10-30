import { config } from '@/config/index.js';
import { prisma } from '@/prisma/client.js';
import { supabase } from '@/supabase/client.js';
import { type Context } from 'hono';
import jwt from 'jsonwebtoken';

export async function googleLogin(c: Context) {
  const header = c.req.header('Authorization');
  if (!header) return c.json({ message: 'Authorization header missing' }, 401);

  const token = header.split(' ')[1];

  const { data, error } = await supabase.auth.getUser(token);
  if (error) return c.json({ message: 'Invalid token' }, 401);

  const userMetadata = data.user.user_metadata;

  const existingUser = await prisma.user.findUnique({
    where: { email: userMetadata.email },
  });
  if (existingUser) {
    await prisma.user.update({
      where: { email: userMetadata.email },
      data: { lastLogin: new Date() },
    });

    const jwtToken = jwt.sign(
      { id: existingUser.id, email: existingUser.email, role: existingUser.role },
      config.jwtSecret,
      { expiresIn: '7d' },
    );

    return c.json({ user: existingUser, token: jwtToken });
  }

  const user = await prisma.user.create({
    data: {
      email: userMetadata.email,
      name: userMetadata.name,
      profilePicture: userMetadata.picture ?? '',
      lastLogin: new Date(),
      authProviderId: userMetadata.provider_id,
    },
  });
  const jwtToken = jwt.sign({ id: user.id, email: user.email, role: user.role }, config.jwtSecret, {
    expiresIn: '7d',
  });

  return c.json({ user, token: jwtToken });
}

export async function getAuthMe(c: Context) {
  const userId = c.get('userId');
  if (!userId) return c.json({ message: 'UserID not found.' }, 404);

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return c.json({ message: 'User not found.' }, 404);

  return c.json({ data: user });
}
