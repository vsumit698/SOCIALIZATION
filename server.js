const express = require('express');
const app = express();
const port = 8000;
const router = require('./routes/home');
const expressLayouts = require("express-ejs-layouts");
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const passport = require('./config/passport-localStrategy');
const mongoStore = require('connect-mongo')(expressSession);


app.set('view engine','ejs');
app.set('views','./views');
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.use(expressLayouts);
app.use(express.urlencoded());
app.use(express.static('./static'));
app.use(cookieParser());

app.use(expressSession({
    name:"Socialization",
    // change the secret name at the production level code...
    secret:"findIt",
    saveUninitialized:false,
    resave:false,
    cookie:{maxAge:60*60*1000},
    store: new mongoStore({
        mongooseConnection:db,
        autoRemove:'disabled'
    },function(err){
        console.log(err || ("successfuly connected to MongoStore"));
    })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticator);


app.use('/',router);
 

app.listen(port,function(error){
    if(error) {
        console.log(`Error in running server ${error}`);
        return;
    }
    console.log(`Server is running on port ${port}`);
});