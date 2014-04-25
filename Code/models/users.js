// A model for a visitor collection
var mongojs = require('mongojs');
var bcrypt = require('bcrypt');

// Access the database
var db = mongojs('slubay', ['users']);

// Register a new user
module.exports.create = function(name,realname,password,email, callback) {
    
    bcrypt.hash(password, 10, function(error,hash) {
        if (error) throw error;
        
        db.users.findAndModify({
            query: {name:name},
            
            //Admin and ban are automatically false; Other admin has to change this manually
            update: {$setOnInsert:{password:hash,realname:realname,email:email,
            admin:false,ban:false}},
            new: true,
            upsert: true
            
        }, function(error, user) {
            if (error) throw error;
            
            callback(user.password == hash);
        });
    });
};

//ban a user
module.exports.ban=function(name,callback){
     db.users.update({name:name}, {$set:{ban:true}}, function(error) {
        if (error) throw error;
        callback(true);
    });
}
//unban a user
module.exports.unban=function(name,callback){
     db.users.update({name:name}, {$set:{ban:false}}, function(error) {
        if (error) throw error;
        callback(true);
    });
}

//module.exports.unban=function(name,callback){
//     db.users.findOne({name:name}, function(error, user) {
//        if (error) throw error;
//      
//        if (!user) {
//            callback(false);
//        }
//        
//        else {
//            user.ban=false;
//            db.users.save(user, function(error) {
//                if (error) throw error;
//                callback(true);
//            });
//          
//        }
//    });
//}


//make user admin
module.exports.makeAdmin=function(name,callback){
     db.users.update({name:name}, {$set:{admin:true}}, function(error) {
        if (error) throw error;
        callback(true);
    });
}

//unmake user admin
module.exports.unmakeAdmin=function(name,callback){
     db.users.update({name:name}, {$set:{admin:false}}, function(error) {
        if (error) throw error;
        callback(true);
    });
}

//check to see if user is Admin
module.exports.admin=function(name,callback){
     db.users.findOne({name:name}, function(error, user) {
        if (error) throw error;
        
        if (!user) {
            callback(false);
        }
        else {
            if (user.admin) {
                callback(true);
            }
            else
            {
                callback(false);
            }
        }
    });
}
     
//Edit email
module.exports.editEmail = function(name, newemail, callback) {
     db.users.update({name:name}, {$set:{email:newemail}}, function(error) {
        if (error) throw error;
        callback(true);
    });
}

//Edit realname
module.exports.editRealname = function(name, newrealname, callback) {
     db.users.update({name:name}, {$set:{realname:newrealname}}, function(error) {
        if (error) throw error;
        callback(true);
    });
}

//Edit password
module.exports.editPassword = function(name, password, newpassword, callback) {
      db.users.findOne({name:name}, function(error, user) {
        if (error) throw error;
        
        if (!user) {
            callback(false);
        }
        
        else {
            bcrypt.compare(password, user.password, function(error, success) {
                if (error) throw error;
                
                if (success) {
                     bcrypt.hash(newpassword, 10, function(error,hash) {
                        if (error) throw error;
                        db.users.update({name:name},{$set:{password:hash}},function(error){
                            if (error) throw error;
                            callback(true);
                            
                        });
                        
                     });
                } else{
                    callback(false);
                }
            });
        }
    });
    
}


// Verify login credentials
module.exports.login = function(name, password, callback) {
    
    db.users.findOne({name:name}, function(error, user) {
        if (error) throw error;
        
        if (!user) {
            callback(false);
        }
        
        else {
            bcrypt.compare(password, user.password, function(error, success) {
                if (error) throw error;
                
                callback(success);
            })
        }
    });
};

//Retrieve all user
module.exports.retrieveAll = function(callback) {
    
    db.users.find({}, function(error,users) {
        if (error) throw error;
        callback(users);
    });
};

//Retrieve one user
module.exports.retrieve = function(name, callback) {
    
    db.users.findOne({name:name}, function(error,user) {
        if (error) throw error;
       
        if (!user) {
            callback(false);
        }
        else{
            callback(user);
        }
    });
};

//count number of user in the database
module.exports.count=function(callback){
  db.users.count(function(error,count){
        if (error) throw error;
        callback(count);
  });
};

// Delete all users
module.exports.deleteAll = function(callback) {
    db.users.remove({}, function(error) {
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
};