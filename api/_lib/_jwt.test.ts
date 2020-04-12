import { createMock } from 'ts-auto-mock';
import { Duration } from 'luxon';
import jwt from 'jsonwebtoken';

const testSigningSecret = 'asdf';
process.env.JWT_SIGNING_SECRET = testSigningSecret;

import { createJWTCookie, defaultTokenTTL, getUserIDFromJWTCookie } from './jwt';
import { FitbitUserData } from './fitbit-sleep';

describe('JWT helpers', () => {
  const mockUser: FitbitUserData = createMock<FitbitUserData>();

  describe('getUserIDFromJWTCookie', () => {
    it('verifies if the jwt is signed correctly', () => {
      const token = createJWTCookie(mockUser).token;
      expect(() => getUserIDFromJWTCookie(token)).not.toThrow();

      process.env.JWT_SIGNING_SECRET = 'temp';
      expect(() => getUserIDFromJWTCookie(token)).toThrow('invalid');
      process.env.JWT_SIGNING_SECRET = testSigningSecret;
    });

    it('rejects if token is expired', () => {
      process.env.JWT_EXPIRY_TTL_SECONDS = '-120';
      const token = createJWTCookie(mockUser).token;
      expect(() => getUserIDFromJWTCookie(token)).toThrow('expired');
      delete process.env.JWT_EXPIRY_TTL_SECONDS;
    });

    it('parses the user ID from the token', () => {
      const id = 'testuserid';
      const user: FitbitUserData = { ...mockUser };
      user.user_id = id; // eslint-disable-line @typescript-eslint/camelcase
      const token = createJWTCookie(user).token;

      const userID = getUserIDFromJWTCookie(token);
      expect(userID).toEqual(id);
    });
  });

  describe('createToken', () => {
    const expiryTest = Duration.fromObject({ hours: 1 }).as('seconds');

    it('expiry falls back to default', () => {
      const token = createJWTCookie(mockUser);
      expect(token.expiresIn).toBe(defaultTokenTTL);
    });

    it('expiry is set by env var', () => {
      process.env.JWT_EXPIRY_TTL_SECONDS = expiryTest.toString();
      const token = createJWTCookie(mockUser);
      expect(token.expiresIn).toBe(expiryTest);
      delete process.env.JWT_EXPIRY_TTL_SECONDS;
    });

    it('signs the jwt from the env var secret', () => {
      const token = createJWTCookie(mockUser);
      expect(() => jwt.verify(token.token, testSigningSecret)).not.toThrow();
      expect(() => jwt.verify(token.token, 'mock secret')).toThrow('invalid');
    });

    it('sets the userID from the input params', () => {
      const id = 'testuserid';
      const user: FitbitUserData = { ...mockUser };
      user.user_id = id; // eslint-disable-line @typescript-eslint/camelcase
      const token = createJWTCookie(user);
      const contents: any = jwt.decode(token.token);
      expect(contents?.fitbitUserID).toEqual(id);
    });
  });
});
