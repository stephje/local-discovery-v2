const router = require('express').Router();
const { userCottesloe } = require('../../models');
const withAuth = require('../../utils/auth');

// root/api/review/cottesloe
router.get('/cottesloe', async (req, res) => {
    try {
        res.render('review', {
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// root/api/review/cottesloe
router.post('/cottesloe', withAuth, async (req, res) => {
    try {

        const rating = parseInt(req.body.finalRating);
        const description = req.body.ratingDescription;

        await userCottesloe.update(
            {
                ratingNo: rating,
                ratingDesc: description
            },
            {
                where:
                    { user_id: req.session.user_id }
            },
        )

        res.redirect(`/profile`)

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = router;