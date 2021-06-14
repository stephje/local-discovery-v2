const router = require('express').Router();
const userRoutes = require('./userRoutes');
const filterRoutes = require('./filterRoutes');

router.use('/users', userRoutes);
router.use('/filter', filterRoutes);

module.exports = router;
