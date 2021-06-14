const router = require('express').Router();
const withAuth = require('../utils/auth');


// root/
router.get('/', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/profile');
        return;
    }
    res.render('login');
});

// root/login
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/profile');
        return;
    }
    res.render('login');
});

// root/profile
router.get('/profile', withAuth, (req, res) => {

    res.render('profile', {
        logged_in: req.session.logged_in,
    });
});

module.exports = router;
