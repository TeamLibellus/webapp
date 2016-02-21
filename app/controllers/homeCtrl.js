libellus.controller('homeController', ['$scope', '$http', '$mdSidenav', '$log', function($scope, $http, $mdSidenav, $log) {

  $scope.days = [{
    name: "Monday",
    abr: "Mon"
  }, {
    name: "Tuesday",
    abr: "Tue"
  }, {
    name: "Wednesday",
    abr: "Wed"
  }, {
    name: "Thursday",
    abr: "Thu"
  }, {
    name: "Friday",
    abr: "Fri"
  }];

  $scope.hours = ["8:00am", "9:00am", "10:00am", "11:00am", "12:00pm", "1:00pm", "2:00pm",
  "3:00pm", "4:00pm", "5:00pm", "6:00pm", "7:00pm", "8:00pm", "9:00pm", "10:00pm"];
  $scope.levels = [100, 200, 300, 400, 500, 600];

  $scope.terms = [];
  $scope.subjects = [];
  $scope.classes = [];
  $scope.selectedLevels = [];
  $scope.minimumSeats = 1;
  $scope.rowHeight = 40;
  $scope.selectedClassesOnly = false;
  $scope.classConflicts = true;

  $scope.selectedTerm;

  $scope.toggleSelection = function toggleSelection(level) {
    var i = $scope.selectedLevels.indexOf(level);
    if (i > -1) {
      $log.debug("Del");
      $scope.selectedLevels.splice(i, 1);
    }
    else {
      $log.debug("Add");
      $scope.selectedLevels.push(level);
    }
    $log.debug($scope.selectedLevels);
  };

  $scope.openNavbar = function () {
    $mdSidenav('navbar').open()
    .then(function () {
      $log.debug("open navbar is done");
    });
  }

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
      $scope.sortClasses();
    }, function errorCallback(response) {
      console.log(response);
    });
  }

  $scope.getTerms();
  $scope.getSubjects(1);
  $scope.getClasses(1);

  $scope.timeToMargin = function () {

  }

  $scope.courses = {
    "Mon" : {},
    "Tue" : {},
    "Wed" : {},
    "Thu" : {},
    "Fri" : {},
    "Sat" : {},
  };

  $scope.hours.forEach(function(e, i, t){
    $scope.courses["Mon"][e.split(":")[0]] = [];
    $scope.courses["Tue"][e.split(":")[0]] = [];
    $scope.courses["Wed"][e.split(":")[0]] = [];
    $scope.courses["Thu"][e.split(":")[0]] = [];
    $scope.courses["Fri"][e.split(":")[0]] = [];
    $scope.courses["Sat"][e.split(":")[0]] = [];
  });

  $scope.sortClasses = function () {
    $scope.classes.forEach(function(e, i, t){
      e.time.forEach(function(ee, ii, tt) {
        e.height = 60 * $scope.getDuration(ee.start, ee.end);
        e.top = ee.start.split(":")[1];
        $scope.courses[ee.day][$scope.convertHours(ee.start)].push(e);
      });
    });
  }

  $scope.getDuration = function(start, end) {
    var d = new Date("October 13, 2014 "+end+":00") - new Date("October 13, 2014 "+start+":00");
    return ((d / 1000) / 3600);
  }

  $scope.convertHours = function(hoursFr) {
    var hours = hoursFr.split(":")[0];
    var hoursUS = parseInt(hours) % 12;
    if (hoursUS === 0) {
      hoursUS = 12;
    }
    return hoursUS.toString();
  }

}]);
