// Post manager page
var posts = require('../models/posts');
var moment = require('moment');

module.exports = function(request, response) {

	var username = request.session.username;

	// Retrieves all post from individual user, and displays.
	// If no user is logged in, login is rendered.
	if (username) {
		posts.retrieveUser(username, function(posts) {
				posts.forEach(function(post) {
						post.date = moment(post.date).fromNow();
					});
					response.render('postmanager', {
						username: username,
						posts: posts
					});
				});

		} else {
			response.render('login', {
				error: request.session.error
			});
			delete request.session.error;
			response.redirect('/');
		}
	};