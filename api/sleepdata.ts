import { DateTime } from 'luxon';
import { NowRequest, NowResponse } from '@now/node';

import { retrieveSleepData } from './_lib/fitbit-sleep';
import { createTableIfNotExists } from './_lib/db/tables';
import { getUserToken } from './_lib/db/user';

require('dotenv').config();

export default async (request: NowRequest, response: NowResponse): Promise<void> => {
  await createTableIfNotExists();
  const { userID } = request.query;

  if (!userID) {
    response.status(400).send({ error: 'param userID is required' });
    return;
  }

  try {
    const token = await getUserToken(Array.isArray(userID) ? userID[0] : userID);
    const data = await retrieveSleepData({
      token,
      from: DateTime.local().minus({ months: 1 }),
      until: DateTime.local(),
    });
    response.status(200).send([...data]);
  } catch (e) {
    console.error(e); // eslint-disable-line no-console
    response.status(500).send({ message: 'user not found', error: e });
  }
};
