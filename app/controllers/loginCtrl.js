function loginController($scope, $mdDialog) {

  $scope.switchButtonMsg = "Create account";
  $scope.validationButtonMsg = "Login";

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

   $scope.submitForm = function() {
     console.log($scope.account.creating);
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
}
