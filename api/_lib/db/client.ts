require('dotenv').config();

import { DynamoDB, config } from 'aws-sdk';

config.update({
  accessKeyId: process.env.APP_AWS_ACCESS_KEY_ID || 'nil',
  secretAccessKey: process.env.APP_AWS_SECRET_ACCESS_KEY || 'nil',
  region: process.env.APP_AWS_REGION || 'nil',
});

const endpoint = process.env.DYNAMODB_ENDPOINT || undefined;

export const documentClient: DynamoDB.DocumentClient = new DynamoDB.DocumentClient({ endpoint });
