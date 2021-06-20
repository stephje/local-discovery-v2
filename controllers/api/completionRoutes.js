const router = require('express').Router();
const { userCottesloe, userKingspark } = require('../../models');
const withAuth = require('../../utils/auth');

// root/api/completion/cottesloe
router.post('/:location', withAuth, async (req, res) => {
    const location = req.params.location;
    const dateCompleted = req.body.dateFinished;

    switch (location) {
        case 'cottesloe':
            try {
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
            break;
        case 'kingspark':
            try {
                await userKingspark.update(
                    {
                        dateCompletedRecent: dateCompleted,
                    },
                    {
                        where:
                            { user_id: req.session.user_id }
                    },
                )

                res.redirect(`/api/review/kingspark`)

            } catch (err) {
                console.log(err);
                res.status(500).json(err);
            }
            break;
    }
})


// router.post('/cottesloe', withAuth, async (req, res) => {
//     try {

//         const dateCompleted = req.body.dateFinished;

//         await userCottesloe.update(
//             {
//                 dateCompletedRecent: dateCompleted,
//             },
//             {
//                 where:
//                     { user_id: req.session.user_id }
//             },
//         )

//         res.redirect(`/api/review/cottesloe`)

//     } catch (err) {
//         console.log(err);
//         res.status(500).json(err);
//     }
// })

module.exports = router;