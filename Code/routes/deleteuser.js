// Delete user page
var users = require('../models/users');
var posts = require('../models/posts');
var comments = require('../models/comments');
var validator = require('validator');

module.exports = function(request,response) {
    
    var deletename = validator.escape(request.body.deletename);
    var username = validator.escape(request.body.username);
    
    // Deletes a user from the users database, redirects user to
    // user manager page.  Returns an error if user does not exist.
    posts.deleteUser(deletename, function(success){
        comments.deleteUser(deletename, function(){});
        users.delete(deletename, function(success) {
            if (success) {
                response.redirect("/home/manage/admin");
            }
            else {
                request.session.error = "User does not exist.";
                response.redirect("/home/manage/admin/user");
        }});
         
    });
};