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
		var hotPosts = null;
		
		// Retreives all of the categories from the database
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
						if (catLoopCount === 0) {
							cats = catArray;
							finished();
						}
					});
				});
			}
		});

		// Retreives the most recent posts from the database
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

		// Retreives the posts with the most views from the database
		posts.retrieveHotPosts(function(hotPo) {

			var hpLoopCount = hotPo.length;

			if (hpLoopCount === 0) {
				rePo = [];
				finished();
			} else {
				hotPo.forEach(function(post) {
					categories.retrieveID(post.category, function(catID) {
						post.category = catID;
						hpLoopCount--;
						if (hpLoopCount === 0) {
							hotPosts = hotPo;
							finished();
						}
					});
				});
			}
		});

		// Once all of the DB callbacks are returned, this will allow the page to render.
		function finished() {
			if (cats !== null && rePo !== null && hotPosts !== null) {
				response.render('home', {
					username: username,
					categories: cats,
					recentPosts: rePo,
					hotPosts: hotPosts,
					error: request.session.error1
				});
				delete request.session.error1;
			}
		}
	} else {
		response.render('login', {
			error: request.session.error
		});
		delete request.session.error;
	}
};
