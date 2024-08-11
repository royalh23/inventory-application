const { body } = require('express-validator');

module.exports = [
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
    .optional({ values: 'falsy' })
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
    .optional({ values: 'falsy' })
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
