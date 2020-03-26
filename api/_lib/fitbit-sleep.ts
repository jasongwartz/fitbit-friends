import { DateTime } from 'luxon';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Fitbit = require('fitbit-node');

const fitbitClient = new Fitbit({
  clientId: process.env.FITBIT_CLIENT_ID,
  clientSecret: process.env.FITBIT_CLIENT_SECRET,
  apiVersion: '1.2',
});

interface FitbitSleepItem {
  dateOfSleep: string;
  minutesAsleep: number;
}

interface FitbitSleepData {
  sleep: Array<FitbitSleepItem>;
}

interface FitbitSleepAPIResponse {
  success: boolean;
  errors: Array<Error>;
  sleep: Array<FitbitSleepItem>;
}

export interface FitbitUserData {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  user_id: string;
  scope: string;
}

class FitbitGetTokenAPIError extends Error {
  constructor(public message: string, public errors: Array<Error>, public success: boolean) {
    super(message);
  }
}

export function getAuthURL(): string {
  return fitbitClient.getAuthorizeUrl('sleep', process.env.FITBIT_REDIRECT_URL);
}

export async function getUserToken(code: string): Promise<FitbitUserData> {
  try {
    const response = await fitbitClient.getAccessToken(code, process.env.FITBIT_REDIRECT_URL);
    const data: FitbitUserData = response;

    return data;
  } catch (e) {
    const err = new FitbitGetTokenAPIError(e.message, e.context.errors, e.context.success);
    throw err;
  }
}

export async function retrieveSleepData(
  { token, from, until }: { token: string; from: DateTime; until: DateTime },
): Promise<Map<string, number>> {
  const req = await fitbitClient.get(`/sleep/date/${from.toISODate()}/${until.toISODate()}.json`, token);

  const sleepData: FitbitSleepAPIResponse = req[0];

  // if (!sleepData.success) {
  //   throw sleepData.errors[0]
  // }

  const totals = sleepData.sleep.reduce<Map<string, number>>(
    (accum: Map<string, number>, current: FitbitSleepItem) => {
      if (accum.has(current.dateOfSleep)) {
        const previous = accum.get(current.dateOfSleep) || 0;
        accum.set(current.dateOfSleep, previous + current.minutesAsleep);
      } else {
        accum.set(current.dateOfSleep, current.minutesAsleep);
      }

      return accum;
    }, new Map<string, number>(),
  );

  return totals;
}
