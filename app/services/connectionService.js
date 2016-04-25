libellus.factory('AuthenticationService', ['$http', '$rootScope', '$location', '$cookies',
    function ($http, $rootScope, $location, $cookies) {

      var service = {};

      var baseUrl = "http://192.168.1.154:8080/";

      service.Register = function (username, email, password, success, failure) {
        $http.post(baseUrl + 'users', {username:username, email:email, password:password}).
          then(function(response) {
            success(response.data);
          }, function(response) {
            failure(response.data);
        });
      };

      service.Login = function (email, password, success, failure) {
        $http.post(baseUrl + 'auth/local', {email:email, password:password}).
          then(function(response) {
            service.SetCredentials(response.data.authToken);
            success(response.data);
          }, function(response) {
            failure(response.data);
        });
      };

        service.Logout = function() {
          service.ClearCredentials();
          // user = service.GetUser();
          // $http.post(baseUrl + 'auth/logout').
          //   then(function(response) {
          //     service.ClearCredentials();
          //     $location.path('/');
          //   }, function(response) {
          // });
        };

        service.isLog = function (success, failure) {
            $http.get(baseUrl + 'users/me').
              then(function(response) {
                success(response);
              }, function(response) {
                failure(response);
              });
        };

        service.GetUser = function () {
          var token = $cookies.getObject("globals");
          return token;
        }

        service.SetCredentials = function (token) {
          console.log("Setting Cookie" + token);
            $cookies.putObject('globals', token);
        };

        service.ClearCredentials = function () {
            $cookies.remove('globals');
        };

        return service;
    }])
