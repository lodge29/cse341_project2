const express = require('express');
const router = express.Router();
const SuperheroController = require('../controllers/superheros.js');

const { userValidationRules, validate } = require('./validation/validation.js')

// GET PUT, POST, DELETE
router.get('/', SuperheroController.getAllSuperheros);
router.get('/:id', SuperheroController.getSingleSuperhero);
router.post('/',userValidationRules(), validate, SuperheroController.createSuperhero);
router.put('/:id', SuperheroController.updateSuperhero);
router.delete('/:id', SuperheroController.deleteSuperhero);


module.exports = router;