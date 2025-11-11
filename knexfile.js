export default {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './db.sqlite3',
    },
    useNullAsDefault: true,
  },
  test: {
    client: 'sqlite3',
    connection: {
      filename: ':memory:', // in-memory
    },
    useNullAsDefault: true,
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
  },
};
