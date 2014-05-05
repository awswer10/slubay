// Category Manager page
var categories = require('../models/categories');

module.exports = function(request, response) {
    
   var username = request.session.username;
   
   // This page can only be reached through admin manager, don't have
   // to re-check if user is an admin.  Allows admins to create and
   // remove categories.
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