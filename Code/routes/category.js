var categories = require('../models/categories');
var posts = require('../models/posts');

module.exports = function(request, response) {
   var url = request.url;
   var index = url.lastIndexOf("home/");
   var categoryid = url.substring(index+5);
   console.log(categoryid);
   categories.retrieveName(categoryid, function(categoryname){
      console.log(categoryname); 
      posts.retrieveCategory(categoryname, function(posts) {
           console.log(posts);
           response.render('category', {categoryid:categoryid, posts:posts});
      });
   });
};
