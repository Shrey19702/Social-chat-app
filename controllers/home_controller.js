module.exports.home= function(req, res){
    return res.end("<h1> home is running  index.js -> routes/index.js -> controllers/home_controller <h1>");
}

module.exports.homeImages= function(req, res){
    return res.end("<h1> home page images <h1>");
}

