import { DynamoDB } from 'aws-sdk';

import { rawClient } from './client';

interface TableDefinition {
  tableName: string;
  primaryKey: string;
}

export const TABLES: {[tableName: string]: TableDefinition} = {
  users: {
    tableName: 'users',
    primaryKey: 'user_id',
  },
};

const makeTableParams = (tableData: TableDefinition): DynamoDB.CreateTableInput => ({
  TableName: tableData.tableName,
  AttributeDefinitions: [{
    AttributeName: tableData.primaryKey,
    AttributeType: 'S',
  }],
  KeySchema: [{
    AttributeName: tableData.primaryKey,
    KeyType: 'HASH',
  }],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 5,
  },
});

export async function createTableIfNotExists(): Promise<void[]> {
  return Promise.all(Object.keys(TABLES).map(async (k) => {
    try {
      await rawClient.describeTable({ TableName: k }).promise();
    } catch (e) {
      const err: Error = e;
      if (err.name === 'ResourceNotFoundException') {
        await rawClient.createTable(makeTableParams(TABLES[k])).promise();
      } else {
        throw err;
      }
    }
  }));
}
