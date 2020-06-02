const nodemailerConfig = require('../config/nodemailer');

module.exports.createCommentAlert = (comment) => {
    // console.log(comment);
    var htmlData = nodemailerConfig.renderTemplate({comment : comment},'/newComment.ejs');
    
    nodemailerConfig.transporter.sendMail({
        from: 'vsumit698@gmail.com', // sender address
        to: `${comment.post.user.email}`, // list of receivers
        subject: `Hello ${comment.post.user.name} !`, // Subject line
        html: htmlData, // html body
        },function(err,info){
            if(err){
                console.log("error in sending mail ",err);
                return;
            }
            // console.log(info);
        });

};