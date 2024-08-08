const pool = require('./pool');

async function getGenres() {
  const { rows } = await pool.query('SELECT * FROM genres');
  return rows;
}

async function getGames() {
  const { rows } = await pool.query('SELECT id, name FROM games');
  return rows;
}

module.exports = { getGenres, getGames };
