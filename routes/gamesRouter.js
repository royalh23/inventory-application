const gamesController = require('../controllers/gamesController');
const { Router } = require('express');
const router = Router();

router.get('/', gamesController.getGames);
router.get('/:id', gamesController.getGameById);

module.exports = router;
