const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');

//AGAIN, IMPORT THE DAMN THINGS CORRECTLY


router.post('/signup', userController.signup)
router.post('/login',  userController.login) //gets token from this function right here

/*

*To use JWT:

add in an authorization field in the headers of the next request, and add in the token value there

*/

module.exports = router;

// final version of userRoute.js