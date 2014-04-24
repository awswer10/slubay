// Index page: home page, or login
module.exports = function(request, response) {
    
   var username = request.session.username;
   var admin = request.session.admin;
   
   if (admin) {
        response.render('adminmanager', {username:username});
   }
   
   else {
        response.render('login', {error:request.session.error});
        delete request.session.error;
        response.redirect('/');
   }
};