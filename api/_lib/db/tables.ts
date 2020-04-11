interface TableDefinition {
  tableName: string;
  primaryKey: string;
}

export const TABLES: {[tableName: string]: TableDefinition } = {
  users: {
    tableName: 'preview_users',
    primaryKey: 'user_id',
  },
  friends: {
    tableName: 'preview_friends',
    primaryKey: 'user_id',
  },
};
