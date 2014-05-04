var posts = require('../models/posts');
var comments = require('../models/comments');
var users = require('../models/users');

module.exports = function(request, response) {
	var url = request.url;
	var index = url.lastIndexOf("/");
	var postid = url.substring(index + 1);
	var index0 = url.lastIndexOf("home/");
	var categoryid = url.substring(index0 + 5, index);
   
	var username = request.session.username;
        var editDelete;

	if (username) {
                  try {
                          
                           
                           
                     
                        posts.increaseViews(postid,function(){});
			posts.retrieve(postid, function(post) {
                              users.admin(username, function(success) {
                                 
                                 var dateObj = new Date();
                                 var month = dateObj.getUTCMonth();
                                 var day = dateObj.getUTCDate();
                                 var year = dateObj.getUTCFullYear();
                                 var date = month + "/" + day + "/" + year;
                                 post.date = date;
                                 var editDelete;
                                 if (success) {
                                      editDelete=true;
                                   } else {
                                      posts.retrieve(postid,function(post) {
                                         if (username == post.user) {
                                            editDelete=true;
                                         } else {
                                            editDelete=false;
                                         }
                                      });
                                   }
 
 
                                 comments.retrievePostid(postid, function(comments) {
                                         
                                           response.render('post', {
                                                 username: username,
                                                 categoryid: categoryid,
                                                 postid: postid,
                                                 post: post,
                                                 comments: comments,
                                                 editDelete:editDelete
                                                
                                         });
                                 });
                              });   

			});
		} catch(e) {
			response.render('default');
		}
		
	} else {
		response.redirect("/");
		delete request.session.error;
	}
};
