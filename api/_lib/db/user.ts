import { DynamoDB } from 'aws-sdk';

import { FitbitUserData } from '../fitbit/user';
import { documentClient } from './client';
import { TABLES } from './tables';

const { users: USER_TABLE } = TABLES;

// TODO: write tests - https://jestjs.io/docs/en/dynamodb

export async function storeUserToken(userData: FitbitUserData): Promise<void> {
  const putItem: DynamoDB.DocumentClient.PutItemInput = {
    TableName: USER_TABLE.tableName,
    Item: userData,
  };

  await documentClient.put(putItem).promise();
}

export async function getUserToken(userID: string): Promise<string> {
  const getItemParams: DynamoDB.DocumentClient.GetItemInput = {
    TableName: USER_TABLE.tableName,
    Key: {
      [USER_TABLE.primaryKey]: userID,
    },
  };

  const { Item: item } = await documentClient.get(getItemParams).promise();

  if (item) {
    const { access_token: token } = item;
    if (token) { return token; }
  }
  throw new Error('token not defined');
}
