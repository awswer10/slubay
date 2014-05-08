// A model for a visitor collection
var mongojs = require('mongojs');
var bcrypt = require('bcrypt');

// Access the database
var db = mongojs('slubay', ['users']);

// Register a new user
//Inp: name, realname, password, email, callback
//Out: boolean whether the password and hash are equal
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


// Ban a user
//Inp:name, callback
//Out: true if success, false if doesn't
module.exports.ban=function(name,callback){
     db.users.findOne({name:name}, function(error, user) {
        if (error) throw error;
        
        if (!user) {
            callback(false);
        }
        
        else {
            user.ban=true;
            db.users.save(user, function(error) {
                if (error) throw error;
                callback(true);
            });
          
        }
    });
}

// Unban a user
//Inp:name, callback
//Out: true if success, false if doesn't
module.exports.unban=function(name,callback){
     db.users.findOne({name:name}, function(error, user) {
        if (error) throw error;
        
        if (!user) {
            callback(false);
        }
        
        else {
            user.ban=false;
            db.users.save(user, function(error) {
                if (error) throw error;
                callback(true);
            });
          
        }
    });
}


//make user admin
//Inp:name, callback
//Out: true if success, false if doesn't
module.exports.makeAdmin=function(name,callback){
    db.users.findOne({name:name}, function(error, user) {
        if (error) throw error;
        
        if (!user) {
            callback(false);
        }
        
        else {
            user.admin=true;
            db.users.save(user, function(error) {
                if (error) throw error;
                callback(true);
            });
          
        }
    });
}

//unmake user admin
//Inp:name, callback
//Out: true if success, false if doesn't
module.exports.unmakeAdmin=function(name,callback){
    db.users.findOne({name:name}, function(error, user) {
        if (error) throw error;
        
        if (!user) {
            callback(false);
        }
        
        else {
            user.admin=false;
            db.users.save(user, function(error) {
                if (error) throw error;
                callback(true);
            });
          
        }
    });
}

//check to see if user is Admin
//Inp:name, callback
//Out: boolean
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

//check to see if user is ban
//Inp:name, callback
//Out: boolean
module.exports.checkBan=function(name,callback){
     db.users.findOne({name:name}, function(error, user) {
        if (error) throw error;
        
        if (!user) {
            callback(false);
        }
        else {
            if (user.ban) {
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
//Inp:name, new email, callback
//Out: true 
module.exports.editEmail = function(name, newemail, callback) {
     db.users.update({name:name}, {$set:{email:newemail}}, function(error) {
        if (error) throw error;
        callback(true);
    });
}

//Edit realname
//Inp:name, new realname , callback
//Out: true
module.exports.editRealname = function(name, newrealname, callback) {
     db.users.update({name:name}, {$set:{realname:newrealname}}, function(error) {
        if (error) throw error;
        callback(true);
    });
}

//Edit password
//Inp:name, callback
//Out: true if success, false if doesn't
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
//Inp:name, password, callback
//Out: boolean
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
//Inp:callback
//Out: list of users
module.exports.retrieveAll = function(callback) {
    
    db.users.find({}, function(error,users) {
        if (error) throw error;
        callback(users);
    });
};

//Retrieve one user
//Inp:name, callback
//Out: return user if success, false if doesn't
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

//Retrieve one user
//Inp:name, callback
//Out: user email if success, false if doesn't
module.exports.retrieveEmail = function(name, callback) {
    
    db.users.findOne({name:name}, function(error,user) {
        if (error) throw error;
       
        if (!user) {
            callback(false);
        }
        else{
            callback(user.email);
        }
    });
};

//count number of user in the database
//Inp:callback
//Out: a number
module.exports.count=function(callback){
  db.users.count(function(error,count){
        if (error) throw error;
        callback(count);
  });
};

// Delete all users
//Inp: callback
//Out: true
module.exports.deleteAll = function(callback) {
    db.users.remove({}, function(error) {
        if (error) throw error;
        callback(true);
    });
};

//Delete one user
//Inp:name, callback
//Out: true if success, false if doesn't
module.exports.delete = function(name, callback) {
    
     db.users.findOne({name:name}, function(error, user) {
        if (error) throw error;
        
        if (!user) {
            callback(false);
        }
        
        else {
            db.users.remove({name:name}, function(error, success) {
                if (error) throw error;
                
                callback(success);
            })
        }
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
};