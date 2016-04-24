libellus.factory('AuthenticationService', ['$http', '$rootScope', '$location',
    function ($http, $rootScope, $location) {

      var service = {};

      var baseUrl = "http://192.168.1.154:8080/";

      service.Register = function (_username, _email, _password, success, failure) {
        $http.post(baseUrl + 'users', {username:_username, email:_email, password:_password}).
          then(function(response) {
            success(response.data);
          }, function(response) {
            failure(response.data);
        });
      };

      service.Login = function (_email, _password, success, failure) {
        $http.post(baseUrl + 'auth/local', {email:_email, password:_password}).
          then(function(response) {
            service.SetCredentials(username, response.authToken);
            success(response.data);
          }, function(response) {
            failure(response.data);
        });
      };

        service.Logout = function() {
          user = service.GetUser();
          $http.post(baseUrl + 'auth/logout').
            then(function(response) {
              service.ClearCredentials();
              $location.path('/');
            }, function(response) {
          });
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
          var cook = $cookieStore.get("globals")
          if (cook) {
            return cook.currentUser;
          }
        }

        service.SetCredentials = function (username, token) {
            $rootScope.globals = {
                currentUser: {
                    username: username,
                    token: token
                }
            };
            $cookieStore.put('globals', $rootScope.globals);
        };

        service.ClearCredentials = function () {
            $rootScope.globals = {};
            $cookieStore.remove('globals');
        };

        return service;
    }])
