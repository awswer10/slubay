// New comment page

var comments = require('../models/comments');
var categories = require('../models/categories');
var posts = require('../models/posts');
var validator = require('validator');

module.exports = function(request,response) {
    var comment = validator.escape(request.body.comment);
    var dateObj = new Date();
    var month = dateObj.getUTCMonth();
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    var date = month + "/" + day + "/" + year
    var user = request.session.username;
    var url = request.url;
    var index0= url.lastIndexOf("home/");
    var categoryid = url.substring(index0+5, index0+5+24);
    var index1 = url.lastIndexOf("/");
    var postid = url.substring(index0+5+24+1,index1);
    
    // Adds user's comment to the database, redirects to post with
    // new comment added.
    comments.create(postid,comment,user,date,function(comment) {
        response.redirect('/home/'+categoryid+'/'+postid);
    });
    
}