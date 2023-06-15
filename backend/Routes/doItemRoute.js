const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const doItemController = require('../Controllers/doItemController');

const isAuthorized = (req, res, next) => {
    const token = req.headers.authorization

    if (!token) {
        return res.status(403).send({message: "You are not allowed to perform this action"})
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    req.user = decoded
    next()
}

router.post('/list', doItemController.addListItem);
router.get('/list', doItemController.getAllListItems);
router.put('/list', doItemController.updateListItem);
router.delete('/list', doItemController.deleteListItem);

//AGAIN, IMPORT THE DAMN THINGS CORRECTLY

module.exports = router; //added this in later, forgot to add it in the first time