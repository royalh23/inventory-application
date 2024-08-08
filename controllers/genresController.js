const asyncHandler = require('express-async-handler');
const db = require('../db/queries');

const getGenres = asyncHandler(async (req, res) => {
  const genres = await db.getGenres();
  res.render('genres', { title: 'Genres', genres });
});

module.exports = { getGenres };
