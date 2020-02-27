const router = require('express').Router();
const controller  = require('../controllers/action');
router.get('/post',controller.post);
router.get('/like',controller.like);


module.exports = router;
