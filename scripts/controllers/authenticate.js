'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
    .controller('authenticateCtrl', function($scope,$auth,$state,$window,$http,$rootScope) {

      //funtion that uses sattelizer materials to authenticated ($auth).
        $scope.login = function () {
    //submit the credentials to the backend using sattelizer, basically what heppens when the user authenticated
            //sattelizer will store the token into localstorage so he can append to every next http call
       $auth.login($scope.credentials).then(function () {
           //get the authenticated user information
           $http.get('http://localhost/Lumen_API/public/authuser').success(function(response){
            //converts the user credentials to JSON string
              var user = JSON.stringify(response.user);
               //store the user credentials into localstorage
               localStorage.setItem('user', user);
               //affect the user credentials to the $rootscope.currentUser, $rootScope is the father of the all the $scope
               // so basically we are storing the user credentials into angular global variable
               $rootScope.currentUser = response.user;
               //finally we access the dahsboard
               $state.go('dashboard.home');
           }).error(function(error){
              console.log(error);
           });
           
       
       });
   }
    });