import { NowRequest, NowResponse } from '@now/node';

import { getAuthURL } from './_lib/fitbit-sleep';

export default (_: NowRequest, response: NowResponse) => {
  response.writeHead(302, {
    Location: getAuthURL(),
  });
  response.end();
};
