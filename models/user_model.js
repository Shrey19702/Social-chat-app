const mongoose = require('mongoose');   //mongoose to interact with mongoDB

const userSchema = new mongoose.Schema( //making new schema for users details
    {
        email:{
            type:String,
            require: true,
            unique: true
        },
        password:{
            type:String,
            require: true,
        },
        name:{
            type:String,
            require: true,
        }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model('User', userSchema);    //making model for interacting

module.exports = User;