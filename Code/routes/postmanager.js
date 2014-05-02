var posts = require('../models/posts');

module.exports = function(request, response) {
    
   var username = request.session.username;
   
   if (username) {
      posts.retrieveUser(username, function(posts){
         response.render('postmanager', {username:username,posts:posts});
      });
      
   }
   
   else {
        response.render('login', {error:request.session.error});
        delete request.session.error;
        response.redirect('/');
   }
};