const express = require('express');
const router = express.Router();
const SuperheroController = require('../controllers/superheros.js');
const { userValidationRules, validate } = require('./validation/validation.js');
const { isAuthenticated } = require('../middleware/authenticate.js');

// GET PUT, POST, DELETE
router.get('/', SuperheroController.getAllSuperheros);
router.get('/:id', SuperheroController.getSingleSuperhero);
//router.post('/', userValidationRules(), validate, SuperheroController.createSuperhero);
//router.put('/:id', userValidationRules(), validate, SuperheroController.updateSuperhero);
//router.delete('/:id', SuperheroController.deleteSuperhero);

router.post('/', isAuthenticated, userValidationRules(), validate, SuperheroController.createSuperhero);
router.put('/:id', isAuthenticated, userValidationRules(), validate, SuperheroController.updateSuperhero);
router.delete('/:id', isAuthenticated, SuperheroController.deleteSuperhero);


module.exports = router;