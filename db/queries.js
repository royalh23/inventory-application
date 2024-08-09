const pool = require('./pool');

async function getGenres() {
  const { rows } = await pool.query('SELECT * FROM genres');
  return rows;
}

async function getGenreById(id) {
  const { rows } = await pool.query('SELECT name FROM genres WHERE id = $1', [
    id,
  ]);
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

async function getGenreGames(id) {
  const SQL = `
  SELECT games.id, games.name
  FROM genres
  INNER JOIN genres_games
  ON genres.id = genres_games.genre_id
  INNER JOIN games
  ON genres_games.game_id = games.id
  WHERE genres.name = (SELECT name FROM genres WHERE id = $1);
  `;
  const { rows } = await pool.query(SQL, [id]);
  return rows;
}

module.exports = {
  getGenres,
  getGenreById,
  getGames,
  getGameById,
  getGenreGames,
};
