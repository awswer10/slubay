// Login page: try to authenticate
var users = require('../models/users');
var validator = require('validator');

module.exports = function(request,response) {
    
    var banname = validator.escape(request.body.banname);
    var username = validator.escape(request.body.username);
    
    users.ban(banname, function(success) {
        
        if (success) {
            response.redirect("/home/manage/admin/user");
        }
        
        else {
            request.session.error = "User does not exist.";
            response.redirect("/home/manage/admin/user");
        }
        
    });
};