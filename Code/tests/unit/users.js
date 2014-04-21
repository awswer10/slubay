// Unit tests for the users collection
var users = require('../../models/users');

// Empty the database
exports['setup'] = function(test) {
    users.deleteAll(function() {
        test.done();
    });
};

// Successful registration
exports['register a user'] = function(test) {
    test.expect(1);
    users.create('username','realname', 'password','email', 'year','major', function(success) {
        test.ok(success);
        test.done();
    });
};

// Failed registration
exports['register a duplicate user'] = function(test) {
    test.expect(1);
    users.create('username', 'realname', 'password','email', 'year','major', function(success) {
        test.ok(!success);
        test.done();
    });
};

// Successful login
exports['login a user'] = function(test) {
    test.expect(1);
    users.login('username', 'password', function(success) {
        test.ok(success);
        test.done();
    });
};

// Unsuccessful logins
exports['login with bad username'] = function(test) {
    test.expect(1);
    users.login('badusername', 'password', function(success) {
        test.ok(!success);
        test.done();
    });
};

//Unsuccessful logins
exports['login with bad password'] = function(test) {
    test.expect(1);
    users.login('username', 'badpassword', function(success) {
        test.ok(!success);
        test.done();
    });
};
// Successful ban user
exports['ban user'] = function(test) {
    test.expect(1);
    users.ban('username', function(success) {
        test.ok(success);
        test.done();
    });
};

// Successful unban user
exports['unban user'] = function(test) {
    test.expect(1);
    users.unban('username', function(success) {
        test.ok(success);
        test.done();
    });
};

// Successful edit email
exports['edit email'] = function(test) {
    test.expect(1);
    users.editEmail('username','newemail', function(success) {
        test.ok(success);
        test.done();
    });
};
// Successful edit year
exports['edit year'] = function(test) {
    test.expect(1);
    users.editYear('username','newyear', function(success) {
        test.ok(success);
        test.done();
    });
};
// Successful edit major
exports['edit major'] = function(test) {
    test.expect(1);
    users.editMajor('username','newmajor', function(success) {
        test.ok(success);
        test.done();
    });
};// Successful edit realname
exports['edit realname'] = function(test) {
    test.expect(1);
    users.editRealname('username','newrealname', function(success) {
        test.ok(success);
        test.done();
    });
};


// Successful make user admin
exports['make admin'] = function(test) {
    test.expect(1);
    users.makeAdmin('username', function(success) {
        test.ok(success);
        test.done();
    });
};


// Successful unmake user admin
exports['unmake admin'] = function(test) {
    test.expect(1);
    users.unmakeAdmin('username', function(success) {
        test.ok(success);
        test.done();
    });
};
// Successful edit password
exports['edit password '] = function(test) {
    test.expect(1);
    users.editPassword('username', 'password','newpassword', function(success) {
        test.ok(success);
        test.done();
    });
};

// Unsuccessful edit password
exports['edit password with wrong credential '] = function(test) {
    test.expect(1);
    users.editPassword('username', 'word','newpassword', function(success) {
        test.ok(!success);
        test.done();
    });
};


//count number of user
exports['count number of user']= function(test){
    test.expect(1);
    users.count(function(count){
       test.ok(count=1);
       test.done();
    });
}

//// Empty the database and close the connection
//exports['cleanup'] = function(test) {
//    users.deleteAll(function() {
//        users.close(function() {
//            test.done();
//        });
//    });
//};
