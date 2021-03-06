// Post page

var posts = require('../models/posts');
var comments = require('../models/comments');
var users = require('../models/users');
var moment = require('moment');

module.exports = function(request, response) {
	var url = request.url;
	var index = url.lastIndexOf("/");
	var postid = url.substring(index + 1);
	var index0 = url.lastIndexOf("home/");
	var categoryid = url.substring(index0 + 5, index);

	var username = request.session.username;
	var editDelete;

	// If user is logged in, renders individual post with
	// updated information (view count), otherwise redirects
	// to login page.
	if (username) {
		try {
			// Increases view count and retrieves post
			posts.increaseViews(postid, function() {});
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
						editDelete = true;
					} else {
						posts.retrieve(postid, function(post) {
							if (username == post.user) {
								editDelete = true;
							} else {
								editDelete = false;
							}
						});
					}
					
					// Retrieve Comments
					comments.retrievePostid(postid, function(comments) {
						
						comments.forEach(function(comment) {
								comment.date = moment(comment.date).fromNow();
							});
						
						// Retrieve Email for user
						users.retrieveEmail(post.user, function(email) {
							response.render('post', {
								username: username,
								categoryid: categoryid,
								postid: postid,
								post: post,
								comments: comments,
								editDelete: editDelete,
								email: email

							});
						});
					});
				});

			});
		} catch (e) {
			response.render('default');
		}

	} else {
		response.redirect("/");
		delete request.session.error;
	}
};
