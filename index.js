const express = require('express');
const app = express();
const port = 8000

app.listen(port, 
    function(error){
        if(error){
            console.log(`error in running file ${error} `);
        }
        console.log(`server is running on port ${port}`);
    }  
);