const router = require('express').Router();
const controller  = require('../controllers/userController');
const passport = require('../config/passport-localStrategy');
// root is user now 
router.get('/', passport.checkAuthentication);// displaying user page

router.get('/sign-up',controller.signUp); // displaying sign Up page
router.get('/sign-in',passport.checkAuthentication); //displaying sign In page

router.post('/create-user',controller.createUser);// used while sign up the user

router.post('/create-session',passport.authenticate('local',{failureRedirect:'/user/sign-in'}),controller.createSession);// used while sign in the user



module.exports = router;
