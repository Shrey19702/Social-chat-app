// require Users collection
const User = require('../models/user_model');   // user's data stored in mongo 

//Profile
module.exports.profile = function(req, res){
    // User.findById(req.cookies.)
    return res.render('user_profile', {
        "title" : "USERS Profile page",
        "username": "xyz"   
    });
}

// Images
module.exports.images= function(req, res){
    return res.render('user_images', {
        "title": "User images"
    });
}

// Sign Up
module.exports.signup= function(req, res){
    if(req.isAuthenticated()){  //check if already authenticated
        return res.redirect('/users/profile')
    }

    return res.render('user_signup', {
        "title": "User Signup page"
    });
}

// Sign In
module.exports.signin= function(req, res){
    if(req.isAuthenticated()){  //check if already authenticated
        return res.redirect('/users/profile')
    }

    return res.render('user_signin', {
        "title": "User Signin page"
    });
}


//   Sign Up handeler
module.exports.user_creation= function(req,res){
    //check password
    if(req.body.password === req.body.confirm_password){
        //check if same user exist
        User.findOne( 
            {email:req.body.email},
            function(error, f_user){
                if(error){console.log("error in finding users");return;}
                //create user if it doesn't exit
                else if(!f_user){
                    User.create(req.body,   //only the details given in the User schema will be added
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
}

//  Sign In handeller
module.exports.user_session= function(req,res){
   return res.redirect('/');
}

//Sign out
module.exports.user_end_session = function(req, res){
    req.logout();   // passport's integration(defined function)
    return res.redirect('/');
}
