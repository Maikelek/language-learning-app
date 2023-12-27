const express = require('express');
const router = express.Router();
const deckController = require('../controllers/deckController');

router.route("/")  
    .post(deckController.createDeck);

router.route("/:userId")
    .get(deckController.getDecks);

module.exports = router;