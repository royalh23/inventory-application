const asyncHandler = require('express-async-handler');
const db = require('../db/queries');
const { body, validationResult } = require('express-validator');

const validateFormData = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name cannot be empty')
    .isLength({ min: 1, max: 255 })
    .withMessage('Name must be between 1 and 255 characters'),
  body('url')
    .trim()
    .optional({ values: 'falsy' })
    .isLength({ min: 1, max: 255 })
    .withMessage('Image URL must be between 1 and 255 characters'),
];

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

const newGenreGet = (req, res) => {
  res.render('genreForm', { title: 'Add a genre' });
};

const newGenrePost = [
  validateFormData,
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

module.exports = { getGenres, getGenreGames, newGenreGet, newGenrePost };
