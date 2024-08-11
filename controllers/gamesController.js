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

const newGameGet = asyncHandler(async (req, res) => {
  const genres = await db.getGenres();
  res.render('gameForm', { title: 'Add a game', genres });
});

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

const updateGameGet = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const [game] = await db.getGameById(id);
  const genres = await db.getGenres();
  const checkedGenres = await db.getGameGenres(id);
  res.render('updateGame', {
    title: 'Update game data',
    game,
    genres,
    checkedGenres,
  });
});

const updateGamePost = [
  validateGameData,
  asyncHandler(async (req, res) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).render('updateGame', {
        title: 'Add a game',
        errors: result.array(),
      });
    }

    req.body.id = req.params.id;
    await db.updateGame(req.body);
    res.redirect(`/games/${req.params.id}`);
  }),
];

module.exports = {
  getGames,
  getGameById,
  newGameGet,
  newGamePost,
  updateGameGet,
  updateGamePost,
};
