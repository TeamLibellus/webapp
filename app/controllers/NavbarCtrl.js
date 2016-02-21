libellus.controller('NavbarCtrl', ['$scope', '$mdSidenav', '$log', function($scope, $mdSidenav, $log) {

  $scope.closeNavbar = function() {
    $mdSidenav('navbar').close()
    .then(function () {
      $log.debug("close navbar is done");
    });
  }

}]);
