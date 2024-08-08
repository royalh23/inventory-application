const pool = require('./pool');

async function getGenres() {
  const { rows } = await pool.query('SELECT * FROM genres');
  return rows;
}

module.exports = { getGenres };
