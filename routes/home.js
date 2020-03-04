const router = require('express').Router();
const userRoute = require('./user');
const controller = require('../controllers/controller');


router.get('/',controller.home);

router.use('/user',userRoute);
module.exports = router;