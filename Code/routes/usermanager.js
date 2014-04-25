// Index page: home page, or login
module.exports = function(request, response) {
    
   var username = request.session.username;
   var error = request.session.error;
   
   if (username) {
      if (error === undefined) {
         response.render('usermanager', {username:username,error:undefined});
      }
      else {
         console.log(error);
         response.render('usermanager', {username:username,error:request.session.error});
         delete request.session.error;
      }
   }
   
   else {
        response.render('login', {error:request.session.error});
        delete request.session.error;
        response.redirect('/');
   }
};