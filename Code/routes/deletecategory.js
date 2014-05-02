// Login page: try to authenticate
var categories = require('../models/categories');
var posts = require('../models/posts');
var validator = require('validator');

module.exports = function(request,response) {
    
    var categoryname = validator.escape(request.body.deletecategoryname);
    var username = validator.escape(request.body.username);
    
    categories.delete(categoryname, function(success) {
        
        if (success) {
            posts.deleteCategory(categoryname, function() {
                
            });
            response.redirect("/home/manage/admin/category");
        }
        
        else {
            request.session.error = "category doesn't exist.";
            response.redirect("/home/manage/admin/category");
        }
        
    });
};