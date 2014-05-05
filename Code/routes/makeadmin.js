// Make admin page
var users = require('../models/users');
var validator = require('validator');

module.exports = function(request,response) {
    
    var makeadminname = validator.escape(request.body.makeadminname);
    var username= request.session.username;
    
    //check to see if the login actor is admin
    users.admin(username, function(success){
        
        // If they are, check to see if entered username exists,
        // make that user admin if it does, return error if it does not.
        if (success) {
            users.makeAdmin(makeadminname, function(success1) {
               
                if (success1) {
                    response.redirect("/home/manage/admin/user");
                }
                
                else {
                    request.session.error = "User does not exist.";
                    response.redirect("/home/manage/admin/user");
                }
        });
        }
        
    });
};