require('dotenv').config();

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Fitbit = require('fitbit-node');

let client: Record<string, any>;

export default function () {
  if (client) { return client; }

  client = new Fitbit({
    clientId: process.env.FITBIT_CLIENT_ID,
    clientSecret: process.env.FITBIT_CLIENT_SECRET,
    apiVersion: '1.2',
  });

  return client;
}


