const express = require('express');
const cookieParser = require('cookie-parser'); 
const db= require('./config/mongoose');
const app = express();  // launching the server
const port = 8000

const session = require('express-session');
const passport = require('passport');
const localPassport = require('./config/passport-local-strategy');
//storing cookies in mongo for if server restarts
const MongoStore = require('connect-mongo');

// using express router 
app.use(express.urlencoded()); // to take data from forms in req.body 
app.use(cookieParser());

// setting up views
app.set('view engine', 'ejs');
app.set('views', './views');

//authentication
app.use(
    session(    // storing setup for sessions to be made
        {
            name: 'chatapp',
            secret: 'testcode123', //used for encription (random text from yourside)
            saveUninitialized: false,
            resave: false,
            cookie:{ //max time the cookie shall be stored
                maxAge: (1000*60*100)
            },
            // mongo store is used to store the session cookie in the db
            //storing cookies in mongo for if server restarts using mongostore
            store: MongoStore.create(
                {
                    mongoUrl: 'mongodb://localhost/chat_app',  // new method from version 4 of connect-mongo
                    autoRemove: 'disabled'
                },
                function(error){
                    console.log('error in storing cookies in db',error);
                }
            )
        }
    )
);

//using passport.js
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser); //setAuthenticated is made in local config passport file

//transfering request to routes
app.use('/', require('./routes/index')); // request transfered to index.js in routes folder    

// port to listen the server on..
app.listen(port, 
    function(error){
        if(error){
            console.log(`error in running file ${error} `);
        }
        console.log(`server is running on port ${port}`);
    }  
);