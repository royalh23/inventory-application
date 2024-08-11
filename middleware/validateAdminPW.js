const { body } = require('express-validator');

module.exports = [
  body('pw')
    .trim()
    .notEmpty()
    .withMessage('Password cannot be empty')
    .equals('Royal2002@@23')
    .withMessage('Incorrect password'),
];
