
import { createMock } from 'ts-auto-mock';
import { On, method } from 'ts-auto-mock/extension';
import { NowRequest, NowResponse } from '@now/node';

import loginHandler from './login';

describe('Login endpoint', () => {
  it('should redirect to a fitbit URL', () => {
    const mockReq: NowRequest = createMock<NowRequest>();
    const mockRes: NowResponse = createMock<NowResponse>();

    const mockMethod: jest.Mock = On(mockRes).get(method('writeHead'));

    loginHandler(mockReq, mockRes);
    expect(mockMethod).toHaveBeenCalledTimes(1);
    expect(mockMethod.mock.calls[0][0]).toBe(302);
    expect(mockMethod.mock.calls[0][1].Location).toContain('https://www.fitbit.com/oauth2');
  });
});
