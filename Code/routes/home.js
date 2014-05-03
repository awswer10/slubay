// Index page: home page, or login
var categories = require('../models/categories');
var posts = require('../models/posts');

module.exports = function(request, response) {

	var username = request.session.username;
	var error = request.session.error;

	if (username && !error) {
		categories.retrieveAll(function(categories) {
			response.render('home', {
				username: username,
				categories: categories
			});
		});

	} else {
		response.render('login', {
			error: request.session.error
		});
		delete request.session.error;
	}
};
