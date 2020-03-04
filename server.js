const express = require('express');
const app = express();
const port = 8000;
const router = require('./routes/home');
const expressLayouts = require("express-ejs-layouts");
const db = require('./config/mongoose');

app.set('view engine','ejs');
app.set('views','./views');
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.use(expressLayouts);
app.use(express.urlencoded());
app.use(express.static('./static'));

app.use('/',router);
 

app.listen(port,function(error){
    if(error) {
        console.log(`Error in running server ${error}`);
        return;
    }
    console.log(`Server is running on port ${port}`);
});