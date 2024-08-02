const router = require('express').Router();
const events = require("./eventRoutes.js");
const auth = require('./authRoutes.js');
const user = require('./userRoutes.js');

router.use('/events',events);

router.use('/auth',auth);

router.use('/user',user);

module.exports = router;