const router = require('express').Router();
const greetingsController = require('../controllers/greetings')

// greetings
router.get('/', greetingsController.helloRoute);

// swagger 
router.use('/', require('./swagger'));

// users
router.use('/superheros', require('./superheros'));

module.exports = router;