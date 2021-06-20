const router = require('express').Router();
const userRoutes = require('./userRoutes');
const reviewRoutes = require('./reviewRoutes');
const completionRoutes = require('./completionRoutes');


router.use('/users', userRoutes);
router.use('/review', reviewRoutes);
router.use('/completion', completionRoutes);

module.exports = router;
