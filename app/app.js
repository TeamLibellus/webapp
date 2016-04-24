libellus = angular.module('libellus', ['ngRoute', 'ngMaterial', 'ngMessages', 'ngAnimate', 'ngAria', 'ngCookies']);

libellus.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/', {
      templateUrl: 'app/partials/home.html',
      controller: 'homeController'
    }).
    otherwise({
      redirectTo: '/'
    });
  }
])
.config(['$locationProvider', function($locationProvider) {
  $locationProvider.html5Mode({enabled: true, requireBase: false}).hashPrefix('!');
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
