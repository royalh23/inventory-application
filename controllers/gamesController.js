const asyncHandler = require('express-async-handler');
const db = require('../db/queries');

const getGames = asyncHandler(async (req, res) => {
  const games = await db.getGames();
  res.render('games', { title: 'Games', games });
});

const getGameById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const [game] = await db.getGameById(id);
  const gameGenres = await db.getGameGenres(id);
  game.publish_date = game.publish_date.toString().slice(4, 15);
  res.render('game', { title: game.name, game, gameGenres });
});

module.exports = { getGames, getGameById };
