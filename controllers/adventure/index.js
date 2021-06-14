const router = require('express').Router();
const adventureRoutes = require('./adventureRoutes');

router.use('/adventure', adventureRoutes);

module.exports = router;
