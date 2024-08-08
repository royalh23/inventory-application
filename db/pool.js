const { Pool } = require('pg');
require('dotenv').config();

module.exports = new Pool({
  connectionString:
    process.env.NODE_ENV === 'dev'
      ? process.env.PGSTRING_LOCAL
      : process.env.PGSTRING_REMOTE,
});
