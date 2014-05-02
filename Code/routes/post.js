var posts = require('../models/posts');
var comments = require('../models/comments');

module.exports = function(request, response) {
   var url = request.url;
   var index = url.lastIndexOf("/");
   var postid = url.substring(index+1);
   var index0= url.lastIndexOf("home/");
   var categoryid = url.substring(index0+5, index);
   posts.retrieve(postid, function(post) {
       comments.retrievePostid(postid,function(comments){
         response.render('post', {categoryid:categoryid,postid:postid,post:post,comments:comments});
          });
      });
};