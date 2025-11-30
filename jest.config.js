export default {
  testEnvironment: 'node',
  moduleNameMapper: {},
  transform: {},
  transformIgnorePatterns: [
    '/node_modules/(?!(objection|knex|@fastify|passport-local|i18next|i18next-fs-backend|i18next-http-middleware)/)',
  ],
};
