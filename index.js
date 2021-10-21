const express = require('express');
const app = express();
const port = 8000

// using express router 
app.use(express.urlencoded());
app.use('/', require('./routes/index'));    //middleware

// setting up views
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, 
    function(error){
        if(error){
            console.log(`error in running file ${error} `);
        }
        console.log(`server is running on port ${port}`);
    }  
);