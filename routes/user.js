const router = require('express').Router();
const controller  = require('../controllers/controller');

router.get('/',controller.user);

router.get('/sign-up',controller.signUp);
router.get('/sign-in',controller.signIn);

router.post('/create-user',controller.createUser);
router.post('/create-session',controller.createSession);

router.get('/post',controller.post);
router.get('/like',controller.like);


module.exports = router;
