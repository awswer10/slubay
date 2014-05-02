// Login page: try to authenticate
var categories = require('../models/categories');
var posts = require('../models/posts');
var validator = require('validator');

module.exports = function(request,response) {
    
   var url = request.url;
   var index0= url.lastIndexOf("home/");
   var categoryid = url.substring(index0+5, index0+5+24);
   var index1 = url.lastIndexOf("/");
   var postid = url.substring(index0+5+24+1,index1);
   
    console.log(categoryid);
    console.log(postid);
    posts.delete(postid, function(success) {
        
        if (success) {
            response.redirect("/home/"+categoryid);
        }
        
        else {
            //request.session.error = "category doesn't exist.";
            response.redirect("/home/manage/admin/category");
        }
        
    });
};