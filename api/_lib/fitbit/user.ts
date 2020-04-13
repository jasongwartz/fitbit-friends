import client from './client';

export interface FitbitUserData {
  /* eslint-disable camelcase */
  access_token: string;
  expires_in: number;
  refresh_token: string;
  user_id: string;
  scope: string;
  /* eslint-enable camelcase */
}

class FitbitGetTokenAPIError extends Error {
  constructor(public message: string, public errors: Array<Error>, public success: boolean) {
    super(message);
  }
}

export async function getUserToken(code: string): Promise<FitbitUserData> {
  const c = client();
  try {
    const response = await c.getAccessToken(code, process.env.FITBIT_REDIRECT_URL);
    const data: FitbitUserData = response;

    return data;
  } catch (e) {
    const err = new FitbitGetTokenAPIError(e.message, e.context.errors, e.context.success);
    throw err;
  }
}
