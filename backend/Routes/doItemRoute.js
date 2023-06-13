const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const doItemController = require('../Controllers/doItemController');

router.post('/list', doItemController.addListItem);
router.get('/list', doItemController.getAllListItems);
router.put('/list', doItemController.updateListItem);
router.delete('/list', doItemController.deleteListItem);

//AGAIN, IMPORT THE DAMN THINGS CORRECTLY

