// Index page: home page, or login
var users = require('../models/users');

module.exports = function(request, response) {
    
   var username = request.session.username;
   
   users.admin(username, function(success) {
      console.log(success);
      if (success) {
         response.render('adminmanager', {username:username});
      }
      
      else {
        response.render('home', {username:username});
        delete request.session.error;
        //response.redirect('/');
   }
});
};