const router = require('express').Router();

const loginRoutes = require('./loginRoutes.js');
const apiRoutes = require('./api');
const adventureRoutes = require('./adventure')

router.use('/', loginRoutes);
router.use('/', adventureRoutes);
router.use('/api', apiRoutes);

module.exports = router;


// const router = require('express').Router();

// const apiRoutes = require('./api');
// const homeRoutes = require('./homeRoutes');

// router.use('/', homeRoutes);
// router.use('/api', apiRoutes);