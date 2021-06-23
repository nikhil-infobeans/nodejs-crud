// Import the routes from different modules
const userRoutes = require('./src/components/user/routes');
const router = require('express').Router();

router.use('/users', userRoutes);

module.exports = router;