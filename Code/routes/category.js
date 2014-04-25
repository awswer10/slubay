var items = require('../models/categories’);

module.exports = function(request, response) {
    categories.retrieveAll(function(allItems) {
        response.render(‘allitems’, {posts:allItems});
    });
};
