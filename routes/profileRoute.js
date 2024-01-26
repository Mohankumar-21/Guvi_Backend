const express =require('express');
const authMiddleware = require('../middleware/authmiddleware');
const {userUpdateProfile, authController} = require('../controller/userCtrl')


//router object
const router = express.Router();

// get user Information
router.post('/getUserInfo', authMiddleware, authController);

//POST update profile

router.post('/updateprofile', authMiddleware, userUpdateProfile);



module.exports = router;