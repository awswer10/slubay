// Admin Manager page:  Displays features only visible to admins
var users = require('../models/users');

module.exports = function(request, response) {
    
   var username = request.session.username;
   
   // Renders admin manager if admin, prints error otherwise
   users.admin(username, function(success) {
      if (success) {
         response.render('adminmanager', {username:username});
      }
      
      else {
        request.session.error1 = 'Admin privileges required.';
        response.redirect('/home');
        
   }
});
};