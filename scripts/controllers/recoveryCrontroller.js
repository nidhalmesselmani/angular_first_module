'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
    .controller('recoveryController', function($scope,$http) {

 $scope.reset_password = function () {
     console.log($scope.credentials.email);
     $http({
         method: 'POST',
         url: 'http://localhost/Lumen_API/public/recovery',
         data: $.param({email : $scope.credentials.email }),

         headers: {'Content-Type': 'application/x-www-form-urlencoded'}
     }).then(function (response) {
             console.log(response);
             alert(response.data);


         }
     );
 }
    });