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

        const adventures = adventureData.map((adventureInfo) => adventureInfo.get({ plain: true }));

        res.render('profile', {
            adventures,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});


// root/profile/filter
router.get('/profile/filter/indoor/:indoor/distance/:distance/time/:time', withAuth, async (req, res) => {
    try {
        const AllDataSQL = await Adventure.findAll({
            order: [['name', 'ASC']],
        });
        const AllData = AllDataSQL.map((filterData) => filterData.get({ plain: true }));

        const filterIndoor = req.params.indoor;
        const filterDistance = parseInt(req.params.distance);
        const filterTime = parseInt(req.params.time);

        var adventures = [];

        AllData.forEach(data => {
            if (filterIndoor === `${!data.outdoor}` && filterDistance >= data.distance && filterTime >= data.time) {
                adventures.push(data);
            }
        })

        res.render('profile', {
            adventures,
        });

    } catch (err) {
        res.status(400).json(err);
    }
});


module.exports = router;
