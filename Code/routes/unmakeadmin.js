// Login page: try to authenticate
var users = require('../models/users');
var validator = require('validator');

module.exports = function(request,response) {
    
    var unmakeadminname = validator.escape(request.body.unmakeadminname);
    var username= request.session.username;
    
    //check to see if the login actor is admin
    users.admin(username, function(success){
      
        if (success) {
            users.unmakeAdmin(unmakeadminname, function(success1) {
               
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