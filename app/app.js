libellus = angular.module('libellus', ['ngRoute', 'ngMaterial', 'ngMessages']);

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
.config(['$httpProvider', function($httpProvider) {
  $httpProvider.defaults.useXDomain = true;
  $httpProvider.defaults.headers['Content-Type'] = 'application/json';
  $httpProvider.defaults.withCredentials = true;
}])
.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('blue')
    .accentPalette('red')
});
