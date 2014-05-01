module.exports = function(request,response) {
    var url = request.url;
    var index= url.lastIndexOf("home/");
    var index0=url.lastIndexOf("/");
    var categoryid = url.substring(index+5,index0);
    response.render('newpost', {categoryid:categoryid})
}