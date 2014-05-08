// A model for a visitor collection
var mongojs = require('mongojs');
var bcrypt = require('bcrypt');

// Access the database
var db = mongojs('slubay', ['posts','categories']);
var categories = require('../models/categories');
//var db = mongojs('slubay', ['categories']);

// Create a new post
//Inp:user, title, category, description, views, callback
//Out: a post object if successful
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

//Edit title
//Inp: postid, new title, callback
//Out: true if successful
module.exports.editTitle = function(itemid, newtitle, callback) {
     db.posts.update({_id:mongojs.ObjectId(itemid)}, {$set:{title:newtitle}}, function(error) {
        if (error) throw error;
        callback(true);
    });
}

//Edit category
//Inp: postid new category, callback
//Out: true if successful
module.exports.editCategory = function(itemid, newCategory, callback) {
    categories.retrieveID(newCategory,function(categoryid) {
        db.posts.update({_id:mongojs.ObjectId(itemid)}, {$set:{category:newCategory,categoryid:categoryid}}, function(error) {
           if (error) throw error;
           callback(true);
        });
    });
}

//Edit description
//Inp: postid, new Description, callback
//Out: true if successful
module.exports.editDescription = function(itemid, newDescription, callback) {
     db.posts.update({_id:mongojs.ObjectId(itemid)}, {$set:{description:newDescription}}, function(error) {
        if (error) throw error;
        callback(true);
    });
}

//Edit date
//Inp: postid, new Date , callback
//Out: true if successful
module.exports.editDate = function(itemid, newDate, callback) {
     db.posts.update({_id:mongojs.ObjectId(itemid)}, {$set:{date:newDate}}, function(error) {
        if (error) throw error;
        callback(true);
    });
}


//increase views
//Inp: postid, callback
//Out: true if successful
module.exports.increaseViews = function(itemid,callback) {
     db.posts.update({_id:mongojs.ObjectId(itemid)}, {$inc:{views: 1}}, function(error) {
        if (error) throw error;
        callback(true);
    });
}

//Retrieve all post
//Inp: callback
//Out: false if not exist, a list of posts if exist
module.exports.retrieveAll = function(callback) {
    
    db.posts.find({}, function(error,posts) {
        if (error) throw error;
        if (!posts) {
            callback(false);
        }
        else{
            callback(posts);
        }
    });
};

//Retrieve post given category
//Inp: category name, callback
//Out: False if there is no posts with in that category. A list of posts if it does exist.
module.exports.retrieveCategory = function(categoryname,callback) {
    
    //db.categories.find({_id:mongojs.ObjectId(itemid)}, function(error,category) {
    //    if (error) throw error;
    //    db.posts.find({category:category.name}, function(newerror,posts) {
    //           if (newerror) throw newerror;
    //           callback(posts);
    //    });
    //});
    db.posts.find({category:categoryname}).sort({date:-1}, function(error,posts) {
        if (error) throw error;
        if (!posts) {
            callback(false);
        }
        else{
            callback(posts);
        }
    });
};

//Retrieve up to 10 recent posts in descending order by date
//Inp: callback
//Out: a list of posts(up to 10) if it does exist. Return false otherwise.
module.exports.retrieveRecent = function(callback) {

	db.posts.find().sort({date: -1}).limit(10, function(error, posts) {
		if (error) throw error;
		if (!posts) {
                    callback(false);
                }
                else{
                    callback(posts);
                }
	});
};

//Retrieve up to 10 posts with most views by descending order
//Inp: callback
//Out: a list of posts(up to 10) if it does exist. Return false otherwise.
module.exports.retrieveHotPosts = function(callback) {

	db.posts.find().sort({views: -1}).limit(10, function(error, posts) {
		if (error) throw error;
		if (!posts) {
                    callback(false);
                }
                else{
                    callback(posts);
                }
	});
};


//Retrieve one post
//Inp: postid
//Out: post object if it does exist, false if it doesn't

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
//Inp: tilte, callback
//Out: post object if it does exist, false otherwise.
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
//Inp: tilte, callback
//Out: boolean
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
//Inp:user, callback
//Out:list of posts if it does exist, false if doesn't
module.exports.retrieveUser = function(user, callback) {
    db.posts.find({user:user}).sort({date:-1}, function(error,posts) {
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
//Inp:callback
//Out:a number
module.exports.count=function(callback){
  db.posts.count(function(error,count){
        if (error) throw error;
        callback(count);
  });
};

//count number of post in one category
//Inp: categoryname, callback
//Out: a number
module.exports.countCategory=function(categoryname,callback){
  db.posts.find({category:categoryname}).count(function(error,count){
        if (error) throw error;
        callback(count);
  });
};

//delete a post
//Inp:post id, comment
//Out: true
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
//Inp:number
//Out:none
module.exports.close = function(callback) {
    db.close(function(error) {
        if (error) throw error;
        callback();
    });
}
