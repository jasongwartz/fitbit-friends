import client from './client';

export function getAuthURL(): string {
  const c = client();
  return c.getAuthorizeUrl('sleep', process.env.FITBIT_REDIRECT_URL);
}
