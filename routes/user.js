const router = require('express').Router();
const userController  = require('../controllers/userController');
const passport = require('../config/passport-localStrategy');
// root is user now 
//      route is - /user/.....

router.use('/post',require('./postCom'));


router.get('/', passport.checkAuthentication);// displaying user profile page

router.get('/sign-up',userController.signUp); // displaying sign Up page
router.get('/sign-in',passport.checkAuthentication); //displaying sign In page
router.get('/sign-out',userController.deleteSession);

router.post('/create-user',userController.createUser);// used while sign up the user

router.post('/create-session',passport.authenticate('local',{failureRedirect:'/user/sign-in'}),userController.createSession);// used while sign in the user

router.get('/friend-profile/:friendId',userController.friendProfile);// displaying user friend profile page

router.post('/update-profile',userController.updateProfile);
module.exports = router;
