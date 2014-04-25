var items = require('../models/posts’);

module.exports = function(request, response) {
   var url = request.url;
   var index = url.lastIndexOf("/");
   var itemid = url.substring(index+1);
   posts.retrieve(postid, function(post) {
       response.render('post', {post:post});
      });
};
   