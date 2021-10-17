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
