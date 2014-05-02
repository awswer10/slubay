// Login page: try to authenticate
var categories = require('../models/categories');
var posts = require('../models/posts');
var comments = require('../models/comments');
var validator = require('validator');

module.exports = function(request,response) {
    
   var url = request.url;
   var index0= url.lastIndexOf("home/");
   var categoryid = url.substring(index0+5, index0+5+24);
   var index1 = url.lastIndexOf("/");
   var postid = url.substring(index0+5+24+1,index1);
   
    posts.delete(postid, function(success) {
        
        if (success) {
            comments.deletePostid(postid, function() {
            });
            response.redirect("/home/"+categoryid);
        }
        
        else {
            //request.session.error = "category doesn't exist.";
            response.redirect("/home/manage/admin/category");
        }
        
    });
};