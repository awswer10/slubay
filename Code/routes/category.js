// Category page
var categories = require('../models/categories');
var posts = require('../models/posts');

module.exports = function(request, response) {
	var url = request.url;
	var index = url.lastIndexOf("home/");
	var categoryid = url.substring(index + 5);


	var username = request.session.username;

        // If a user is logged in, all posts within category are
        // retrieved and displayed, if no user is logged in, redirects
        // to login
	if (username) {
		try {
			categories.retrieveName(categoryid, function(categoryname) {
				posts.retrieveCategory(categoryname, function(posts) {
					response.render('category', {
						username: username,
						categoryid: categoryid,
						posts: posts,
						categoryname: categoryname
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
