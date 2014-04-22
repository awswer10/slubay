// Index page: home page, or login
module.exports = function(request, response) {
    
   var username = request.session.username;
   
   if (username) {
        response.render('manage', {username:username});
   }
   
   else {
        response.render('login', {error:request.session.error});
        delete request.session.error;
        response.redirect('/');
   }
};