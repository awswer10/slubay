var users = require('../models/users');
var categories = require('../models/categories');
var posts = require('../models/posts');
var validator = require('validator');

module.exports = function(request,response) {
    var title = validator.escape(request.body.title);
    var description = validator.escape(request.body.description);
    var category = validator.escape(request.body.category);
    var user = request.session.username;
    
    posts.create(user,title,category,description,0,function(post) {
        var postid = post._id;
        
        categories.retrieveID(category, function(categoryid){
            response.redirect('/home/'+categoryid+'/'+postid);
        });
    });
    
    
    
}