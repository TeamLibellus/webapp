libellus.controller('homeController', ['$scope', '$mdDialog', '$http', '$mdSidenav', '$log', '$mdMedia', 'ClassesService', function($scope, $mdDialog, $http, $mdSidenav, $log, $mdMedia, ClassesService) {

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

  $scope.ClassesService = ClassesService;

  $scope.filterData = {
    selectedTerm: 1,
    selectedSubject: 1,
    levels: [
      {value: 100, active: true},
      {value: 200, active: true},
      {value: 300, active: true},
      {value: 400, active: true},
      {value: 500, active: true},
      {value: 600, active: true}
    ],
    minimumSeats: 1,
    rowHeight: 40,
    selectedClassesOnly: false,
    classConflicts: true,
  };

  $scope.openNavbar = function() {
    $mdSidenav('navbar').open();
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
      $scope.resetCourses();
      $scope.classes = response.data;
      console.log($scope.classes);
      $scope.sortClasses();
    }, function errorCallback(response) {
      console.log(response);
    });
  }

  $scope.timeToMargin = function() {

  }

  $scope.resetCourses = function() {
    $scope.courses = {
      "Mon": {},
      "Tue": {},
      "Wed": {},
      "Thu": {},
      "Fri": {},
      "Sat": {},
    };
    $scope.hours.forEach(function(e, i, t) {
      $scope.courses["Mon"][e.eu.split(":")[0]] = [];
      $scope.courses["Tue"][e.eu.split(":")[0]] = [];
      $scope.courses["Wed"][e.eu.split(":")[0]] = [];
      $scope.courses["Thu"][e.eu.split(":")[0]] = [];
      $scope.courses["Fri"][e.eu.split(":")[0]] = [];
      $scope.courses["Sat"][e.eu.split(":")[0]] = [];
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


  $scope.sortClasses = function() {
    $scope.classes.forEach(function(e, i, t) {
      e.added = false;
      e.time.forEach(function(ee, ii, tt) {
        e.height = 60 * $scope.getDuration(ee.start, ee.end);
        e.top = ee.start.split(":")[1];
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

  $scope.updateSubjects = function() {
    console.log("coucou");
    $scope.filterData.selectedSubject = 0;
    $scope.classes = [];
    $scope.courses = [];
    $scope.getSubjects($scope.filterData.selectedTerm);
  }

  $scope.updateClasses = function() {
    $scope.classes = [];
    $scope.getClasses($scope.filterData.selectedSubject);
  }

  $scope.logAll = function() {
    console.log("-------------");
    console.log($scope.filterData.levels);
  }


  $scope.showAdvanced = function(ev, c, par) {
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;



    $mdDialog.show({
      controller: function($scope, ClassesService) {
        $scope.c = c;

        $scope.removeCourse = function(c) {
          c.added = false;
          c.time.forEach(function(e, k, v) {
            ClassesService.mycourses[c.time[k].day][c.time[k].start.split(":")[0]].forEach(function(element, key, value) {
              if (element.description == c.description) {
                ClassesService.mycourses[c.time[k].day][c.time[k].start.split(":")[0]].splice(key, 1);
              }
            });
          });


        }

        $scope.addCourse = function() {
          c.time.forEach(function(e, k, v) {
            c.added = true;
            ClassesService.mycourses[c.time[k].day][c.time[k].start.split(":")[0]].push(c);
          });
        }

      },
      templateUrl: './app/partials/dialogCourse.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
      fullscreen: useFullScreen
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });



    $scope.$watch(function() {
      return $mdMedia('xs') || $mdMedia('sm');
    }, function(wantsFullScreen) {
      $scope.customFullscreen = (wantsFullScreen === true);
    });

  };

  $scope.levelFilter = function(course){
    return ($scope.filterData.levels[Math.floor(parseInt(course.code) / 100) - 1].active);
  }

  $scope.seatsFilter = function(course){
    return (course.capacity - course.enrollment >= $scope.filterData.minimumSeats);
  }

    $scope.showLoginDialog = function(ev) {
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    $mdDialog.show({
      controller: loginController,
      templateUrl: '/app/partials/dialogLoginRegister.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: useFullScreen
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
    $scope.$watch(function() {
      return $mdMedia('xs') || $mdMedia('sm');
    }, function(wantsFullScreen) {
      $scope.customFullscreen = (wantsFullScreen === true);
    });
  };

    $scope.getTerms();
    $scope.resetCourses();
    if ($scope.filterData.selectedTerm != 0) {
      $scope.getSubjects($scope.filterData.selectedTerm);
      $scope.updateClasses();
    }

  $scope.getTerms();
  $scope.resetCourses();
  if ($scope.filterData.selectedTerm != 0) {
    $scope.getSubjects($scope.filterData.selectedTerm);
    $scope.updateClasses();
  }

  // $scope.tmp_course = $scope.courses;
  $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
}]);
