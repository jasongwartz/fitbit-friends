require('dotenv').config();

import { DynamoDB, config } from 'aws-sdk';

import log from '../log';

config.update({
  accessKeyId: process.env.APP_AWS_ACCESS_KEY_ID || 'nil',
  secretAccessKey: process.env.APP_AWS_SECRET_ACCESS_KEY || 'nil',
  region: process.env.APP_AWS_REGION || 'nil',
});

const endpoint = process.env.DYNAMODB_ENDPOINT || undefined;
log.info(`> Creating DynamoDB DocumentClient for region: ${config.region}`);

export const documentClient: DynamoDB.DocumentClient = new DynamoDB.DocumentClient({ endpoint });
