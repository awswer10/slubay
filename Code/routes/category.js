var categories = require('../models/categories');
var posts = require('../models/posts');

module.exports = function(request, response) {
	var url = request.url;
	var index = url.lastIndexOf("home/");
	var categoryid = url.substring(index + 5);


	var username = request.session.username;

	if (username) {
		categories.retrieveName(categoryid, function(categoryname) {

			posts.retrieveCategory(categoryname, function(posts) {
				response.render('category', {
					username:username,
					categoryid: categoryid,
					posts: posts,
					categoryname: categoryname
				});
			});
		});
	} else {
		response.redirect("/");
		delete request.session.error;
	}
};
