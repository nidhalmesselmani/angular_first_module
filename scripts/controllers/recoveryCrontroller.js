'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
    .controller('recoveryController', function($scope,$http,$rootScope) {

   // a function to reset the password, here the user submit his email
 $scope.reset_password = function () {
   

     $http({
         method: 'POST',
         url: 'http://localhost/Lumen_API/public/recovery',
         //pass the email as a parameter
         data: $.param({email : $scope.credentials.email }),

         headers: {'Content-Type': 'application/x-www-form-urlencoded'}
     }).then(function (response) {
             console.log(response);
             alert(response.data);


         }
     );
 }
    });