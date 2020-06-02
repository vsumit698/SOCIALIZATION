const queue = require('../config/kue');
const commentMailer = require('../mailerFunctions/newComment');

queue.process('commentAlert',function(job,done){
    console.log('processing job ');

    commentMailer.createCommentAlert(job.data);
    done();
});