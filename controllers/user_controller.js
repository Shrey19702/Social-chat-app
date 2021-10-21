module.exports.profile= function(req, res){
    return res.render('user_profile', {
        "username": "xyz"   
    });
}

module.exports.images= function(req, res){
    return res.render('user_images', {
        "title": "user->images"
    });
}

module.exports.signup= function(req, res){
    return res.render('user_signup', {
        "title": "user->signup page"
    });
}

module.exports.signin= function(req, res){
    return res.render('user_signin', {
        "title": "user->signin page"
    });
}

module.exports.user_entry= function(req,res){
    console.log('form submitted');
    console.log(req.body);
    return res.redirect('back');
}