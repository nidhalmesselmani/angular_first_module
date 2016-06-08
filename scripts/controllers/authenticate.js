'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
    .controller('authenticateCtrl', function($scope,$auth,$state,$window) {

        $auth.logout();
        $scope.login = function () {
       console.log($scope.credentials)
       $auth.login($scope.credentials).then(function () {
         $state.go('dashboard.home');
        //   $state.reload();
       
       });
   }
    });