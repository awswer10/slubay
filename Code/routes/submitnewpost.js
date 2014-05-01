var users = require('../models/users');
var categories = require('../models/categories');
var posts = require('../models/posts');
var validator = require('validator');

module.exports = function(request,response) {
    var title = validator.escape(request.body.title);
    var description = validator.escape(request.body.description);
    var url = request.url;
    var index= url.lastIndexOf("home/");
    var index0= url.lastIndexOf("/");
    var categoryid = url.substring(index+5,index0);
    var dateObj = new Date();
    var month = dateObj.getUTCMonth();
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    var date = month + "/" + day + "/" + year
    var user = request.session.username;
    var postid;
    
    categories.retrieve(categoryid, function(category) {
        var categoryname = category.name;
        posts.create(user,title,categoryname,description,date,0,function(post) {
            postid = post._id;
        });
        console.log(postid);
        posts.retrieve(postid, function(post) {
            response.render('post', {categoryid:categoryid,postid:postid,post:post});
        });
    });

}