// Admin Manager page:  Displays features only visible to admins
var users = require('../models/users');
var categories = require('../models/categories');

module.exports = function(request, response) {
    
   var username = request.session.username;
   var error = request.session.error;
   
   // Renders admin manager if admin, prints error otherwise
   users.admin(username, function(success) {
      if (success) {
	      categories.retrieveAll(function(categories) {
	         response.render('adminmanager', {username:username,categories:categories,error:request.session.error});
	      });
      }
      
      else {
        request.session.error1 = 'Admin privileges required.';
        response.redirect('/home');
        
   }
});
};