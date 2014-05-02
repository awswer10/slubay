var categories = require('../models/categories');

// Index page: home page, or login
module.exports = function(request, response) {
    
   var username = request.session.username;
   
   if (username) {
      categories.retrieveAll(function(categories) {
         response.render('categorymanager', {username:username,categories:categories});
      });
       
   }
   
   else {
        
        response.render('login', {error:request.session.error});
        delete request.session.error;
        response.redirect('/');
   }
};