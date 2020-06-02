const nodemailer = require('nodemailer');
const nodeEnv = require('config');
module.exports.transporter = nodemailer.createTransport({
    host : 'smtp.gmail.com',
    service : 'gmail',
    port : '587',
    secure : false,
    auth : {
        user : nodeEnv.account.user,
        pass : nodeEnv.account.password
    }
});
//function for rendering general html pages using ejs file and returns html template which used to send (HTML MESSAGES)
module.exports.renderTemplate = (data,releativePath) => {
    let mailHTML;
    require('ejs').renderFile(
        require('path').join(__dirname,'../views/mailerTemplates',releativePath),
        data,
        function(err,template){
            if (err){console.log('error in rendering template'); return}
         
            mailHTML = template;
        }
    );
    return mailHTML;
}
