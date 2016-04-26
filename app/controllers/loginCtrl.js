libellus.controller('loginController', ['$scope', '$mdDialog', 'AuthenticationService', function($scope, $mdDialog, AuthenticationService) {

  $scope.switchButtonMsg = "Create account";
  $scope.validationButtonMsg = "Login";

  $scope.AuthenticationService = AuthenticationService;

  $scope.account = {
    creating: false,
    username: "",
    password: "",
    confirm: "",
    email: ""
  }

  $scope.switchCreateLogin = function(){
    $scope.account.creating = !$scope.account.creating;
    $scope.switchButtonMsg = $scope.account.creating ? "Just login" : "Create account";
    $scope.validationButtonMsg = $scope.account.creating ? "Create account" : "Login";
   }

   $scope.createAccount = function(){
     console.log($scope.account);
     if ($scope.account.password != $scope.account.confirm)
     {
       alert("Your passwords need to correspond.");
       return;
     }
     AuthenticationService.Register($scope.account.username, $scope.account.email, $scope.account.password,
       function(res){
         console.log(res);
       },
       function(res){
         console.log(res);
       });
   }

   $scope.login = function(){
     AuthenticationService.Login($scope.account.email, $scope.account.password,
       function(res){
         console.log(res);
       },
       function(res){
         console.log(res);
       });
   }

   $scope.submitForm = function() {
     console.log($scope.account.creating);
     if ($scope.account.creating)
       $scope.createAccount();
     else
      $scope.login();
   }

  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.closeDialog = function(){
    $mdDialog.cancel();
  }
  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
}]);
