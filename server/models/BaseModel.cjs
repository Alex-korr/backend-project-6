// @ts-check
const { Model } = require('objection');

module.exports = class BaseModel extends Model {
  static get modelPaths() {
    return [__dirname];
  }

  $parseDatabaseJson(json) {
    // Don't convert column names from snake_case to camelCase
    return json;
  }

  $formatDatabaseJson(json) {
    // Don't convert column names from camelCase to snake_case
    return json;
  }
};
