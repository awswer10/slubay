// Login page: try to authenticate
var users = require('../models/users');
var posts = require('../models/posts');
var comments = require('../models/comments');
var validator = require('validator');

module.exports = function(request,response) {
    
    var deletename = validator.escape(request.body.deletename);
    var username = validator.escape(request.body.username);
    
    posts.deleteUser(deletename, function(success){
        if (success) {
            comments.deleteUser(deletename, function(){});
            users.delete(deletename, function() {});
            response.redirect("/home/manage/admin/user");
        } else {
            request.session.error = "User does not exist.";
            response.redirect("/home/manage/admin/user");
        }
    });
};