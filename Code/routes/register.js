// Registration page: try to register
var users = require('../models/users');
var validator = require('validator');

module.exports = function(request,response) {
   
    var name = validator.escape(request.body.name);
    var realname = validator.escape(request.body.realname);
    var email = validator.escape(request.body.email);
    var password = validator.escape(request.body.password);
	
        // Checks to make sure all fields are entered.
	if (name === "" || realname  === ""  ||  email  === "" || password  === "") {
        request.session.error = 'Must complete the form.';
        response.redirect('/');
	}
	
    // If they are, new user is created and redirected to home page.
    // returns error if username is unavailable.
    else {
	    //check to see if there is any user already in the database
	    users.count(function(count){
		
		users.create(name, realname, password, email, function(success) {
    
		    if (success) {
			request.session.username = name;
			request.session.realname = realname;
			request.session.password = password;
			request.session.email = email;
			
			//if there is no users in the database before create,
			//then the 1st user created is admin
			if (count===0) {
			    users.makeAdmin(name, function(){});
			}
			response.redirect('/home');
		    }
	    
		    else {
			request.session.error = 'Username '+name+' is not available.';
			response.redirect('/');
		    }
	    
		});
		

	    });
	}
};