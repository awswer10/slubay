// Index page: home page, or login
var users = require('../models/users');

module.exports = function(request, response) {
    
   var username = request.session.username;
   
   users.admin(username, function(success) {
      if (success) {
         response.render('adminmanager', {username:username});
      }
      
      else {
        response.render('home', {username:username});
        request.session.error = 'Admin privileges required.';
        delete request.session.error;
        response.redirect('/home');
   }
});
};