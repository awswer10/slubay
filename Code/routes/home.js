// Index page: home page, or login
var categories = require('../models/categories');
var posts = require('../models/posts');

module.exports = function(request, response) {

	var username = request.session.username;
	var error = request.session.error;

	if (username && !error) {

		var cats = null;
		var rePo = null;

		categories.retrieveAll(function(catArray) {
			var catLoopCount = catArray.length;
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
			
			
		});

		posts.retrieveRecent(function(recentPosts) {
			
			var rpLoopCount = recentPosts.length;
			recentPosts.forEach(function(post) {
				categories.retrieveID(post.category, function(catID) {
					post.category = catID;
					rpLoopCount--;
					if (rpLoopCount === 0) {
						rePo = recentPosts;
						finished();
					}
				});
			});
			
			
		});


		function finished() {
			if (cats !== null && rePo !== null) {
				console.log("render");
				response.render('home', {
					username: username,
					categories: cats,
					recentPosts: rePo
				});
			}
		}


	} else {
		response.render('login', {
			error: request.session.error
		});
		delete request.session.error;
	}
};
