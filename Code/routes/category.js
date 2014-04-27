var categories = require('../models/categories');
var posts = require('../models/posts');

module.exports = function(request, response) {
   var url = request.url;
   var index = url.lastIndexOf("home/");
   var categoryid = url.substring(index+1);
   posts.retrieveCategory(categoryid, function(posts) {
<<<<<<< HEAD
        console.log(posts);
=======
>>>>>>> 08971220431b2a0afe2b195448ceebb26536bf00
        response.render('category', {posts:posts});
    });
};
