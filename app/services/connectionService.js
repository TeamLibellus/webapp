libellus.factory('AuthenticationService', ['$http', '$cookieStore', '$rootScope', '$location',
    function ($http, $cookieStore, $rootScope, $location) {

      var service = {};

      var baseUrl = "http://192.168.1.154:8080/";

        service.Login = function (username, password, success, failure) {
          /* HASH LE MDP */
          $http.post(baseUrl + 'login', {email:username, hash:password}).
            then(function(response) {
              service.SetCredentials(username);
              success(response.data);
            }, function(response) {
              failure(response.data);
          });
        };

        service.Logout = function() {
          user = service.GetUser()
          $http.post(baseUrl + 'logout').
            then(function(response) {
              service.ClearCredentials()
              $location.path('/');
            }, function(response) {
          });
        };

        service.isLog = function (success, failure) {
            $http.get(baseUrl + 'checklogin').
              then(function(response) {
                success();
              }, function(response) {
                failure();
              });
        };

        service.GetUser = function () {
          var cook = $cookieStore.get("globals")
          var user;
          if (cook) {
            return cook.currentUser.username;
          }
        }

        service.SetCredentials = function (username) {
            $rootScope.globals = {
                currentUser: {
                    username: username
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
