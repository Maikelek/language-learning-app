const express = require('express');
const router = express.Router();
const deckController = require('../controllers/deckController');

router.route("/")  
    .post(deckController.createDeck);

router.route("/edit")  
    .post(deckController.addCard)

router.route("/edit/:id")  
    .get(deckController.getCards)
    .delete(deckController.deleteCard)
    .put(deckController.editCard);

router.route("/:id")  
    .delete(deckController.deleteDeck);

router.route("/:userId")
    .get(deckController.getDecks);

module.exports = router;