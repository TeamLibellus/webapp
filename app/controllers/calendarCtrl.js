libellus.controller('calendarController', ['$scope', '$routeParams', '$mdDialog', '$http', '$mdSidenav', '$log', '$mdMedia', 'ClassesService', 'webNotification', 'AuthenticationService',function($scope, $routeParams, $mdDialog, $http, $mdSidenav, $log, $mdMedia, ClassesService, webNotification, AuthenticationService) {

  $scope.calendarId = $routeParams.id;

  $scope.search = function (row) {
    return (angular.lowercase(row.name || "").indexOf(angular.lowercase($scope.query) || '') !== -1 ||
    angular.lowercase(row.section || "").indexOf(angular.lowercase($scope.query) || '') !== -1 ||
    angular.lowercase(row.teacher.name || "").indexOf(angular.lowercase($scope.query) || '') !== -1);
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

  $scope.terms = [];
  $scope.subjects = [];
  $scope.classes = [];
  $scope.userId;

  $scope.baseUrl = 'http://libellus.michelantoine.ninja/';

  $scope.ClassesService = ClassesService;

    $scope.day = {
      "Sun" : 0,
      "Mon" : 1,
      "Tue" : 2,
      "Wed" : 3,
      "Thu" : 4,
      "Fri" : 5,
      "Sat" : 6,
    }

  $scope.getClasses = function() {
    $http({
      method: 'GET',
      url: $scope.baseUrl+'users/' + $scope.calendarId + '/classes'
    }).then(function successCallback(response) {
      console.log(response);
      response.data.forEach(function(e, i, t) {
        e.added = false;
        e.time.forEach(function(ee, ii, tt) {
          e.height = 60 * $scope.getDuration(ee.start, ee.end);
          e.top = ee.start.split(":")[1];

          // var d = Date.parse("next " + ee.day);
          // d.set({hour : parseInt(ee.start.split(':')[0], 10), minute : parseInt(ee.start.split(':')[1], 10)});
          // var time = d.getTime() -  Date.now();
          // $scope.notif(e.name, e.name, time);

          $scope.mycourses[ee.day][ee.start.split(":")[0]].push(e);
        });
      });
    }, function errorCallback(response) {

    });

  }

  $scope.resetMyCourses = function() {
    $scope.mycourses = {
      "Mon": {},
      "Tue": {},
      "Wed": {},
      "Thu": {},
      "Fri": {},
      "Sat": {},
    };
    $scope.hours.forEach(function(e, i, t) {
      $scope.mycourses["Mon"][e.eu.split(":")[0]] = [];
      $scope.mycourses["Tue"][e.eu.split(":")[0]] = [];
      $scope.mycourses["Wed"][e.eu.split(":")[0]] = [];
      $scope.mycourses["Thu"][e.eu.split(":")[0]] = [];
      $scope.mycourses["Fri"][e.eu.split(":")[0]] = [];
      $scope.mycourses["Sat"][e.eu.split(":")[0]] = [];
    });
  };

  $scope.resetMyCourses();


  // $scope.sortClasses = function() {
  //   $scope.classes.forEach(function(e, i, t) {
  //     e.added = false;
  //     e.time.forEach(function(ee, ii, tt) {
  //       e.height = 60 * $scope.getDuration(ee.start, ee.end);
  //       e.top = ee.start.split(":")[1];
  //       $scope.courses[ee.day][ee.start.split(":")[0]].push(e);
  //     });
  //   });
  // }

  $scope.getDuration = function(start, end) {
    var d = new Date("October 13, 2014 " + end + ":00") - new Date("October 13, 2014 " + start + ":00");
    return ((d / 1000) / 3600);
  }

  // $scope.convertHours = function(hoursFr) {
  //   var hours = hoursFr.split(":")[0];
  //   var hoursUS = parseInt(hours) % 12;
  //   if (hoursUS === 0) {
  //     hoursUS = 12;
  //   }
  //   return parseInt(hours) >= 12 ? hoursUS.toString() + "pm" : hoursUS.toString() + "am";
  // }

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

  $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');

  $scope.getClasses();
}]);
