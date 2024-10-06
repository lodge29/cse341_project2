const express = require('express');
const router = express.Router();
const validation = require('./validation/validation.js');
const usersController = require('../controllers/users');

const { userValidationRules, validate } = require('./validation/validation.js')

// GET PUT, POST, DELETE
router.get('/', usersController.getAll);
router.get('/:id', usersController.getSingle);
router.post('/',userValidationRules(), validate, usersController.createUser);

//router.put('/:id', usersController.updateUser);
//router.delete('/:id', usersController.deleteUser);


module.exports = router;