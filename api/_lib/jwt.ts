import jwt from 'jsonwebtoken';
import jwtDecode from 'jwt-decode';
import { Duration } from 'luxon';

import { FitbitUserData } from './fitbit-sleep';

export const cookieTokenName = 'token';
export const defaultTokenTTL = Duration.fromObject({ days: 30 }).as('seconds');

interface TokenContents {
  fitbitUserID: string;
}

interface TokenCookie {
  token: string;
  expiresIn: number;
}

export function createJWTCookie(user: FitbitUserData): TokenCookie {
  const signingSecret = process.env.JWT_SIGNING_SECRET;
  if (!signingSecret) throw 'Must provide JWT signing secret';

  const expiresIn = parseInt(process.env.JWT_EXPIRY_TTL_SECONDS || '') || defaultTokenTTL; // default 30 days
  const tokenData: TokenContents = {
    fitbitUserID: user.user_id,
  };

  const token = jwt.sign(tokenData, signingSecret, { expiresIn });

  return {
    expiresIn,
    token,
  };
}

export function getUserIDFromJWTCookie(token: string): string {
  const signingSecret = process.env.JWT_SIGNING_SECRET;
  if (!signingSecret) throw 'Must provide JWT signing secret';
  jwt.verify(token, signingSecret);

  const data = jwtDecode<TokenContents>(token);
  return data.fitbitUserID;
}
