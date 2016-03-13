libellus.factory('ClassesService', function () {
      var service = {};

      service.days = [{
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

      service.hours = [{
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


      service.resetMyCourses = function() {
        service.mycourses = {
          "Mon": {},
          "Tue": {},
          "Wed": {},
          "Thu": {},
          "Fri": {},
          "Sat": {},
        };
        service.hours.forEach(function(e, i, t) {
          service.mycourses["Mon"][e.eu.split(":")[0]] = [];
          service.mycourses["Tue"][e.eu.split(":")[0]] = [];
          service.mycourses["Wed"][e.eu.split(":")[0]] = [];
          service.mycourses["Thu"][e.eu.split(":")[0]] = [];
          service.mycourses["Fri"][e.eu.split(":")[0]] = [];
          service.mycourses["Sat"][e.eu.split(":")[0]] = [];
        });
      };

      service.resetMyCourses();


      return service;
});
