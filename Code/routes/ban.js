// Login page: try to authenticate
var users = require('../models/users');
var validator = require('validator');

module.exports = function(request,response) {
    
    var name = validator.escape(request.body.name);
    console.log(name);
    
    users.ban(name, function(success) {
        console.log(success);
        if (success) {
        }
        
        else {
            request.session.error = "User does not exist.";
        }
        
    });
};