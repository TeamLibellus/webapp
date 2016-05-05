
libellus = angular.module('libellus', ['ngRoute', 'ngMaterial', 'ngMessages', 'ngAnimate', 'ngAria', 'ngCookies', 'angular-web-notification']);

libellus.config(['$routeProvider',
function($routeProvider) {
  $routeProvider.
  when('/', {
    templateUrl: 'app/partials/home.html',
    controller: 'homeController'
  }).
  when('/calendar/:id', {
    templateUrl: 'app/partials/calendar.html',
    controller: 'calendarController'
  }).
  otherwise({
    redirectTo: '/'
  });
}
])
.config(['$locationProvider', function($locationProvider) {
  // $locationProvider.html5Mode({enabled: true, requireBase: false}).hashPrefix('!');
}])
.config(['$httpProvider', function($httpProvider) {
  $httpProvider.defaults.useXDomain = true;
  $httpProvider.defaults.headers['Content-Type'] = 'application/json';
}])
.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
  .primaryPalette('blue')
  .accentPalette('red')
});
libellus.run(function run( $http, $cookies){
  var token = $cookies.getObject("globals");
  if (token) {
    $http.defaults.headers.common['Authorization'] = 'JWT ' + token;
  }
});
libellus.directive('ngConfirmClick', [
  function(){
    return {
      link: function (scope, element, attr) {
        var msg = attr.ngConfirmClick || "Are you sure?";
        var clickAction = attr.confirmedClick;
        element.bind('click',function (event) {
          if ( window.confirm(msg) ) {
            scope.$eval(clickAction)
          }
        });
      }
    };
  }]);
