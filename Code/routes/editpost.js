var categories = require('../models/categories');
var posts = require('../models/posts');
var users = require('../models/users');

module.exports = function(request,response) {
    var url = request.url;
    var index= url.lastIndexOf("home/");
    var index0=url.lastIndexOf("/");
    var categoryid = url.substring(index+5,index+5+24);
    var postid= url.substring(index+5+24+1,index+5+24+1+24);
    var username = request.session.username;
    categories.retrieveAll(function(categories) {
        users.admin(username, function(success) {
            if (success) {
                posts.retrieve(postid,function(post){
                    response.render('editpost', {categoryid:categoryid,categories:categories,username:username,post:post});
                });
            } else {
                posts.retrieve(postid,function(post) {
                    if (username == post.user) {
                        response.render('editpost', {categoryid:categoryid,categories:categories,username:username,post:post});
                    } else {
                        response.redirect('/home/'+categoryid+'/'+postid);
                    }
                });
                
            }
        });
    });
}