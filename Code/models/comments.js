// A model for a visitor collection
var mongojs = require('mongojs');
var bcrypt = require('bcrypt');

// Access the database
var db = mongojs('slubay', ['comments']);

// Create a new comment
module.exports.create = function(postid,textfield,user,date,callback) {
        
    db.comments.insert({postid:mongojs.ObjectId(postid),textfield:textfield,user:user,date:new Date()}, function(error, comment) {
            if (error) throw error;
            
            callback(comment);
        });
};

// retrieve all comments
module.exports.retrieveAll = function(callback) {
    db.comments.find({}, function(error) {
        if (error) throw error;
        callback();
    });
};

// Retrieve one comment by id
module.exports.retrieve = function(itemid, callback) {
    
    db.comments.findOne({_id:mongojs.ObjectId(itemid)}, function(error,comment) {
        if (error) throw error;
       
        if (!comment) {
            callback(false);
        }
        else{
            callback(comment);
        }
    });
};

// Retrieve comments by user
module.exports.retrieveUser = function(user, callback) {
    
    db.comments.find({user:user}, function(error,comments) {
        if (error) throw error;
       
        if (!comments) {
            callback(false);
        }
        else{
            callback(comments);
        }
    });
};

// Retrieve comments by post id
module.exports.retrievePostid = function(postid, callback) {
    
    db.comments.find({postid:mongojs.ObjectId(postid)}).sort({date:-1}, function(error,comments) {
        if (error) throw error;
       
        if (!comments) {
            callback(false);
        }
        else{
            callback(comments);
        }
    });
};

//count number of comments in database
module.exports.count=function(callback){
  db.comments.count(function(error,count){
        if (error) throw error;
        callback(count);
  });
};

//count number of comments in database by user
module.exports.countUser=function(user,callback){
  db.comments.find({user:user}).count(function(error,count){
        if (error) throw error;
        callback(count);
  });
};

//count number of comments in database by postid
module.exports.countPostid=function(postid,callback){
  db.comments.find({postid:mongojs.ObjectId(postid)}).count(function(error,count){
        if (error) throw error;
        callback(count);
  });
};


//delete a comment by id
module.exports.delete=function(itemid,callback){
     db.comments.remove({_id:mongojs.ObjectId(itemid)}, function(error) {
        if (error) throw error;
        callback(true);
     });
     
}

//delete a comment by user
module.exports.deleteUser=function(user,callback){
     db.comments.remove({user:user}, function(error) {
        if (error) throw error;
        callback(true);
     });
     
}

//delete a comment by postid
module.exports.deletePostid=function(postid,callback){
     db.comments.remove({postid:mongojs.ObjectId(postid)}, function(error) {
        if (error) throw error;
        callback(true);
     });
     
}



// Delete all comments
module.exports.deleteAll = function(callback) {
    db.comments.remove({}, function(error) {
        if (error) throw error;
        callback();
    });
};

// Close the connection
module.exports.close = function(callback) {
    db.close(function(error) {
        if (error) throw error;
        callback();
    });
}