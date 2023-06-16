const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const userController = require('../Controllers/userController');

//AGAIN, IMPORT THE DAMN THINGS CORRECTLY

const isAuthorized = (req, res, next) => {
    const token = req.headers.authorization

    if (!token) {
        return res.status(403).send({message: "You are not allowed to perform this action"})
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    req.user = decoded
    next()
}

router.post('/signup', userController.signup)
router.post('/login',  userController.login) //gets token from this function right here
router.post('/properties', isAuthorized, userController.addUser) //and then uses it here
router.put('/properties', isAuthorized, userController.editUser)
router.delete('/properties', isAuthorized, userController.deleteUser)

/*

*To use JWT:

add in an authorization field in the headers of the next request, and add in the token value there

*/

module.exports = router;

// final version of userRoute.js