// Manage account page
module.exports = function(request, response) {
    
   var username = request.session.username;
   
   // Renders manage account page if user is logged in, returns to
   // login page otherwise.
   if (username) {
      response.render('manage', {username:username});
   }
   
   else {
      response.render('login', {error:request.session.error});
      delete request.session.error;
      response.redirect('/');
   }
};