const router = require('express').Router();
const controller  = require('../controllers/userController');

router.get('/',controller.user);

router.get('/sign-up',controller.signUp);
router.get('/sign-in',controller.signIn);

router.post('/create-user',controller.createUser);
router.post('/create-session',controller.createSession);



module.exports = router;
