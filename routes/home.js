const router = require('express').Router();

const userRoute = require('./user');

const controller = require('../controllers/homeController');


router.get('/',controller.home);

router.use('/user',userRoute);
router.use('/api',require('./api/apiRoot'));

module.exports = router;