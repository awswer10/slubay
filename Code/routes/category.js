var categories = require('../models/categories');
var posts = require('../models/posts');

module.exports = function(request, response) {
   var url = request.url;
   var index = url.lastIndexOf("home/");
   var categoryid = url.substring(index+1);
   posts.retrieveCategory(categoryid, function(posts) {
        console.log(posts);
        response.render('category', {posts:posts});
    });
};
