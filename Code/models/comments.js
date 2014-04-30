// A model for a visitor collection
var mongojs = require('mongojs');
var bcrypt = require('bcrypt');

// Access the database
var db = mongojs('slubay', ['comments']);

// Create a new comment
module.exports.create = function(postID,textfield,user,callback) {
    
   
    if (error) throw error;
        
    db.comments.findAndModify({
        query: {},
        update: {$setOnInsert:{postID:mongojs.ObjectId(postID),textfield:textfield,user:user}},
            new: true,
            upsert: true
            
        }, function(error, comment) {
            if (error) throw error;
            
            callback(_id);
        });
};

// retrieve all comments
module.exports.retrieveAll = function(callback) {
    db.comments.find({}, function(error) {
        if (error) throw error;
        callback();
    });
};

// Retrieve one comment by ID
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

// Retrieve one comment by ID
module.exports.retrievePostID = function(postid, callback) {
    
    db.comments.findOne({postid:mongojs.ObjectId(postid)}, function(error,comment) {
        if (error) throw error;
       
        if (!comment) {
            callback(false);
        }
        else{
            callback(comment);
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

//count number of comments in database by postID
module.exports.countPostID=function(postid,callback){
  db.comments.find({postid:mongojs.ObjectID(postid)}).count(function(error,count){
        if (error) throw error;
        callback(count);
  });
};


//delete a comment by ID
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

//delete a comment by postID
module.exports.deletePostID=function(postid,callback){
     db.comments.remove({postid:mongojs.ObjectID(postid)}, function(error) {
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