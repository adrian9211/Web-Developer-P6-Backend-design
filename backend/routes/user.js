// Router for Controller for user autentication app
const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);                    // Post function assigned for signup
router.post('/login', userCtrl.login);                      // Post function assigned for login

module.exports = router;                                    // Export router