export default {
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  testEnvironment: 'node',
  moduleNameMapper: {},
  transformIgnorePatterns: [
    '/node_modules/(?!(objection|knex|@fastify|passport-local|i18next|i18next-fs-backend|i18next-http-middleware)/)',
  ],
};
