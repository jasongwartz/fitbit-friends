
import { createMock } from 'ts-auto-mock';
import { On, method } from 'ts-auto-mock/extension';
import { NowRequest, NowResponse } from '@now/node';

import * as loginHandler from './login';
import * as jwt from './_lib/jwt';

describe('redirectTo', () => {
  const mockRes: NowResponse = createMock<NowResponse>();

  it('should set a location header and end the request', () => {
    const mockWriteHead: jest.Mock = On(mockRes).get(method('writeHead'));
    const mockEnd: jest.Mock = On(mockRes).get(method('end'));

    const path = '/redirect-test';
    loginHandler.redirectTo(mockRes, path);

    expect(mockWriteHead).toHaveBeenCalledTimes(1);
    expect(mockWriteHead.mock.calls[0][0]).toBe(302);
    expect(mockWriteHead.mock.calls[0][1]).toHaveProperty('Location');
    expect(mockWriteHead.mock.calls[0][1].Location).toBe(path);

    expect(mockEnd).toHaveBeenCalledTimes(1);
    expect(mockEnd.mock.calls[0]).toEqual([]);
  });
});

describe('Login endpoint', () => {
  const mockReq: NowRequest = createMock<NowRequest>();
  const mockRes: NowResponse = createMock<NowResponse>();

  it('should redirect to a fitbit URL if no jwt is present', () => {
    const spyRedirect = jest.spyOn(loginHandler, 'redirectTo').mockImplementationOnce(() => '');

    loginHandler.default(mockReq, mockRes);
    expect(spyRedirect).toHaveBeenCalledTimes(1);
    expect(spyRedirect.mock.calls[0][0]).toEqual(mockRes);
    expect(spyRedirect.mock.calls[0][1]).toContain('https://www.fitbit.com/oauth2');
    jest.resetAllMocks();
  });

  it('should redirect to a fitbit URL if the jwt returns no user ID', () => {
    jest.spyOn(jwt, 'getUserIDFromJWTCookie').mockImplementationOnce(() => '');
    const spyRedirect = jest.spyOn(loginHandler, 'redirectTo').mockImplementationOnce(() => '');

    loginHandler.default(mockReq, mockRes);
    expect(spyRedirect).toHaveBeenCalledTimes(1);
    expect(spyRedirect.mock.calls[0][0]).toEqual(mockRes);
    expect(spyRedirect.mock.calls[0][1]).toContain('https://www.fitbit.com/oauth2');
    jest.resetAllMocks();
  });

  it('should redirect to the profile page if the jwt has a valid user ID', () => {
    jest.spyOn(jwt, 'getUserIDFromJWTCookie').mockImplementationOnce(() => 'mockUserID');
    const spyRedirect = jest.spyOn(loginHandler, 'redirectTo').mockImplementationOnce(() => '');

    loginHandler.default(mockReq, mockRes);
    expect(spyRedirect).toHaveBeenCalledTimes(1);
    expect(spyRedirect.mock.calls[0][0]).toEqual(mockRes);
    expect(spyRedirect.mock.calls[0][1]).toContain('/user/profile');
    jest.resetAllMocks();
  });
});
