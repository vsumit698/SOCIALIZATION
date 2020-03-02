const router = require('express').Router();
const controller  = require('../controllers/controller');

router.get('/',controller.user);
router.get('/post',controller.post);
router.get('/like',controller.like);


module.exports = router;
