angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state, $window) {
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
})

.controller('RegisterCtrl', function($scope, $ionicPopup, $state, RegisterService) {
    $scope.data = {};
    console.log('Talking with the Register controller...');
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
});