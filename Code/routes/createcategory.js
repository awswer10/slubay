// Login page: try to authenticate
var categories = require('../models/categories');
var validator = require('validator');

module.exports = function(request,response) {
    
    var categoryname = validator.escape(request.body.createcategoryname);
    var username = validator.escape(request.body.username);
    
    categories.create(categoryname, function(success) {
        
        if (success) {
            response.redirect("/home/manage/admin/category");
        }
        
        else {
            request.session.error = "category already exists.";
            response.redirect("/home/manage/admin/category");
        }
        
    });
};