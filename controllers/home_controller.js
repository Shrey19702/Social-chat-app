const User = require('../models/user_model');

module.exports.home= function(req, res){
    User.find({},
        function(error, users){
            if(error){console.log('error: unable to access user collection');return;}
            return res.render('home', {
                "title" : "HOME PAGE",
                all_users : users,
            });
        }
    );
}

module.exports.homeImages= function(req, res){
    return res.render('home_images', {
        "title": "Home Page Images"
    });
}

