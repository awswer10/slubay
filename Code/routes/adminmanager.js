// Index page: home page, or login
var users = require('../models/users');

module.exports = function(request, response) {
    
   var username = request.session.username;
   
   users.admin(username, function(success) {
      if (success) {
         response.render('adminmanager', {username:username});
      }
      
      else {
        request.session.error = 'Admin privileges required.';
        response.redirect('/home');
        delete request.session.error;
        
   }
});
};