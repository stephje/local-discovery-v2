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
router.get('/:location', withAuth, async (req, res) => {
    const location = req.params.location;

    switch (location) {
        case 'cottesloe':
            try {
                const adventureData = await Cottesloe.findAll({
                    order: [['sequence', 'ASC']],
                });

                const userAdventureData = await userCottesloe.findAll({
                    where: {
                        id: req.session.user_id,
                    },
                });

                getAdventureStartData(adventureData, userAdventureData);
            } catch (error) {
                res.status(500).json(err);
            }
            break;
        case 'kingspark':
            try {
                const adventureData = await Kingspark.findAll({
                    order: [['sequence', 'ASC']],
                });

                const userAdventureData = await userKingspark.findAll({
                    where: {
                        id: req.session.user_id,
                    },
                });

                getAdventureStartData(adventureData, userAdventureData);
            } catch (error) {
                res.status(500).json(err);
            }
            break;
    }

    function getAdventureStartData(adventureData, userAdventureData) {
        const adventureDataArray = adventureData.map(adventureInfo =>
            adventureInfo.get({ plain: true })
        );
        const adventure = adventureDataArray[0];

        const userAdventureArray = userAdventureData.map(adventureInfo =>
            adventureInfo.get({ plain: true })
        );
        const userSequenceNumber = userAdventureArray[0].sequence;

        if (userSequenceNumber > 1) {
            res.redirect(`/adventure/${location}/${userSequenceNumber}`);
        } else {
            res.render('adventures', {
                adventure,
                logged_in: req.session.logged_in,
            });
        }
    }
});

router.get('/:location/:seqNo', withAuth, async (req, res) => {
    const sequenceNo = req.params.seqNo;
    const location = req.params.location;

    switch (location) {
        case 'cottesloe':
            try {
                //update sequence number
                await userCottesloe.update(
                    { sequence: sequenceNo },
                    {
                        where: { user_id: req.session.user_id },
                    }
                );

                //get card data
                const adventureData = await Cottesloe.findAll({
                    where: {
                        sequence: sequenceNo,
                    },
                });

                render(adventureData);
            } catch (err) {
                res.status(500).json(err);
            }
            break;
        case 'kingspark':
            try {
                //update sequence number
                await userKingspark.update(
                    { sequence: sequenceNo },
                    {
                        where: { user_id: req.session.user_id },
                    }
                );

                //get card data
                const adventureData = await Kingspark.findAll({
                    where: {
                        sequence: sequenceNo,
                    },
                });

                render(adventureData);
            } catch (err) {
                res.status(500).json(err);
            }
            break;
    }

    function render(adventureData) {
        const adventures = adventureData.map(adventureInfo =>
            adventureInfo.get({ plain: true })
        );
        const adventure = adventures[0];

        res.render('adventures', {
            adventure,
            logged_in: req.session.logged_in,
        });
    }
});

router.get('/:location/:seqNo/location', async (req, res) => {
    const sequenceNo = req.params.seqNo;
    const location = req.params.location;

    switch (location) {
        case 'cottesloe':
            try {
                const adventureData = await Cottesloe.findAll({
                    where: {
                        sequence: sequenceNo,
                    },
                });
                calculateDistance(adventureData);
            } catch (error) {
                res.status(500).json(err);
            }
            break;
        case 'kingspark':
            try {
                const adventureData = await Kingspark.findAll({
                    where: {
                        sequence: sequenceNo,
                    },
                });
                calculateDistance(adventureData);
            } catch (error) {
                res.status(500).json(err);
            }
            break;
    }

    function calculateDistance(adventureData) {
        const adventures = adventureData.map(adventureInfo =>
            adventureInfo.get({ plain: true })
        );
        const adventure = adventures[0];

        let userLocation = [req.query.lat, req.query.lon];
        let waypointLocation = [adventure.lat, adventure.lon];

        let distance = distFrom(userLocation).to(waypointLocation).in('m');
        res.json(distance);
    }
});

module.exports = router;
