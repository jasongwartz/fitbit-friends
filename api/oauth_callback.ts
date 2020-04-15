import { NowRequest, NowResponse } from '@now/node';
import { serialize } from 'cookie';

import log from './_lib/log';
import wrapMiddleware from './_lib/middleware';
import { getUserToken } from './_lib/fitbit/user';
import { storeUserToken } from './_lib/db/user';
import { createJWTCookie, cookieTokenName } from './_lib/jwt/jwt';

export default wrapMiddleware(async (request: NowRequest, response: NowResponse): Promise<void> => {
  const { code: fitbitAuthCode } = request.query;
  log.debug(`>> Received oauth_callback request with code: ${fitbitAuthCode}`);

  if (!fitbitAuthCode) {
    response.status(400).send({ error: 'param \'code\' should have been present and is required' });
  }

  try {
    const userData = await getUserToken(
      Array.isArray(fitbitAuthCode) ? fitbitAuthCode[0] : fitbitAuthCode,
    );
    log.debug(`>> Received userData from Fitbit API: ${JSON.stringify(userData)}`);

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
    log.error(e);
    response.status(500).send({ message: 'unable to log in' });
  }
});
