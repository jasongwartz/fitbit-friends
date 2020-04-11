require('dotenv').config();

import { DynamoDB, config } from 'aws-sdk';

config.update({
  accessKeyId: 'nil',
  secretAccessKey: 'nil',
  region: 'nil',
});

const endpoint = process.env.DYNAMODB_ENDPOINT || undefined;

export const rawClient = new DynamoDB({ endpoint });

export const documentClient: DynamoDB.DocumentClient = new DynamoDB.DocumentClient({ endpoint });
