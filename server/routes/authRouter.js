const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.route("/")  
    .post(authController.isUserValid)
    .get(authController.sessionExists)
    .delete(authController.deleteSession);

module.exports = router;