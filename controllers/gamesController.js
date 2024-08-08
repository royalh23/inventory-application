const asyncHandler = require('express-async-handler');
const db = require('../db/queries');

const getGames = asyncHandler(async (req, res) => {
  const games = await db.getGames();
  res.render('games', { title: 'Games', games });
});

module.exports = { getGames };
