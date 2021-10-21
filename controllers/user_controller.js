// require Users collection
const User = require('../models/user_model'); 

//Profile
module.exports.profile= function(req, res){
    return res.render('user_profile', {
        "username": "xyz"   
    });
}
// Images
module.exports.images= function(req, res){
    return res.render('user_images', {
        "title": "user->images"
    });
}

// Sign Up
module.exports.signup= function(req, res){
    return res.render('user_signup', {
        "title": "user->signup page"
    });
}

// Sign In
module.exports.signin= function(req, res){
    return res.render('user_signin', {
        "title": "user->signin page"
    });
}


//   Sign Up handeler
module.exports.user_creation= function(req,res){
    //check password
    if(req.body.password == req.body.confirm_password){
        //check if same user exist
        User.findOne(
            {email:req.body.email},
            function(error, f_user){
                if(error){console.log("error in finding users");return;}
                //create user if it doesn't exit
                else if(!f_user){
                    User.create(req.body,
                        function(error){
                            if(error){console.log("error in creating users");return;}
                        }
                    )
                    return res.redirect('/users/signin');
                }
                //if user already exist
                else{
                    return res.redirect('back');
                }
            }
        );
    }
    //passwords don't match
    else{
        res.redirect('back');
    }
    // console.log('form submitted');
    // console.log(req.body);
    // return res.redirect('/users/signin');
}

//  Sign In handeller
module.exports.user_session= function(req,res){
   
    console.log('form submitted');
    console.log(req.body);
    return res.redirect('back');
}
