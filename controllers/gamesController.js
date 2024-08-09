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
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description cannot be empty')
    .isLength({ min: 1, max: 255 })
    .withMessage('Description must be between 1 and 255 characters'),
  body('genre')
    .trim()
    .notEmpty()
    .withMessage('Genre cannot be empty')
    .isLength({ min: 1, max: 255 })
    .withMessage('Genre must be between 1 and 255 characters'),
  body('price')
    .trim()
    .notEmpty()
    .withMessage('Price cannot be empty')
    .isInt()
    .withMessage('Price must be an integer')
    .isLength({ min: 1, max: 255 })
    .withMessage('Price must be between 1 and 255 characters'),
  body('rating')
    .trim()
    .notEmpty()
    .withMessage('Rating cannot be empty')
    .isNumeric()
    .withMessage('Rating must be either an integer or a floating point number')
    .isLength({ min: 1, max: 3 })
    .withMessage('Rating must be between 1 and 3 characters'),
  body('publisher')
    .trim()
    .notEmpty()
    .withMessage('Publisher cannot be empty')
    .isLength({ min: 1, max: 255 })
    .withMessage('Publisher must be between 1 and 255 characters'),
  body('publishDate')
    .trim()
    .notEmpty()
    .withMessage('Publish date cannot be empty')
    .isDate()
    .withMessage('Publish date should be in the date format')
    .isLength({ min: 1, max: 255 })
    .withMessage('Publish date must be between 1 and 255 characters'),
  body('inStock')
    .trim()
    .notEmpty()
    .withMessage('In stock number cannot be empty')
    .isInt()
    .withMessage('In stock number must be an integer')
    .isLength({ min: 1 })
    .withMessage('In stock number must be at least 1'),
  body('url')
    .trim()
    .optional({ values: 'falsy' })
    .isLength({ min: 1, max: 255 })
    .withMessage('Image URL must be between 1 and 255 characters'),
];

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
  res.render('gameForm', { title: 'Add a game' });
});

const newGamePost = [
  validateFormData,
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
