const router = require('express').Router();
const { userCottesloe } = require('../../models');
const withAuth = require('../../utils/auth');

// root/api/completion/cottesloe
router.post('/cottesloe', withAuth, async (req, res) => {
    try {

        const dateCompleted = req.body.dateFinished;

        await userCottesloe.update(
            {
                dateCompletedRecent: dateCompleted,
            },
            {
                where:
                    { user_id: req.session.user_id }
            },
        )

        res.redirect(`/api/review/cottesloe`)

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = router;