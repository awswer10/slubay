// A model for a visitor collection
var mongojs = require('mongojs');
var bcrypt = require('bcrypt');

// Access the database
var db = mongojs('slubay', ['categories']);

// Create a new category
module.exports.create = function(name,callback) {
    
   
    if (error) throw error;
        
    db.categories.findAndModify({
        query: {name:name},
        update: {$setOnInsert:{name:name}},
            new: true,
            upsert: true
            
        }, function(error, message) {
            if (error) throw error;
            
            callback(_id);
        });
};

// retrieve all categories
module.exports.retrieveAll = function(callback) {
    db.categories.find({}, function(error, allItems) {
        if (error) throw error;
        callback(allItems);
    });
};

// Retrieve one category
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

//count number of categories in database
module.exports.count=function(callback){
  db.categories.count(function(error,count){
        if (error) throw error;
        callback(count);
  });
};

//delete a category
module.exports.delete=function(name,callback){
     db.categories.remove({name:name}, function(error) {
        if (error) throw error;
        callback(true);
     });
     
}



// Delete all categories
module.exports.deleteAll = function(callback) {
    db.categories.remove({}, function(error) {
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