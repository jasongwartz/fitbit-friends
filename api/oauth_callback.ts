import { NowRequest, NowResponse } from '@now/node';

import { getUserToken } from './_lib/fitbit-sleep';
import { storeUserToken } from './_lib/db/user';
import { createJWTCookie, cookieTokenName } from './_lib/jwt';
import { serialize } from 'cookie';

export default async (request: NowRequest, response: NowResponse): Promise<void> => {
  const { code: fitbitAuthCode } = request.query;

  if (!fitbitAuthCode) {
    response.status(400).send({ error: 'param \'code\' should have been present and is required' });
  }

  try {
    const userData = await getUserToken(
      Array.isArray(fitbitAuthCode) ? fitbitAuthCode[0] : fitbitAuthCode,
    );

    await storeUserToken(userData);
    const jwtData = createJWTCookie(userData);

    const jwtCookie = serialize(cookieTokenName, jwtData.token, {
      maxAge: jwtData.expiresIn,
    });

    response.writeHead(302, {
      'Set-Cookie': jwtCookie,
      Location: '/user/profile',
    });
    response.end();
  } catch (e) {
    response.status(500).send({ message: 'user not found', error: e });
  }
};
