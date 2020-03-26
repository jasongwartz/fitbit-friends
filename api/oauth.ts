import { NowRequest, NowResponse } from '@now/node';

import { getUserToken } from './_lib/fitbit-sleep';
import { createTableIfNotExists } from './_lib/db/tables';
import { storeUserToken } from './_lib/db/user';

require('dotenv').config();

export default async (request: NowRequest, response: NowResponse): Promise<void> => {
  await createTableIfNotExists();
  const { code: fitbitAuthCode } = request.query;

  if (!fitbitAuthCode) {
    response.status(400).send({ error: 'param \'code\' should have been present and is required' });
  }

  try {
    const userData = await getUserToken(
      Array.isArray(fitbitAuthCode) ? fitbitAuthCode[0] : fitbitAuthCode,
    );
    await storeUserToken(userData);

    response.writeHead(302, {
      Location: '/api/sleepdata',
    });
    response.end();
  } catch (e) {
    response.status(500).send({ message: 'user not found', error: e });
  }
};
