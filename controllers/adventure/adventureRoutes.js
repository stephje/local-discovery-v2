const router = require('express').Router();
const { Adventure, Cottesloe, userCottesloe } = require('../../models');
const withAuth = require('../../utils/auth');
const distFrom = require('distance-from');
// require('dotenv').config();

// root/adventure/cottesloe
router.get('/cottesloe', withAuth, async (req, res) => {

    try {
        const cottesloeData = await Cottesloe.findAll({
            order: [['title', 'ASC']],
        });

        const adventures = cottesloeData.map((adventureInfo) => adventureInfo.get({ plain: true }));
        const adventure = adventures[0];

        // const user = process.env.DB_USER;

        res.render('adventures', {
            adventure,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/cottesloe/:seqNo', async (req, res) => {
    const sequenceNo = req.params.seqNo;

    try {
        //update sequence number 
        await userCottesloe.update(
            { sequence: sequenceNo },
            {
                where:
                    { user_id: req.session.user_id }
            })


        const cottesloeData = await Cottesloe.findAll({
            where: {
                sequence: sequenceNo,
            }
        });

        const adventures = cottesloeData.map((adventureInfo) => adventureInfo.get({ plain: true }));
        const adventure = adventures[0];


        res.render('adventures', {
            adventure,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }

});

router.get('/cottesloe/:seqNo/location', async (req, res) => {
    const sequenceNo = req.params.seqNo;

    try {
        const cottesloeData = await Cottesloe.findAll({
            where: {
                sequence: sequenceNo,
            }
        });

        const adventures = cottesloeData.map((adventureInfo) => adventureInfo.get({ plain: true }));
        const adventure = adventures[0];

        let userLocation = [req.query.lat, req.query.lon];
        let waypointLocation = [adventure.lat, adventure.lon]

        let distance = distFrom(userLocation).to(waypointLocation).in('m');

        res.json(distance);

    } catch (err) {
        res.status(500).json(err);
    }

});

// root/adventure/kingspark
router.get('/kingspark', withAuth, async (req, res) => {
    try {
        const adventureData = await Adventure.findAll({
            order: [['name', 'ASC']],
        });

        const adventures = adventureData.map((adventureInfo) => adventureInfo.get({ plain: true }));

        res.render('adventures', {
            adventures,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }

});

module.exports = router;