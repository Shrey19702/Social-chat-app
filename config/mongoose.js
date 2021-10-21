// require the library
const mongoose= require('mongoose');

//connect to database
mongoose.connect('mongodb://localhost/chat_app');

//aquire connection to check for sucessfull connection
const db=mongoose.connection;

//error check
db.on('error', console.error.bind(console, "connection error  "));

//for if server is runnng 
db.once('open', function(){
    console.log("sucessfully connected to database");
});
