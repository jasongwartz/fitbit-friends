import { NowRequest, NowResponse } from '@now/node';

import { getAuthURL } from './_lib/fitbit-sleep';
import { getUserIDFromJWTCookie, cookieTokenName } from './_lib/jwt';

const redirectTo = (response: NowResponse, path: string) => {
  response.writeHead(302, {
    Location: path,
  });
  response.end();
};

export default (request: NowRequest, response: NowResponse) => {
  try {
    const userID = getUserIDFromJWTCookie(request.cookies[cookieTokenName]);
    if (userID) {
      redirectTo(response, '/user/profile');
    } else {
      redirectTo(response, getAuthURL());
    }
  } catch (err) {
    redirectTo(response, getAuthURL());
  }
};
