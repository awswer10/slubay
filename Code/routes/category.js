var items = require('../models/categoriesí);

module.exports = function(request, response) {
    categories.retrieveAll(function(allItems) {
        response.render(Ďallitemsí, {posts:allItems});
    });
};
