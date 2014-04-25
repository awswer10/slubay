// Index page: home page, or login
var categories = require('../models/categories');
var posts = require('../models/posts');

module.exports = function(request, response) {
    
   var username = request.session.username;
   
   if (username) {
      categories.retrieveAll(function(allItems) {
        response.render('home', {username:username,categories:allItems});
      });
        
   }
   
   else {
        response.render('login', {error:request.session.error});
        delete request.session.error;
   }
};