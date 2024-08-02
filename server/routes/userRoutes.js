const { getUser } = require('../controllers/userController');
const { protect } = require('../middleware/protect');

const router = require('express').Router();

router.get('/me',protect,getUser);

module.exports = router;
