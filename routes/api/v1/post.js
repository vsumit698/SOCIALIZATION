const router = require('express').Router();
const apiController = require('../../../controllers/apiControllers/v1/post_api');

const passport = require('../../../config/passport-JWT');

// path is /api/v1/post...
router.get('/',apiController.displayPost);

router.delete('/:postId',passport.authenticate('jwt',{session:false}),apiController.deletePost);

module.exports = router;