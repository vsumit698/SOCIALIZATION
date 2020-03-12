const posComRouter = require('express').Router();
const posCommController = require('../controllers/postCommController');
//      route is - /user/post.....

posComRouter.post('/',posCommController.createPost);
posComRouter.post('/comment',posCommController.createComment);
posComRouter.get('/delete-post/:postId',posCommController.deletePost);
posComRouter.get('/delete-comment/:commentId',posCommController.deleteComment);

module.exports = posComRouter;