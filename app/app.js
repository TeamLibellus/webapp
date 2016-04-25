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
  // $cookiesProvider.$get()["globals"].currentUser.token;
//   var cook = $cookieStore.get("globals");
//   if (cook) {
//     $http.defaults.headers.common['Authorization'] = 'JWT ' + cook.currentUser.token;
//   }
}])
.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('blue')
    .accentPalette('red')
});
libellus.run(function run( $http, $cookies){
    var token = $cookies.getObject("globals");
    console.log("COOKIES");
    console.log(token);
    if (token) {
      $http.defaults.headers.common['Authorization'] = 'JWT ' + token;
    }
  // $http.defaults.headers.common["Authorization"] = $cookies["globals"].currentUser.token;
});
