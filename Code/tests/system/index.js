// Tests for use cases at the index route
var users = require('../../models/users');
var zombie = require('zombie');
var browser = new zombie();

// Empty the database
exports['setup'] = function(test) {
    users.deleteAll(function() {
        test.done();
    });
};

// Make an account (success)
exports['make an account (success)'] = function(test) {
    test.expect(2);
    
    browser.visit('http://localhost:8080/', function() {
        test.ok(browser.query('#register'));
        
        browser.
            fill('#register_realname', 'realname').
            fill('#register_name', 'username').
            fill('#register_password', 'password').
            fill('#register_email', 'email@email.com').
            pressButton('#register_submit', function() {
                test.ok(browser.query('#logout'));
                browser.clickLink('#logout', function() {
                    test.done();
                });
            });
    });
}

// Make an account (failure)
exports['make an account (failure)'] = function(test) {
    test.expect(2);
    
    browser.visit('http://localhost:8080/', function() {
        test.ok(browser.query('#register'));
        
        browser.
            fill('#register_realname', 'realname').
            fill('#register_name', 'username').
            fill('#register_password', 'password').
            fill('#register_email', 'email@email.com').
            pressButton('#register_submit', function() {
                test.ok(browser.query('#error'));
                test.done();
            });
    });
}

// Log in (success)
exports['log in (success)'] = function(test) {
    test.expect(1);
    
    browser.visit('http://localhost:8080/', function() {
        test.ok(browser.query('#register'));
        
        browser.
            fill('#login_name', 'username').
            fill('#login_password', 'password').
            pressButton('#login_submit', function() {
                test.done();
            });
    });
}

// Create new post (success)
exports['create new post1 (success)'] = function(test) {
    test.expect(2);
    
    browser.visit('http://localhost:8080/home', function() {
        console.log('made it here');
        test.ok(browser.query('#createnewpost'));
        console.log('made it here1');
        browser.pressButton('#createnewpost', function() {
            console.log('made it here2');
            browser.
            fill('#title', 'title').
            fill('#category','Skateboards').
            fill('#description', 'description').
            pressButton('#submitnewpost', function() {
                console.log('made it here3');
                test.ok(browser.query('#logout'));
                browser.clickLink('#logout', function() {
                    console.log('made it here4');
                    test.done();
                });
            });
        });
        
    });
}

// Create new post (success)
//exports['create new post (success)'] = function(test) {
//    test.expect(2);
//    
//    browser.visit('http://localhost:8080/', function() {
//        test.ok(browser.query('#register'));
//        
//        browser.
//            fill('#login_name', 'username').
//            fill('#login_password', 'password').
//            pressButton('#login_submit', function() {
//                console.log('made it here');
//                browser.clickLink('#createnewpost', function() {
//                    console.log('made it here2');
//                    browser.
//                        fill('#title', 'title').
//                        select('#category','books').
//                        fill('#description', 'description').
//                        pressButton('#submitnewpost', function() {
//                            console.log('made it here 3');
//                            test.ok(browser.query('#logout'));
//                            browser.clickLink('#logout', function() {
//                                test.done();
//                            });
//                        });
//
//                });
//            });
//    });
//}

// Log in (failure - bad username)
exports['log in (failure - bad username)'] = function(test) {
    test.expect(2);
    
    browser.visit('http://localhost:8080/', function() {
        test.ok(browser.query('#login'));
        
        browser.
            fill('#login_name', 'badusername').
            fill('#login_password', 'password').
            pressButton('#login_submit', function() {
                test.ok(browser.query('#error'));
                test.done();

            });
    });
}

// Log in (failure - bad password)
exports['log in (failure - bad password)'] = function(test) {
    test.expect(2);
    
    browser.visit('http://localhost:8080/', function() {
        test.ok(browser.query('#login'));
        
        browser.
            fill('#login_name', 'username').
            fill('#login_password', 'badpassword').
            pressButton('#login_submit', function() {
                test.ok(browser.query('#error'));
                test.done();

            });
    });
}

// Empty the database and close the connection
exports['cleanup'] = function(test) {
    users.deleteAll(function() {
        users.close(function() {
            test.done();
        });
    });
};