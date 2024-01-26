const express = require('express');
const { loginController, RegisterController } = require('../controller/userCtrl');

//router object
const router = express.Router();

// login routes || POST
router.post('/login',loginController);

//register routes || POST
router.post('/register',RegisterController);

module.exports = router;