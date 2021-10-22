const express = require('express');
const cookieParser = require('cookie-parser'); 
const db= require('./config/mongoose');
const app = express();
const port = 8000

const session = require('express-session');
const passport = require('passport');
const localPassport = require('./config/passport-local-strategy');
//storing cookies in mongo for if server restarts
const MongoStore = require('connect-mongo');

// using express router 
app.use(express.urlencoded());
app.use(cookieParser());

//authentication
app.use(
    session(
        {
            name: 'chatapp',
            secret: 'testcode123',
            saveUninitialized: false,
            resave: false,
            cookie:{
                maxAge: (1000*60*100)
            },
            //storing cookies in mongo for if server restarts
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
app.use(passport.initialize());
app.use(passport.session());


// setting up views
app.set('view engine', 'ejs');
app.set('views', './views');

//transfering request to routes
app.use('/', require('./routes/index'));    


app.listen(port, 
    function(error){
        if(error){
            console.log(`error in running file ${error} `);
        }
        console.log(`server is running on port ${port}`);
    }  
);