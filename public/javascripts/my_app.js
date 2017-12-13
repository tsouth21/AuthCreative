var apps = angular.module('myApp', []).
  controller('myController', ['$scope', '$http',
                              function($scope, $http) {
    //$scope.users = [];
    $scope.messages = [];
    $scope.sendMessage = function() {
	var newmessage = {fromUser:$scope.user.username, toUser:$scope.toUser, url:$scope.url};
	$scope.toUser='';
	$scope.url='';
	$http.post('/messages', newmessage).success(function(data) {
	  $scope.messages.push(data);
	});
    };
    //    $scope.sendUser = function() {
    //    var newuser = {username:$scope.user.username};
    //    $http.post('/users', newuser).success(function(data) {
    //      $scope.users.push(data);
    //    });
    //};
    $scope.getMessage = function() {
	return $http.get('/messages').success(function(data){
	  angular.copy(data, $scope.messages);
	});
    };
    $scope.getMessage();
    //$scope.getUser = function() {
    //    return $http.get('/users').success(function(data){
    //      angular.copy(data, $scope.users);
    //    });
    //};
    //$scope.getUser();
    $http.get('/user/profile')
        .success(function(data, status, headers, config) {
      $scope.user = data;
      $scope.error = "";
    }).
    error(function(data, status, headers, config) {
      $scope.user = {};
      $scope.error = data;
    });
  }]);

