const router = require('express').Router();
const { Adventure } = require('../models');
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
router.get('/profile', withAuth, async (req, res) => {
    try {
        const adventureData = await Adventure.findAll({
            order: [['name', 'ASC']],
        });

        const adventures = adventureData.map((adventureInfo) => adventureInfo.get({ plain: true}));

        res.render('profile', {
            adventures,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }



});

// Prevent non logged in users from viewing the homepage
// router.get('/', withAuth, async (req, res) => {
//     try {
//       const userData = await User.findAll({
//         attributes: { exclude: ['password'] },
//         order: [['name', 'ASC']],
//       });

//       const users = userData.map((project) => project.get({ plain: true }));

//       res.render('homepage', {
//         users,
//         // Pass the logged in flag to the template
//         logged_in: req.session.logged_in,
//       });
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });

module.exports = router;
