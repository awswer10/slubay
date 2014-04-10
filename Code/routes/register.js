// Registration page: try to register
var users = require('../models/users');
var validator = require('validator');

module.exports = function(request,response) {
   
    var name = validator.escape(request.body.name);
    var password = validator.escape(request.body.password);
    
    users.create(name, password, function(success) {
        
        if (success) {
            request.session.username = name;
        }
        
        else {
            request.session.error = 'Username '+name+' is not available.';
        }
        
        response.redirect('/');
    });
};