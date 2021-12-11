import { decode } from 'jsonwebtoken';
import { createCookieSessionStorage, redirect } from 'remix';
import db from './db.server';

type Form = {
  email: string;
  password: string;
};

export async function signUp({ email, password }: Form) {
  const { user, session, error } = await db.auth.signUp({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return { user, session };
}

export async function login({ email, password }: Form) {
  const { user, error, session } = await db.auth.signIn({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return { user, session };
}

const sessionSecret = process.env.SESSION_SECRET || 'secret';
if (!sessionSecret) {
  throw new Error('SESSION_SECRET must be set');
}

const storage = createCookieSessionStorage({
  cookie: {
    name: 'kchha_session',
    // normally you want this to be `secure: true`
    // but that doesn't work on localhost for Safari
    // https://web.dev/when-to-use-local-https/
    secure: process.env.NODE_ENV === 'production',
    secrets: [sessionSecret],
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
});

export async function createUserSession({
  access_token,
  redirectTo,
}: {
  access_token: string;
  redirectTo: string;
}) {
  const session = await storage.getSession();
  session.set('access_token', access_token);
  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await storage.commitSession(session),
    },
  });
}

export function getUserSession(request: Request) {
  return storage.getSession(request.headers.get('Cookie'));
}

export async function requireUser(
  request: Request,
  redirectTo: string = new URL(request.url).pathname
) {
  const session = await getUserSession(request);
  const access_token = session.get('access_token');
  if (!access_token || typeof access_token !== 'string') {
    const searchParams = new URLSearchParams([['redirectTo', redirectTo]]);
    throw redirect(`/login?${searchParams}`);
  }
  return access_token;
}

export async function getUser(request: Request) {
  const session = await getUserSession(request);
  const access_token = session.get('access_token');
  const user = decode(access_token);
  return user;
}

export async function logout(request: Request) {
  const session = await storage.getSession(request.headers.get('Cookie'));
  return redirect('/login', {
    headers: {
      'Set-Cookie': await storage.destroySession(session),
    },
  });
}

export const setAuthToken = async (request: Request) => {
  let session = await storage.getSession(request.headers.get('Cookie'));

  db.auth.setAuth(session.get('access_token'));

  return session;
};
