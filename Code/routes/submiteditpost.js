// Submit edited post page

var users = require('../models/users');
var categories = require('../models/categories');
var posts = require('../models/posts');
var validator = require('validator');

module.exports = function(request,response) {
    var title = validator.escape(request.body.title);
    var description = validator.escape(request.body.description);
    var category = validator.escape(request.body.category);
    var user = request.session.username;
    var url = request.url;
    var index= url.lastIndexOf("home/");
    var postid= url.substring(index+5+24+1,index+5+24+1+24);
    
    // After retrieving information from the form, post is updated
    // with the new information.  User is redirected to updated post.
    posts.editTitle(postid,title,function(success) {
        
    });
    
    posts.editCategory(postid,category,function(success) {
        
    });
    
    posts.editDescription(postid,description,function(success) {
        
    });
    
    categories.retrieveID(category, function(categoryid){
        response.redirect('/home/'+categoryid+'/'+postid);
    });
}