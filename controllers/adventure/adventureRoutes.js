const router = require('express').Router();
const {
    Adventure,
    Cottesloe,
    userCottesloe,
    Kingspark,
    userKingspark,
} = require('../../models');
const withAuth = require('../../utils/auth');
const distFrom = require('distance-from');

// root/adventure/cottesloe
router.get('/cottesloe', withAuth, async (req, res) => {
    try {
        const cottesloeData = await Cottesloe.findAll({
            order: [['sequence', 'ASC']],
        });

        const cottesloeArray = cottesloeData.map(adventureInfo =>
            adventureInfo.get({ plain: true })
        );
        const adventure = cottesloeArray[0];

        const userCottesloeData = await userCottesloe.findAll({
            where: {
                id: req.session.user_id,
            },
        });

        const userCottesloeArray = userCottesloeData.map(adventureInfo =>
            adventureInfo.get({ plain: true })
        );
        const userSequenceNumber = userCottesloeArray[0].sequence;

        if (userSequenceNumber > 1) {
            res.redirect(`/adventure/cottesloe/${userSequenceNumber}`);
        } else {
            res.render('adventures', {
                adventure,
                logged_in: req.session.logged_in,
            });
        }
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
                where: { user_id: req.session.user_id },
            }
        );

        const cottesloeData = await Cottesloe.findAll({
            where: {
                sequence: sequenceNo,
            },
        });

        const adventures = cottesloeData.map(adventureInfo =>
            adventureInfo.get({ plain: true })
        );
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
            },
        });

        const adventures = cottesloeData.map(adventureInfo =>
            adventureInfo.get({ plain: true })
        );
        const adventure = adventures[0];

        let userLocation = [req.query.lat, req.query.lon];
        let waypointLocation = [adventure.lat, adventure.lon];

        let distance = distFrom(userLocation).to(waypointLocation).in('m');

        res.json(distance);
    } catch (err) {
        res.status(500).json(err);
    }
});

// root/adventure/kingspark
router.get('/kingspark', withAuth, async (req, res) => {
    try {
        const kingsparkData = await Kingspark.findAll({
            order: [['sequence', 'ASC']],
        });

        const kingsparkArray = kingsparkData.map(adventureInfo =>
            adventureInfo.get({ plain: true })
        );
        const adventure = kingsparkArray[0];

        const userKingsparkData = await userKingspark.findAll({
            where: {
                id: req.session.user_id,
            },
        });

        const userKingsparkArray = userKingsparkData.map(adventureInfo =>
            adventureInfo.get({ plain: true })
        );
        const userSequenceNumber = userKingsparkArray[0].sequence;

        if (userSequenceNumber > 1) {
            res.redirect(`/adventure/kingspark/${userSequenceNumber}`);
        } else {
            res.render('adventures', {
                adventure,
                logged_in: req.session.logged_in,
            });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/kingspark/:seqNo', async (req, res) => {
    const sequenceNo = req.params.seqNo;

    try {
        //update sequence number
        await userKingspark.update(
            { sequence: sequenceNo },
            {
                where: { user_id: req.session.user_id },
            }
        );

        const kingsparkData = await Kingspark.findAll({
            where: {
                sequence: sequenceNo,
            },
        });

        const adventures = kingsparkData.map(adventureInfo =>
            adventureInfo.get({ plain: true })
        );
        const adventure = adventures[0];

        res.render('adventures', {
            adventure,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/kingspark/:seqNo/location', async (req, res) => {
    const sequenceNo = req.params.seqNo;

    try {
        const kingsparkData = await Kingspark.findAll({
            where: {
                sequence: sequenceNo,
            },
        });

        const adventures = kingsparkData.map(adventureInfo =>
            adventureInfo.get({ plain: true })
        );
        const adventure = adventures[0];

        let userLocation = [req.query.lat, req.query.lon];
        let waypointLocation = [adventure.lat, adventure.lon];

        let distance = distFrom(userLocation).to(waypointLocation).in('m');

        res.json(distance);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
