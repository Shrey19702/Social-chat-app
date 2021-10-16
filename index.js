const express = require('express');
const app = express();
const port = 8000

// using express router 
app.use('/', require('./routes/index'));    //middleware

app.listen(port, 
    function(error){
        if(error){
            console.log(`error in running file ${error} `);
        }
        console.log(`server is running on port ${port}`);
    }  
);