const genresController = require('../controllers/genresController');
const { Router } = require('express');
const router = Router();

router.get('/add', genresController.newGenreGet);
router.post('/add', genresController.newGenrePost);
router.get('/:id/update', genresController.updateGenreGet);
router.post('/:id/update', genresController.updateGenrePost);
router.get('/:id', genresController.getGenreGames);
router.get('/', genresController.getGenres);

module.exports = router;
