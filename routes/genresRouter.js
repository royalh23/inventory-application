const genresController = require('../controllers/genresController');
const { Router } = require('express');
const router = Router();

router.get('/', genresController.getGenres);

module.exports = router;
