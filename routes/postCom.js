const posComRouter = require('express').Router();
const posCommController = require('../controllers/postCommController');
//      route is - /user/post.....

posComRouter.post('/',posCommController.createPost);
posComRouter.post('/comment',posCommController.createComment);

module.exports = posComRouter;