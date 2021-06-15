const router = require('express').Router();
const { Adventure, Cottesloe } = require('../../models');
const withAuth = require('../../utils/auth');

// root/adventure/cottesloe
router.get('/cottesloe', withAuth, async (req, res) => {
    try {
        const cottesloeData = await Cottesloe.findAll({
            order: [['title', 'ASC']],
        });

        const adventures = cottesloeData.map((adventureInfo) => adventureInfo.get({ plain: true }));
        const adventure = adventures[0];
        console.log(cottesloeData)
        console.log(adventures)

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
        const cottesloeData = await Cottesloe.findAll({
            where: {
                sequence: sequenceNo,
            }
        });

        const adventures = cottesloeData.map((adventureInfo) => adventureInfo.get({ plain: true }));
        const adventure = adventures[0];
        console.log(cottesloeData)
        console.log(adventures)

        res.render('adventures', {
            adventure,
            logged_in: req.session.logged_in,
        });
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