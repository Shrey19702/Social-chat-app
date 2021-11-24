// require Users collection
const User = require('../models/user_model');   // user's data stored in mongo 

//Profile
module.exports.profile = function(req, res){
    // User.findById(req.cookies.)
    User.findById(req.params.id, 
        function(error, f_user){
            if(error){console.log('error: unable to access the requested document from User model'); return;}
            return res.render('user_profile', {
                "title" : "USERS Profile page",
                user_profile : f_user,
            });
        }    
    );
}

//Update user data
module.exports.user_update= async function(req,res){
    try{
        if(req.params.id == req.user.id){
            let user = await User.findByIdAndUpdate(req.params.id, req.body);
            req.flash('success', 'user details updated')
            return res.redirect('back');
        }
        else{
            return res.status(401).send('Unauthorized');
        }
    }
    catch(error){
        req.flash('error', error);
        return res.redirect('back');
    }
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
        req.flash('error', 'user already logged in')
        return res.redirect('/users/profile/'+req.user.id);
    }

    return res.render('user_signup', {
        "title": "User Signup page"
    });
}

// Sign In
module.exports.signin= function(req, res){
    if(req.isAuthenticated()){  //check if already authenticated
        req.flash('error', 'user already logged in')
        return res.redirect('/users/profile/'+req.user.id);
    }

    return res.render('user_signin', {
        "title": "User Signin page"
    });
}

//   Sign Up handeler
module.exports.user_creation= async function(req,res){
    try{
        //check password
        if(req.body.password === req.body.confirm_password){
            //check if same user exist
            let f_user = await User.findOne( {email:req.body.email} );

            //create user if it doesn't exit
            if(!f_user){
                await User.create(req.body)  //only the details given in the User schema will be added
                req.flash('success','new account created');
                return res.redirect('/users/signin');
            }
            //if user already exist
            else{
                req.flash('error', 'given email already has a account');
                return res.redirect('back');
            }
        }
        //passwords don't match
        else{
            req.flash('error', "given passwords don't match");
            res.redirect('back');
        }
    }
    catch(error){
        req.flash('error', error);
        return res.redirect('back');
    }
}

//  Sign In handeller
module.exports.user_session= function(req,res){
    req.flash('success', 'you have logged in');
   return res.redirect('/');
}

//Sign out
module.exports.user_end_session = function(req, res){
    req.logout();   // passport's integration(defined function)

    req.flash('success', 'you have logged out');
    return res.redirect('/');
}
