// A model for a visitor collection
var mongojs = require('mongojs');
var bcrypt = require('bcrypt');

// Access the database
var db = mongojs('slubay', ['posts','categories']);
var categories = require('../models/categories');
//var db = mongojs('slubay', ['categories']);

// Create a new post
module.exports.create = function(user,title,category,description,views,callback) {
        
        categories.retrieveID(category,function(categoryid) {
            db.posts.findAndModify({
            
            query: {title:title},
            update: {$setOnInsert:{user:user,title:title,category:category,categoryid:categoryid,description:description,date:new Date(),views:views}},
                new: true,
                upsert: true
                
            }, function(error, post) {
                if (error) throw error;
                
                callback(post);
            });
        });
        
};

//Edit tittle
module.exports.editTitle = function(itemid, newtitle, callback) {
     db.posts.update({_id:mongojs.ObjectId(itemid)}, {$set:{title:newtitle}}, function(error) {
        if (error) throw error;
        callback(true);
    });
}

//Edit category
module.exports.editCategory = function(itemid, newCategory, callback) {
    categories.retrieveID(newCategory,function(categoryid) {
        db.posts.update({_id:mongojs.ObjectId(itemid)}, {$set:{category:newCategory,categoryid:categoryid}}, function(error) {
           if (error) throw error;
           callback(true);
        });
    });
}

//Edit description
module.exports.editDescription = function(itemid, newDescription, callback) {
     db.posts.update({_id:mongojs.ObjectId(itemid)}, {$set:{description:newDescription}}, function(error) {
        if (error) throw error;
        callback(true);
    });
}

//Edit date
module.exports.editDate = function(itemid, newDate, callback) {
     db.posts.update({_id:mongojs.ObjectId(itemid)}, {$set:{date:newDate}}, function(error) {
        if (error) throw error;
        callback(true);
    });
}


//increase views
module.exports.increaseViews = function(itemid,callback) {
     db.posts.update({_id:mongojs.ObjectId(itemid)}, {$inc:{views: 1}}, function(error) {
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
module.exports.retrieveCategory = function(categoryname,callback) {
    
    //db.categories.find({_id:mongojs.ObjectId(itemid)}, function(error,category) {
    //    if (error) throw error;
    //    db.posts.find({category:category.name}, function(newerror,posts) {
    //           if (newerror) throw newerror;
    //           callback(posts);
    //    });
    //});
    db.posts.find({category:categoryname}, function(error,posts) {
        if (error) throw error;
        callback(posts);
    });
};

//Retrieve post given category
module.exports.retrieveRecent = function(callback) {

	db.posts.find({
		$query: {},
		$orderby: {
			date: -1
		}
	}, function(error, posts) {
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

//Retrieve post ID given title
module.exports.retrieveTitle = function(title, callback) {
    db.posts.findOne({title:title}, function(error,post) {
        if (error) throw error;
       
        if (!post) {
            callback(false);
        }
        else{
            callback(post._id);
        }
    });
};

//see if title has already exist
module.exports.titleExist = function(title, callback) {
    db.posts.findOne({title:title}, function(error,post) {
        if (error) throw error;
       
        if (!post) {
            callback(false);
        }
        else{
            callback(true);
        }
    });
};


//Retrieve all posts of one user
module.exports.retrieveUser = function(user, callback) {
    db.posts.find({user:user}, function(error,posts) {
        if (error) throw error;
       
        if (!user) {
            callback(false);
        }
        else{
            callback(posts);
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

//count number of post in one category
module.exports.countCategory=function(categoryname,callback){
  db.posts.find({category:categoryname}).count(function(error,count){
        if (error) throw error;
        callback(count);
  });
};

//delete a post
module.exports.delete=function(itemid,callback){
     db.posts.remove({_id:mongojs.ObjectId(itemid)}, function(error) {
        if (error) throw error;
        callback(true);
     });
}

//delete all post from one user
module.exports.deleteUser=function(user,callback){
     db.posts.remove({user:user}, function(error) {
        if (error) throw error;
        callback(true);
     });
     
}

//delete all post from one category
module.exports.deleteCategory=function(category,callback){
     db.posts.remove({category:category}, function(error) {
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
