
libellus.controller('homeController', ['$scope', '$mdDialog', '$http', '$mdSidenav', '$log', '$mdMedia', 'ClassesService', 'webNotification', 'AuthenticationService',function($scope, $mdDialog, $http, $mdSidenav, $log, $mdMedia, ClassesService, webNotification, AuthenticationService) {

  $scope.baseURL = "http://libellus.corteks.org";

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

  $scope.ClassesService = ClassesService;
  $scope.AuthenticationService = AuthenticationService;

  $scope.logged;
  $scope.AuthenticationService.isLog(function(res){
    $scope.logged = true;
    console.log("Loggé !");
  },
  function(res){
    console.log("Non Loggé !");
    $scope.logged = false;
  })

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
      url: $scope.baseURL+'/terms'
    }).then(function successCallback(response) {
      $scope.terms = response.data;
    }, function errorCallback(response) {
    });
  }

  $scope.getSubjects = function(term) {
    $http({
      method: 'GET',
      url: $scope.baseURL+'/subjects'
    }).then(function successCallback(response) {
      $scope.subjects = response.data;
    }, function errorCallback(response) {
    });
  }

  $scope.notif = function (name, message, time) {
    setTimeout(function () {
      webNotification.showNotification(name, {
        body: message,
        icon: '../../bower_components/HTML5-Desktop-Notifications/alert.ico',
        onClick: function onNotificationClicked() {
          window.alert('Notification clicked.');
        },
        autoClose: 4000 //auto close the notification after 2 seconds (you manually close it via hide function)
      }, function onShow(error, hide) {
        if (error) {
          window.alert('Unable to show notification: ' + error.message);
        } else {
          console.log('Notification Shown.');

          setTimeout(function hideNotification() {
            console.log('Hiding notification....');
            hide(); //manually close the notification (or let the autoClose close it)
          }, 5000);
        }
      })
    }, time);

  }

  $scope.getNextWeekDay = function(day) {
    // var d = new Date(Date.now());
    var d = Date.now();
    var diff = d.getDate() - d.getDay() + day;
    console.log("DIFF");
    console.log(diff);
    console.log("getdate");
    console.log(d.getDate());
    console.log("getday");
    console.log(d.getDay());
    if (d.getDay() == 0)
    diff -= 7;
    diff += 7; // ugly hack to get next monday instead of current one
    return new Date(d.setDate(diff));
  };


  $scope.timeBefore = function (day) {
    var d = Date.now();
    var t = $scope.getNextWeekDay(day) - d;
    console.log(t);
    return t.getTime();
  }

  // You can then use it like this :

    // var date = new Date();
    // alert(date.getNextWeekMonday());
    // alert(date.getNextWeekFriday());

    $scope.day = {
      "Sun" : 0,
      "Mon" : 1,
      "Tue" : 2,
      "Wed" : 3,
      "Thu" : 4,
      "Fri" : 5,
      "Sat" : 6,
    }

  $scope.getClasses = function(subjectId) {
    $http({
      method: 'GET',
      url: $scope.baseURL+'/subjects/' + subjectId + '/classes'
    }).then(function successCallback(response) {
      console.log("poney");

      $scope.resetCourses();
      $scope.classes = response.data;
      $scope.sortClasses();
    }, function errorCallback(response) {

    });


    $http({
      method: 'GET',
      url: $scope.baseURL+'/users/me/classes'
    }).then(function successCallback(response) {
      console.log(response);
      response.data.forEach(function(e, i, t) {
        e.added = false;
        e.time.forEach(function(ee, ii, tt) {
          e.height = 60 * $scope.getDuration(ee.start, ee.end);
          e.top = ee.start.split(":")[1];

          var d = Date.parse("next " + ee.day);
          d.set({hour : parseInt(ee.start.split(':')[0], 10), minute : parseInt(ee.start.split(':')[1], 10)});
          var time = d.getTime() -  Date.now();
          $scope.notif(e.name, e.name, time);

          ClassesService.mycourses[ee.day][ee.start.split(":")[0]].push(e);
        });
      });
    }, function errorCallback(response) {

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
          $http.post($scope.baseURL+'/users/me/removeClass', {
            "classId" : c.id,
          });

        }

        $scope.addCourse = function() {

          c.time.forEach(function(e, k, v) {
            c.added = true;
            ClassesService.mycourses[c.time[k].day][c.time[k].start.split(":")[0]].push(c);
          });
          $http.post($scope.baseURL+'/users/me/addClass', {
            "classId" : c.id,
          });
        }

        $scope.close = function() {
          $mdDialog.hide();
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
      controller: 'loginController',
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

  // $scope.tmp_course = $scope.courses;
  $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
}]);
