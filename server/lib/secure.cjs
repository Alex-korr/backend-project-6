const crypto = require('crypto');

module.exports = (password) => {
  if (!password) return '';
  return crypto.createHash('sha256').update(password).digest('hex');
};
