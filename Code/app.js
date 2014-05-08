var express = require('express');
var app = express();

// Configure the server
app.set('view engine', 'ejs');
app.set('views', __dirname+'/views');
app.use(express.urlencoded({limit:'1kb'}));
app.use(express.static(__dirname+'/statics'));

// Enable sessions
app.use(express.cookieParser());
app.use(express.session({secret:'CS 340 3/6/2014'}));

app.get('/', require('./routes/home'));
app.post('/login', require('./routes/login'));
app.post('/register', require('./routes/register'));
app.get('/home', require('./routes/home'));
app.post('/home/manage/admin/user/unmakeadmin', require('./routes/unmakeadmin'));
app.post('/home/manage/admin/user/makeadmin', require('./routes/makeadmin'));
app.post('/home/manage/admin/user/delete', require('./routes/deleteuser'));
app.post('/home/manage/admin/user/ban', require('./routes/ban'));
app.post('/home/manage/admin/user/unban', require('./routes/unban'));
app.post('/home/manage/admin/category/create', require('./routes/createcategory'));
app.post('/home/manage/admin/category/delete', require('./routes/deletecategory'));
app.get('/home/manage/admin', require('./routes/adminmanager'));
app.get('/home/manage/posts', require('./routes/postmanager'));
app.get('/logout', require('./routes/logout'));
app.post('/home/newpost', require('./routes/submitnewpost'));
app.get('/home/new', require('./routes/newpost'));
app.post('/home/:id/:id/newcomment', require('./routes/newcomment'));
app.get('/home/:id/:id/delete', require('./routes/deletepost'));
app.post('/home/:id/:id/editpost', require('./routes/submiteditpost'));
app.get('/home/:id/:id/edit', require('./routes/editpost'));
app.get('/home/:id/:id', require('./routes/post'));
app.get('/home/:id', require('./routes/category'));
app.get('*', require('./routes/default'));

app.listen(8081);
console.log('Server is up.');
