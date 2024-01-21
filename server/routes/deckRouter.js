const express = require('express');
const router = express.Router();
const deckController = require('../controllers/deckController');

router.route("/")  
    .post(deckController.createDeck);

router.route("/edit")  
    .post(deckController.addCard);

router.route("/edit/:deckId")  
    .get(deckController.getCards);


router.route("/:userId")
    .get(deckController.getDecks);

module.exports = router;