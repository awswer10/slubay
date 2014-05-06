// Delete category page
var categories = require('../models/categories');
var posts = require('../models/posts');
var validator = require('validator');

module.exports = function(request,response) {
    
    var categoryname = validator.escape(request.body.deletecategoryname);
    var username = validator.escape(request.body.username);
    
    // Deletes a category from the categories database and returns user
    // to the category manager page.
    categories.delete(categoryname, function(success) {
        
        if (success) {
            posts.deleteCategory(categoryname, function() {
                
            });
            response.redirect("/home/manage/admin");
        }
        
        else {
            request.session.error = "category doesn't exist.";
            response.redirect("/home/manage/admin/category");
        }
        
    });
};