const express = require('express');
const app = express();
const port = 8000;





app.listen(port,function(error){
    if(error) {
        console.log(`Error in running server ${error}`);
        return;
    }
    console.log(`Server is running on port ${port}`);
});