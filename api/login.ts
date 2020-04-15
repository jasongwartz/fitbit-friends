import { NowRequest, NowResponse } from '@now/node';

import wrapMiddleware from './_lib/middleware';
import { getAuthURL } from './_lib/fitbit/auth';
import { getUserIDFromJWTCookie, cookieTokenName } from './_lib/jwt/jwt';

export const redirectTo = (response: NowResponse, path: string) => {
  response.writeHead(302, {
    Location: path,
  });
  response.end();
};

export default wrapMiddleware((request: NowRequest, response: NowResponse) => {
  try {
    const userID = getUserIDFromJWTCookie(request.cookies[cookieTokenName]);
    if (userID) {
      redirectTo(response, '/user/profile');
      return;
    } else {
      redirectTo(response, getAuthURL());
      return;
    }
  } catch (err) {
    redirectTo(response, getAuthURL());
    return;
  }
});
