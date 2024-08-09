const asyncHandler = require('express-async-handler');
const db = require('../db/queries');

const getGenres = asyncHandler(async (req, res) => {
  const genres = await db.getGenres();
  res.render('genres', { title: 'Genres', genres });
});

const getGenreGames = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const [genreName] = await db.getGenreById(id);
  const games = await db.getGenreGames(id);
  res.render('games', { title: `${genreName.name} games`, games });
});

module.exports = { getGenres, getGenreGames };
