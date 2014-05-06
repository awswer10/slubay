// Create new category page
var categories = require('../models/categories');
var validator = require('validator');

module.exports = function(request,response) {
    
    var categoryname = validator.escape(request.body.createcategoryname);
    var username = validator.escape(request.body.username);
    
    // Creates new category in the categories database and redirects
    // user to category manager page.
    categories.create(categoryname, function(success) {
        
        if (success) {
            response.redirect("/home/manage/admin");
        }
        
        else {
            request.session.error = "category already exists.";
            response.redirect("/home/manage/admin/category");
        }
        
    });
};