// A model for a visitor collection
var mongojs = require('mongojs');
var bcrypt = require('bcrypt');

// Access the database
var db = mongojs('slubay', ['messages']);

// Create a new message
module.exports.create = function(sender,receiver,title,message,date,callback) {
    
   
    if (error) throw error;
        
    db.messages.findAndModify({
        query: {_id:_id},
        update: {$setOnInsert:{sender:sender,receiver:receiver,title:title,message:message,date:date}},
            new: true,
            upsert: true
            
        }, function(error, message) {
            if (error) throw error;
            
            callback(_id);
        });
};




//Retrieve one message
module.exports.retrieve = function(_id, callback) {
    
    db.messages.findOne({_id:_id}, function(error,message) {
        if (error) throw error;
       
        if (!message) {
            callback(false);
        }
        else{
            callback(message);
        }
    });
};

//count number of message in the database
module.exports.count=function(callback){
  db.messages.count(function(error,count){
        if (error) throw error;
        callback(count);
  });
};
//delete a message
module.exports.delete=function(_id,callback){
     db.messages.remove({_id:_id}, function(error) {
        if (error) throw error;
        callback(true);
     });
     
}

//delete all messages in an user(receiver) inbox
module.exports.deleteuser=function(receiver,callback){
     db.messages.remove({receiver:receiver}, func