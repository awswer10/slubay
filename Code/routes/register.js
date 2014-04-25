// Registration page: try to register
var users = require('../models/users');
var validator = require('validator');

module.exports = function(request,response) {
   
    var name = validator.escape(request.body.name);
    var realname = validator.escape(request.body.realname);
    var email = validator.escape(request.body.email);
    var password = validator.escape(request.body.password);
    console.log(name);
    
    users.create(name, realname, password, email, function(success) {

        if (success) {
            request.session.username = name;
            request.session.realname = realname;
            request.session.password = password;
            request.session.email = email;
            response.redirect('/home');
        }
        
        else {
            request.session.error = 'Username '+name+' is not available.';
            response.redirect('/');
        }
        
    });
};