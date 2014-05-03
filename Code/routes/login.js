// Login page: try to authenticate
var users = require('../models/users');
var validator = require('validator');

module.exports = function(request,response) {
    
    var name = validator.escape(request.body.name);
    var password = validator.escape(request.body.password);
    
    users.login(name, password, function(success) {
        
        if (success) {
            request.session.username = name;
            users.checkBan(name,function(ban){
                if(ban){
                    delete request.session.username;
                    request.session.error = name+" is currently banned.";
                    response.redirect('/home');
                }
                else{
                    response.redirect('/home')
                }
            });
            
        }
        
        else {
            request.session.error = "Wrong username or password.";
            response.redirect('/');
        }
        
    });
};