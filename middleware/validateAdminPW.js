const { body } = require('express-validator');
require('dotenv').config();

module.exports = [
  body('pw')
    .trim()
    .notEmpty()
    .withMessage('Password cannot be empty')
    .equals(process.env.ADMIN_PW)
    .withMessage('Incorrect password'),
];
