const asyncHandler = require('express-async-handler');
const db = require('../db/queries');
const { validationResult } = require('express-validator');
const validateGenreData = require('../middleware/validateGenreData');
const validateAdminPW = require('../middleware/validateAdminPW');

const getGenres = asyncHandler(async (req, res) => {
  const genres = await db.getGenres();
  res.render('genres', { title: 'Genres', genres });
});

const getGenreGames = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const [genreName] = await db.getGenreById(id);
  const games = await db.getGenreGames(id);
  res.render('games', { title: `${genreName.name} games`, games, id });
});

const newGenreGet = (req, res) => {
  res.render('genreForm', { title: 'Add a genre' });
};

const newGenrePost = [
  validateGenreData,
  asyncHandler(async (req, res) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).render('genreForm', {
        title: 'Add a genre',
        errors: result.array(),
      });
    }

    await db.addGenre(req.body);
    res.redirect('/genres');
  }),
];

const updateGenreGet = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const [genre] = await db.getAllGenreDataById(id);

  res.render('updateGenre', { title: 'Update the genre', genre });
});

const updateGenrePost = [
  validateGenreData,
  validateAdminPW,
  asyncHandler(async (req, res) => {
    const result = validationResult(req);
    const { id } = req.params;
    const [genre] = await db.getAllGenreDataById(id);

    if (!result.isEmpty()) {
      return res.status(400).render('updateGenre', {
        title: 'Update the genre',
        genre,
        errors: result.array(),
      });
    }

    await db.updateGenre(req.body, id);
    res.redirect('/genres');
  }),
];

const deleteGenreGet = (req, res) => {
  const { id } = req.params;

  res.render('deleteGenre', { title: 'Delete the genre', id });
};

const deleteGenrePost = [
  validateAdminPW,
  asyncHandler(async (req, res) => {
    const result = validationResult(req);
    const { id } = req.params;

    if (!result.isEmpty()) {
      return res.status(400).render('deleteGenre', {
        title: 'Delete the genre',
        errors: result.array(),
        id,
      });
    }

    await db.deleteGenre(id);
    res.redirect('/genres');
  }),
];

module.exports = {
  getGenres,
  getGenreGames,
  newGenreGet,
  newGenrePost,
  updateGenreGet,
  updateGenrePost,
  deleteGenreGet,
  deleteGenrePost,
};
