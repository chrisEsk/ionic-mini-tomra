angular.module('starter.services', [])

.service('LoginService', function($q, Users, Scores) {
    var userLogged = null;
    var userScore = null;

    return {
        loginUser: function(name, pw) {
            var deferred = $q.defer();
            var promise = deferred.promise;

            var user = {
                name: name,
                pw: pw
            };
            var profileFetched = Users.verifyUser(user);
            var scoreFetch = Scores.getUserScore(profileFetched.id);
            if (profileFetched != null) {
                userLogged = profileFetched;
                userScore = scoreFetch;
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
            return userLogged;
        },
        getUserScore: function() {
            return userScore;
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

.service('ScoresService', function($q, Scores, Users) {
    var top10Scores = null;
    var top10Names = [];
    return {
        getTop10Scores: function() {
            top10Scores = Scores.getTop10Scores();
            return top10Scores;
        },
        getTop10Names: function() {
            for (var i = 0; i < top10Scores.length; i++) {
                top10Names.push(Users.getById(i + 1));
            }
            return top10Names;
        },
        addPoints: function(user, points) {
            var newEntrie = Scores.addPoints(user, points);
            console.log(newEntrie);
        }
    }
})

.factory('Users', function() {
    var service = {};

    service.entries = [{
        "id": 1,
        "name": "user",
        "pw": "123"
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

    service.getById = function(id) {
        for (var i = 0; i < service.entries.length; i++) {
            if (service.entries[i].id == id) {
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

    service.getUserScore = function(id) {
        for (var i = 0; i < service.entries.length; i++) {
            if (service.entries[i].id == id) {
                return service.entries[i];
            }
        }
        return null;
    }

    service.getTop10Scores = function() {
        var top10Scores = [];
        for (var i = 0; i < 10; i++) {
            if (service.entries[i] != null) {
                top10Scores.push(service.entries[i]);
            }
        }
        return top10Scores;
    }

    service.addPoints = function(userSession, pointsToAdd) {
        for (var i = 0; i < service.entries.length; i++) {
            var entrie = service.entries[i];
            if (entrie.id == userSession.id) {
                var points = entrie.score + Number.parseInt(pointsToAdd);
                entrie.score = points;
                return entrie;
            }
        }
        return null;
    }

    return service;
});