// Unban user page
var users = require('../models/users');
var validator = require('validator');

module.exports = function(request,response) {
    
    var unbanname = validator.escape(request.body.unbanname);
    var username = validator.escape(request.body.username);
    
    // Attempts to unban user, redirects to user manager page if
    // successful.  Returns error otherwise.
    users.unban(unbanname, function(success) {
        
        if (success) {
            response.redirect("/home/manage/admin");
        }
        
        else {
            request.session.error = "User does not exist.";
            response.redirect("/home/manage/admin");
        }
        
    });
};