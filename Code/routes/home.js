// Home page
var categories = require('../models/categories');
var posts = require('../models/posts');
var moment = require('moment');

module.exports = function(request, response) {

	var username = request.session.username;
	var error = request.session.error;

	// Displays home page with list of all categories, as well as
	// a list of the most recent posts.  If no user is logged in,
	// they are redirected to login.
	if (username && !error) {

		var cats = null;
		var rePo = null;

		categories.retrieveAll(function(catArray) {
			var catLoopCount = catArray.length;

			if (catLoopCount === 0) {
				cats = [];
				finished();
			} else {
				catArray.forEach(function(category) {
					posts.countCategory(category.name, function(count) {
						category.count = count;
						catLoopCount--;
						console.log(catLoopCount);
						if (catLoopCount === 0) {
							cats = catArray;
							finished();
						}
					});
				});
			}
		});

		// function that returns the most recent posts added
		// to the database
		posts.retrieveRecent(function(recentPosts) {

			var rpLoopCount = recentPosts.length;

			if (rpLoopCount === 0) {
				rePo = [];
				finished();
			} else {
				recentPosts.forEach(function(post) {
					categories.retrieveID(post.category, function(catID) {
						post.category = catID;
						post.date = moment(post.date).fromNow()
						rpLoopCount--;
						if (rpLoopCount === 0) {
							rePo = recentPosts;
							finished();
						}
					});
				});
			}
		});

		// Once categories and recent posts are retrieved,
		// home page is rendered.

		function finished() {
			if (cats !== null && rePo !== null) {
				console.log("render");
				response.render('home', {
					username: username,
					categories: cats,
					recentPosts: rePo,
					error: request.session.error1
				});
				delete request.session.error1;
			}
			//else {
			//    response.render('home', {username:username,categories:cats});
			//}
		}


	} else {
		response.render('login', {
			error: request.session.error
		});
		delete request.session.error;
	}
};
