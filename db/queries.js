const pool = require('./pool');

async function getGenres() {
  const { rows } = await pool.query('SELECT * FROM genres');
  return rows;
}

async function getGames() {
  const { rows } = await pool.query('SELECT id, name FROM games');
  return rows;
}

async function getGameById(id) {
  const { rows } = await pool.query(
    'SELECT id, img, name, description, price, rating, publisher, publish_date, in_stock FROM games WHERE id = $1',
    [id],
  );
  return rows;
}

module.exports = { getGenres, getGames, getGameById };
