const router = require('express').Router();
const greetingsController = require('../controllers/greetings')

// greetings
router.get('/', greetingsController.helloRoute);

// swagger 
router.use('/', require('./swagger'));

// users
router.use('/users', require('./users'));

module.exports = router;