import { NowRequest, NowResponse } from '@now/node';

import { getAuthURL } from './_lib/fitbit-sleep';

export default async (request: NowRequest, response: NowResponse): Promise<void> => {
  response.writeHead(302, {
    Location: getAuthURL(),
  });
  response.end();
};
