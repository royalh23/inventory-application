const asyncHandler = require('express-async-handler');
const db = require('../db/queries');
const { validationResult } = require('express-validator');
const validateGameData = require('../middleware/validateGameData');

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

const newGameGet = (req, res) => {
  res.render('gameForm', { title: 'Add a game' });
};

const newGamePost = [
  validateGameData,
  asyncHandler(async (req, res) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).render('gameForm', {
        title: 'Add a game',
        errors: result.array(),
      });
    }

    await db.addGame(req.body);
    res.redirect('/games');
  }),
];

module.exports = { getGames, getGameById, newGameGet, newGamePost };
