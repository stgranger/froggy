angular.module('app').directive('headerNavBar', headerNavBar);

function headerNavBar() {
  return {
    restrict: 'E',
    templateUrl: 'angular-app/header/header.html'
  }
};