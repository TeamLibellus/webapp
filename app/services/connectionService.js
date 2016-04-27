libellus.factory('AuthenticationService', ['$http', '$rootScope', '$location', '$cookies',
    function ($http, $rootScope, $location, $cookies) {

      var service = {};

      var baseUrl = "http://libellus.michelantoine.ninja/";

      service.Register = function (username, email, password, success, failure) {
        $http.post(baseUrl + 'users', {username:username, email:email, password:password}).
          then(function(response) {
            service.SetCredentials(response.data.authToken);
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
            console.log(response);
            failure(response.data);
        });
      };

      service.setPublic = function (isPublic, success, failure) {
        $http.post(baseUrl + 'users/me/setPublic', {public:isPublic.toString()}).
          then(function(response) {
            success(response.data);
          }, function(response) {
            failure(response.data);
        });
      };

        service.Logout = function() {
          service.ClearCredentials();
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
