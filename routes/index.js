const router = require('express').Router();
const greetingsController = require('../controllers/greetings');
const passport = require('passport');

// greetings
router.get('/', greetingsController.helloRoute);

// swagger 
router.use('/', require('./swagger'));

// users
router.use('/superheros', require('./superheros'));

// week 4 log in and logout
router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

module.exports = router;