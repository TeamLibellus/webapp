libellus.controller('homeController', ['$scope', '$http', function($scope, $http) {

  $scope.days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  $scope.hours = ["8:00am", "9:00am", "10:00am", "11:00am", "12:00pm", "1:00pm", "2:00pm"
  "3:00pm", "4:00pm", "5:00pm", "6:00pm", "7:00pm", "8:00pm", "9:00pm", "10:00pm"];

  $scope.terms = [];
  $scope.subjects = [];
  $scope.classes = [];

$scope.getTerms = function() {
  $http({
    method: 'GET',
    url: 'http://api.libell.us/terms'
  }).then(function successCallback(response) {
    $scope.terms = response.data;
    console.log($scope.terms);
  }, function errorCallback(response) {
    console.log(response);
  });
}

$scope.getSubjects = function(term) {
  $http({
    method: 'GET',
    url: 'http://api.libell.us/subjects'
  }).then(function successCallback(response) {
    $scope.subjects = response.data;
    console.log($scope.subjects);
  }, function errorCallback(response) {
    console.log(response);
  });
}

$scope.getClasses = function(subjectId) {
  $http({
    method: 'GET',
    url: 'http://api.libell.us/subjects/' + subjectId + '/classes'
  }).then(function successCallback(response) {
    $scope.classes = response.data;
    console.log($scope.classes);
  }, function errorCallback(response) {
    console.log(response);
  });
}

// $scope.getTerms();
// $scope.getSubjects(1);
// $scope.getClasses(1);

}]);
