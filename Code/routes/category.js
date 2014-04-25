var categories = require('../models/categories');

module.exports = function(request, response) {
    categories.retrieveAll(function(allItems) {
        response.render('category', {posts:allItems});
    });
};
