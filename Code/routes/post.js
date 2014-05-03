var posts = require('../models/posts');
var comments = require('../models/comments');

module.exports = function(request, response) {
	var url = request.url;
	var index = url.lastIndexOf("/");
	var postid = url.substring(index + 1);
	var index0 = url.lastIndexOf("home/");
	var categoryid = url.substring(index0 + 5, index);

	var username = request.session.username;

	if (username) {
		try {
			posts.retrieve(postid, function(post) {

				var dateObj = new Date();
				var month = dateObj.getUTCMonth();
				var day = dateObj.getUTCDate();
				var year = dateObj.getUTCFullYear();
				var date = month + "/" + day + "/" + year;
				post.date = date;


				comments.retrievePostid(postid, function(comments) {
					response.render('post', {
						username: username,
						categoryid: categoryid,
						postid: postid,
						post: post,
						comments: comments
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
