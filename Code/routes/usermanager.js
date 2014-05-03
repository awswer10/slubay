// Index page: home page, or login
module.exports = function(request, response) {
    
   var username = request.session.username;
   
   if (username) {
         response.render('usermanager', {username:username});
         }
};