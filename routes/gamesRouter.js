const gamesController = require('../controllers/gamesController');
const { Router } = require('express');
const router = Router();

router.get('/add', gamesController.newGameGet);
router.post('/add', gamesController.newGamePost);
router.get('/:id', gamesController.getGameById);
router.get('/', gamesController.getGames);

module.exports = router;
