const User = require('../models/user_model');
module.exports.home= function(req, res){
    User.find({},
        function(error, users)
    );
    return res.render('home', {
        "title" : "HOME PAGE"
    });
}

module.exports.homeImages= function(req, res){
    return res.render('home_images', {
        "title": "Home Page Images"
    });
}

