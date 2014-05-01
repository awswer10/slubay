var categories = require('../models/categories');
var posts = require('../models/posts');

module.exports = function(request, response) {
   var url = request.url;
   var index = url.lastIndexOf("home/");
   var categoryid = url.substring(index+5);
   categories.retrieveName(categoryid, function(categoryname){
      
      //get the number of post with that category name
      posts.countCategory(categoryname,function(countCategory){
         var count=countCategory;
      });
      posts.retrieveCategory(categoryname, function(posts) {
           response.render('category', {categoryid:categoryid, posts:posts,count:count});
      });
   });
};
