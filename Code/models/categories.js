// A model for a visitor collection
var mongojs = require('mongojs');
var bcrypt = require('bcrypt');

// Access the database
var db = mongojs('slubay', ['categories']);

// Create a new category
//Inp: category name, callback
//Out: If item is created, returned category object else return false
module.exports.create = function(name,callback) {
        
    //search the database and see if the category has already exist, otherwise create it.     
    db.categories.findAndModify({
        query: {name:name},
        update: {$setOnInsert:{name:name}},
            new: true,
            upsert: true
            
        }, function(error, category) {
            if (error) throw error;
            
            callback(category);
        });
};

// retrieve all categories, sort them by ascending order
//Inp: callback
//Out: list of all item in the database in acensding order
module.exports.retrieveAll = function(callback) {
	db.categories.find({}).sort({
		name: 1
	}, function(error, allItems) {
		if (error) throw error;
		callback(allItems);
	});
};


// Retrieve one category
//Inp: the item ID, callback
//Out:return the item if it does exist
//      return false if item doesn't exist
module.exports.retrieve = function(itemid, callback) {
    
    db.categories.findOne({_id:mongojs.ObjectId(itemid)}, function(error,category) {
        if (error) throw error;
       
        if (!category) {
            callback(false);
        }
        else{
            callback(category);
        }
    });
};

// Retrieve one category name
//Inp:category id, callback
//Out: item's name if it does exist, otherwise return false
module.exports.retrieveName = function(itemid, callback) {
    
    db.categories.findOne({_id:mongojs.ObjectId(itemid)}, function(error,category) {
        if (error) throw error;
       
        if (!category) {
            callback(false);
        }
        else{
            callback(category.name);
        }
    });
};


// Retrieve one category ID
//Inp:category name, callback
//Out:category if it does exist, return false if it doesn't exist.
module.exports.retrieveID = function(name, callback) {
    
    db.categories.findOne({name:name}, function(error,category) {
        if (error) throw error;
       
        if (!category) {
            callback(false);
        }
        else{
            callback(category._id);
        }
    });
};

//count number of categories in database
//Inp:callback
//Out: number of category in the database
module.exports.count=function(callback){
  db.categories.count(function(error,count){
        if (error) throw error;
        callback(count);
  });
};

//delete a category
//Inp:category name, callback
//Out: true if successful
module.exports.delete=function(name,callback){
     db.categories.remove({name:name}, function(error) {
        if (error) throw error;
        callback(true);
     });
     
}



// Delete all categories
//Inp:callback
//Out: true if successful
module.exports.deleteAll = function(callback) {
    db.categories.remove({}, function(error) {
        if (error) throw error;
        callback(true);
    });
};

// Close the connection
//Inp:callback
//Out:none
module.exports.close = function(callback) {
    db.close(function(error) {
        if (error) throw error;
        callback();
    });
}