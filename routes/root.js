const router = require('express').Router();
const userRoute = require('./user');
const controller = require('../controllers/action');
router.get('/',controller.home);
router.get('/user',userRoute);
module.exports = router;