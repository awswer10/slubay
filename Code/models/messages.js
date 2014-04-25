// A model for a visitor collection
var mongojs = require('mongojs');
var bcrypt = require('bcrypt');

// Access the database
var db = mongojs('slubay', ['messages']);

// Create a new message
module.exports.create = function(name,callback) {
    
   
    if (error) throw error;
        
    db.messages.findAndModify({
        query: {name:name},
        update: {$setOnInsert:{name:name}},
            new: true,
            upsert: true
            
        }, function(error, message) {
            if (error) throw error;
            
            callback(_id);
        });
};

// retrieve all messages
module.exports.retrieveAll = function(callback) {
    db.messages.find({}, function(error) {
        if (error) throw error;
        callback();
    });
};

// Retrieve one message
module.exports.retrieve = function(itemid, callback) {
    
    db.messages.findOne({_id:mongojs.ObjectId(itemid)}, function(error,message) {
        if (error) throw error;
       
        if (!message) {
            callback(false);
        }
        else{
            callback(message);
        }
    });
};

//count number of messages in database
module.exports.count=function(callback){
  db.messages.count(function(error,count){
        if (error) throw error;
        callback(count);
  });
};

//delete a message
module.exports.delete=function(name,callback){
     db.messages.remove({name:name}, function(error) {
        if (error) throw error;
        callback(true);
     });
     
}



// Delete all messages
module.exports.deleteAll = function(callback) {
    db.messages.remove({}, function(error) {
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