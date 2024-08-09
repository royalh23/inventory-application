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

async function getGameGenres(id) {
  const SQL = `
  SELECT genres.id, genres.name
  FROM games
  LEFT JOIN genres_games
  ON games.id = genres_games.game_id
  LEFT JOIN genres
  ON genres_games.genre_id = genres.id
  WHERE games.name = (SELECT name FROM games WHERE id = $1);
  `;
  const { rows } = await pool.query(SQL, [id]);
  return rows;
}

async function addGame(game) {
  const SQL = `
  INSERT INTO games
  (img, name, description, price, rating, publisher, publish_date, in_stock) 
  VALUES 
    ($1, $2, $3, $4, $5, $6, $7, $8);
  `;
  const SQL2 = `
  INSERT INTO genres_games
  (genre_id, game_id)
  VALUES
    ((SELECT id FROM genres WHERE name = $1), (SELECT id FROM games WHERE name = $2));
  `;

  await pool.query(SQL, [
    game.url,
    game.name,
    game.description,
    game.price,
    game.rating,
    game.publisher,
    game.publishDate,
    game.inStock,
  ]);
  await pool.query(SQL2, [game.genre, game.name]);
}

module.exports = {
  getGenres,
  getGenreById,
  getGames,
  getGameById,
  getGenreGames,
  getGameGenres,
  addGame,
};
