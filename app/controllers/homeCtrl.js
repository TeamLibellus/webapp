libellus.controller('homeController', ['$scope', '$http', '$mdSidenav', '$log', function($scope, $http, $mdSidenav, $log) {

  $scope.courses = {
    "Mon": {},
    "Tue": {},
    "Wed": {},
    "Thu": {},
    "Fri": {},
    "Sat": {},
  };

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

  $scope.hours = [{
    us: "8am",
    eu: "08:00"
  }, {
    us: "9am",
    eu: "09:00"
  }, {
    us: "10am",
    eu: "10:00"
  }, {
    us: "11am",
    eu: "11:00"
  }, {
    us: "12pm",
    eu: "12:00"
  }, {
    us: "1pm",
    eu: "13:00"
  }, {
    us: "2pm",
    eu: "14:00"
  }, {
    us: "3pm",
    eu: "15:00"
  }, {
    us: "4pm",
    eu: "16:00"
  }, {
    us: "5pm",
    eu: "17:00"
  }, {
    us: "6pm",
    eu: "18:00"
  }, {
    us: "7pm",
    eu: "19:00"
  }, {
    us: "8pm",
    eu: "20:00"
  }, {
    us: "9pm",
    eu: "21:00"
  }, {
    us: "10pm",
    eu: "22:00"
  }];

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
    } else {
      $log.debug("Add");
      $scope.selectedLevels.push(level);
    }
    $log.debug($scope.selectedLevels);
  };

  $scope.openNavbar = function() {
    $mdSidenav('navbar').open()
      .then(function() {
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

  $scope.timeToMargin = function() {

  }

  $scope.hours.forEach(function(e, i, t) {
    $scope.courses["Mon"][e.eu.split(":")[0]] = [];
    $scope.courses["Tue"][e.eu.split(":")[0]] = [];
    $scope.courses["Wed"][e.eu.split(":")[0]] = [];
    $scope.courses["Thu"][e.eu.split(":")[0]] = [];
    $scope.courses["Fri"][e.eu.split(":")[0]] = [];
    $scope.courses["Sat"][e.eu.split(":")[0]] = [];
  });

  $scope.sortClasses = function() {
    $scope.classes.forEach(function(e, i, t) {
      e.time.forEach(function(ee, ii, tt) {
        e.height = 60 * $scope.getDuration(ee.start, ee.end);
        e.top = ee.start.split(":")[1];
        console.log(ee.start);
        console.log(ee.day);
        $scope.courses[ee.day][ee.start.split(":")[0]].push(e);
      });
    });
  }

  $scope.getDuration = function(start, end) {
    var d = new Date("October 13, 2014 " + end + ":00") - new Date("October 13, 2014 " + start + ":00");
    return ((d / 1000) / 3600);
  }

  $scope.convertHours = function(hoursFr) {
    var hours = hoursFr.split(":")[0];
    var hoursUS = parseInt(hours) % 12;
    if (hoursUS === 0) {
      hoursUS = 12;
    }
    return parseInt(hours) >= 12 ? hoursUS.toString() + "pm" : hoursUS.toString() + "am";
  }

  function c_to_rgb(c) {
    var b = c % 256,
      g_0 = (c % 65536 - b),
      r_0 = c - g_0 - b,
      g = g_0 / 256,
      r = r_0 / 65536;

    return [r, g, b];
  }
  $scope.generateColor = function(id) {
    var tmp = parseInt((id * 0xFFFFFF) / 300).toString();
    var rgb = c_to_rgb(tmp);
    return "rgb(" + rgb[0] + ", " + rgb[1] + ", " + rgb[2] + ")";
  }

}]);
