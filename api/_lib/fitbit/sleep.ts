
import { DateTime } from 'luxon';

import client from './client';

interface FitbitSleepAPIResponse {
  success: boolean;
  errors: Array<Error>;
  sleep: FitbitSleepItems;
}

interface FitbitSleepItem {
  dateOfSleep: string;
  minutesAsleep: number;
}

export type FitbitSleepItems = ReadonlyArray<FitbitSleepItem>


export const sumByDay = (dataArray: FitbitSleepItems): FitbitSleepItems => {
  console.log('before', dataArray);
  const summedByDate = dataArray.reduce((accum: Record<string, FitbitSleepItem>, current) => {
    if (current.dateOfSleep in accum) {
      accum[current.dateOfSleep].minutesAsleep += current.minutesAsleep;
    } else {
      accum[current.dateOfSleep] = Object.create(current);
    }
    return accum;
  }, {});
  console.log('after', dataArray);

  const summedSorted = Object.values(summedByDate).sort((a, b) => (a.dateOfSleep > b.dateOfSleep ? 1 : -1));
  return summedSorted;
};

export async function retrieveSleepData(
  { token, from, until }: { token: string; from: DateTime; until: DateTime },
): Promise<FFitbitData> {
  const c = client();

  const req = await c.get(`/sleep/date/${from.toISODate()}/${until.toISODate()}.json`, token);
  if (!Array.isArray(req) || !req.length) { throw new Error('Invalid response'); }

  const sleepData: FitbitSleepAPIResponse = req[0];
  // if (!sleepData.success) {
  //   throw sleepData.errors[0]
  // }

  const summed = sumByDay(sleepData.sleep);
  console.log(summed);

  const remapped = summed.map((e): FFitbitDataEntry => (
    { date: e.dateOfSleep, minutesAsleep: e.minutesAsleep }
  ));
  console.log(remapped);

  return remapped;
}
