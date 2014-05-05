// User manager page
module.exports = function(request, response) {
    
   var username = request.session.username;
   
   // If user is logged in, user manager page is rendered,
   // otherwise redirected to login page.
   if (username) {
         response.render('usermanager', {username:username,error:request.session.error});
         delete request.session.error;
         } else {
            response.redirect('/login');
         }
};