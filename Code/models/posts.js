// A model for a visitor collection
var mongojs = require('mongojs');
var bcrypt = require('bcrypt');

// Access the database
var db = mongojs('slubay', ['posts']);

// Create a new post
module.exports.create = function(user,title,category,description,date,views,comments,callback) {
    
   
    if (error) throw error;
        
    db.posts.findAndModify({
        query: {_id:_id},
        update: {$setOnInsert:{user:user,title:title,category:category,date:date,views:views,
        comments:comments}},
            new: true,
            upsert: true
            
        }, function(error, post) {
            if (error) throw error;
            
            callback(_id);
        });
};

//Edit tittle
module.exports.editTitle = function(_id, newtitle, callback) {
     db.posts.update({_id:_id}, {$set:{tittle:newtitle}}, function(error) {
        if (error) throw error;
        callback(true);
    });
}

//Edit category
module.exports.editCategory = function(_id, newCategory, callback) {
     db.posts.update({_id:_id}, {$set:{category:newCategory}}, function(error) {
        if (error) throw error;
        callback(true);
    });
}

//Edit description
module.exports.editDescription = function(_id, newDescription, callback) {
     db.posts.update({_id:_id}, {$set:{description:newDescription}}, function(error) {
        if (error) throw error;
        callback(true);
    });
}

//Edit date
module.exports.editDate = function(_id, newDate, callback) {
     db.posts.update({_id:_id}, {$set:{date:newDate}}, function(error) {
        if (error) throw error;
        callback(true);
    });
}


//Edit views
module.exports.editViews = function(_id, newviews, callback) {
     db.posts.update({_id:_id}, {$set:{views:newviews}}, function(error) {
        if (error) throw error;
        callback(true);
    });
}

//Retrieve all post
module.exports.retrieveAll = function(callback) {
    
    db.posts.find({}, function(error,posts) {
        if (error) throw error;
        callback(posts);
    });
};
//Retrieve post given category
module.exports.retrieveCategory = function(category,callback) {
    
    db.posts.find({category:category}, function(error,posts) {
        if (error) throw error;
        callback(posts);
    });
};
//Retrieve one post
module.exports.retrieve = function(itemid, callback) {
    
    db.posts.findOne({_id:mongojs.ObjectId(itemid)}, function(error,post) {
        if (error) throw error;
       
        if (!post) {
            callback(false);
        }
        else{
            callback(post);
        }
    });
};

//count number of post in the database
module.exports.count=function(callback){
  db.posts.count(function(error,count){
        if (error) throw error;
        callback(count);
  });
};
//delete a post
module.exports.delete=function(_id,callback){
     db.posts.remove({_id:_id}, function(error) {
        if (error) throw error;
        callback(true);
     });
}

//delete all post from one user
module.exports.deleteuser=function(user,callback){
     db.posts.remove({user:user}, function(error) {
        if (error) throw error;
        callback(true);
     });
     
}
// Delete all posts
module.exports.deleteAll = function(callback) {
    db.posts.remove({}, function(error) {
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