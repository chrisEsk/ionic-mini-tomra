angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state) {
    $scope.data = {};
    $scope.userSession = null;

    $scope.login = function() {
        LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
            $scope.userSession = $scope.data.username;
            $state.go('tab.dash');
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
        });
    }

    $scope.register = function() {
        $state.go('register');
    }
})

.controller('DashCtrl', function($scope, LoginService) {
    $scope.userSession = LoginService.getProfileInfo();
    $scope.userScore = LoginService.getUserScore();
})

.controller('RecycleCtrl', function($scope, ScoresService, LoginService) { 
    $scope.data = {points:0};
    $scope.recycleBtn = function() {
        $scope.userSession = LoginService.getProfileInfo();
        ScoresService.addPoints($scope.userSession, $scope.data.points);
    }
    
})

.controller('RegisterCtrl', function($scope, $ionicPopup, $state, RegisterService) {
    $scope.data = {};
    $scope.registerClick = function() {
        RegisterService.registerUser($scope.data.regUsername, $scope.data.regPassword).success(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Success!',
                template: 'User registered sucessfully!'
            });
            $state.go('login');
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Error adding new user!',
                template: 'Please check your credentials!'
            });
        });
    }
})

.controller('Top10Ctrl', function($scope, ScoresService) {
    $scope.top10Scores = ScoresService.getTop10Scores();
    $scope.top10Names = ScoresService.getTop10Names();
    $scope.top10 = [];
    for(var i = 0; i < $scope.top10Scores.length; i++) {
        var record = {name:"",score:""};
        record.name = $scope.top10Names[i].name;
        record.score = $scope.top10Scores[i].score;
        $scope.top10.push(record);
    }
    console.log($scope.top10);
});