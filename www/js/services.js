angular.module('starter.services', [])

.service('LoginService', function($q, Users) {
    var userLogged = null;

    return {
        loginUser: function(name, pw) {
            var deferred = $q.defer();
            var promise = deferred.promise;

            console.log(Users.entries);

            var user = {
                name: name,
                pw: pw
            };
            var profileFetched = Users.verifyUser(user);
            if (profileFetched != null) {
                userLogged = profileFetched;
                deferred.resolve('Welcome ' + name + '!');
            } else {
                deferred.reject('Wrong credentials.');
            }
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        },
        getProfileInfo: function() {
            console.log(userLogged);
            return userLogged;
        }
    }

})

.service('RegisterService', function($q, Users, Scores) {
    console.log('Talking with the register service...');
    var countUsers = 0;
    return {
        registerUser: function(name, pw) {
            var deferred = $q.defer();
            var promise = deferred.promise;

            if (name != undefined && pw != undefined) {
                deferred.resolve(name + ' has been registered!');
                countUsers = Users.entries.length + 1;
                var userObj = {
                    id: countUsers,
                    name: name,
                    pw: pw
                }
                Users.entries.push(userObj);
                var initScore = {
                    id: userObj.id,
                    score: 0
                }
                console.log(initScore);
                Scores.entries.push(initScore);
                console.log("Count Users: " + Users.entries.length);
            } else {
                deferred.reject('Wrong credentials.');
            }
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    }
})

.factory('Users', function() {
    var service = {};

    service.entries = [{
        "id": 1,
        "name": "user",
        "pw": "secret"
    }, {
        "id": 2,
        "name": "user2",
        "pw": "secret"
    }, {
        "id": 3,
        "name": "user3",
        "pw": "secret"
    }, {
        "id": 4,
        "name": "user4",
        "pw": "secret"
    }];

    service.verifyUser = function(user) {
        for (var i = 0; i < service.entries.length; i++) {
            if (service.entries[i].name == user.name && service.entries[i].pw == user.pw) {
                return service.entries[i];
            }
        }
        return null;
    }
    return service;
})

.factory('Scores', function() {
    var service = {};

    service.entries = [{
        "id": 1,
        "score": 300
    }, {
        "id": 2,
        "score": 1000
    }, {
        "id": 3,
        "score": 400
    }, {
        "id": 4,
        "score": 100
    }];

    return service;
});