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
//app.get('/home/textbooks', require('./routes/home'));
app.get('/home/manage/admin', require('./routes/adminmanager'));
app.get('/home/manage/admin/user', require('./routes/usermanager'));
app.get('/home/manage/admin/category', require('./routes/categorymanager'));
app.get('/home/manage', require('./routes/manage'));
app.get('/home/manage/messages', require('./routes/messagemanager'));
app.get('/home/manage/posts', require('./routes/postmanager'));
app.get('/logout', require('./routes/logout'));
app.get('*', require('./routes/default'));

app.listen(8080);
console.log('Server is up.');
