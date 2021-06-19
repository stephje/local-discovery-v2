const router = require('express').Router();
const { Adventure } = require('../../models');
const withAuth = require('../../utils/auth');


router.post('/', withAuth, async (req, res) => {
    // console.log(`req.body.indoor = ${req.body.indoor}`)
    // console.log(`req.body.distance = ${req.body.distance}`)
    // console.log(`req.body.time = ${req.body.time}`)
    try {

        //Adventure Data
        const AllDataSQL = await Adventure.findAll({
            order: [['name', 'ASC']],
        });
        const AllData = AllDataSQL.map((filterData) => filterData.get({ plain: true }));

        var adventures = [];

        AllData.forEach((data) => {
            if (req.params.indoor == !data.outdoor && req.params.distance >= data.distance && req.params.time >= data.time) {
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