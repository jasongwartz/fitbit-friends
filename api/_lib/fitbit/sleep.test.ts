import { sumByDay, retrieveSleepData, FitbitSleepItems } from './sleep';
import { DateTime } from 'luxon';

import * as client from './client';

const testData: FitbitSleepItems = [
  { dateOfSleep: '2020-01-02', minutesAsleep: 10 },
  { dateOfSleep: '2020-01-02', minutesAsleep: 20 },
  { dateOfSleep: '2020-01-03', minutesAsleep: 5 },
  { dateOfSleep: '2020-02-01', minutesAsleep: 8 },
  { dateOfSleep: '2020-02-01', minutesAsleep: 4 },
];

describe('The fitbit sleep logic', () => {
  describe('sumSleepByDay', () => {
    it('doesn\'t modify the original data', () => {
      const copy = testData.map(a => ({ ...a }));
      sumByDay(testData);
      expect(testData).toStrictEqual(copy);
    });

    it('sums array objects by day and sorts ascending', () => {
      const output = sumByDay(testData);

      expect(output.length).toBe(3);
      expect(output[0].minutesAsleep).toBe(30);
      expect(output[1].minutesAsleep).toBe(5);
      expect(output[2].minutesAsleep).toBe(12);
    });
  });

  describe('retrieveSleepData', () => {
    const token = 'asdf';
    const from = DateTime.local().minus({ days: 1 });
    const until = DateTime.local();

    const mockGet = jest.fn();
    beforeEach(() => {
      mockGet.mockReset();
      jest.spyOn(client, 'default').mockImplementationOnce(() => ({ get: mockGet }));
    });

    it('throws when the response is not an array', async () => {
      mockGet.mockReturnValueOnce('');
      await expect(
        retrieveSleepData({ token, from, until }),
      ).rejects.toThrowError('Invalid');
    });

    it('throws when the response is an empty array', async () => {
      mockGet.mockReturnValueOnce([]);
      await expect(
        retrieveSleepData({ token, from, until }),
      ).rejects.toThrowError('Invalid');
    });

    it('returns empty when response is valid but empty', async () => {
      mockGet.mockReturnValueOnce([{ sleep: [] }]);
      expect(await retrieveSleepData({ token, from, until })).toStrictEqual([]);
    });

    it('calls the fitbit client getter with the correct params', async () => {
      mockGet.mockReturnValueOnce([{ sleep: [] }]);
      const output = await retrieveSleepData({ token, from, until });

      expect(mockGet).toHaveBeenCalledTimes(1);
      expect(mockGet.mock.calls[0][0]).toContain(from.toISODate());
      expect(mockGet.mock.calls[0][0]).toContain(until.toISODate());
      expect(mockGet.mock.calls[0][1]).toBe(token);
      expect(output).toEqual([]);
    });

    it('sums and reformats the data from return as expected', async () => {
      mockGet.mockReturnValueOnce([{ sleep: testData }]);
      const output = await retrieveSleepData({ token, from, until });

      expect(output.length).toEqual(3);
      expect(output[0].date).toEqual('2020-01-02');
      expect(output[0].minutesAsleep).toEqual(30);
      expect(output[1].date).toEqual('2020-01-03');
      expect(output[1].minutesAsleep).toEqual(5);
      expect(output[2].date).toEqual('2020-02-01');
      expect(output[2].minutesAsleep).toEqual(12);
    });
  });
});
