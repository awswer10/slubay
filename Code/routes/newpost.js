// New Post page
var categories = require('../models/categories');

module.exports = function(request,response) {
    var url = request.url;
    var index= url.lastIndexOf("home/");
    var index0=url.lastIndexOf("/");
    var categoryid = url.substring(index+5,index0);
    var username = request.session.username;
    
    // Renders the new post page after retrieving all categories.
    categories.retrieveAll(function(categories) {
        response.render('newpost', {categoryid:categoryid,categories:categories,username:username,error:request.session.error});
        delete request.session.error;
     });
    
}