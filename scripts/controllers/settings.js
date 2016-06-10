'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')

    .controller('settings', function($scope,$auth,$state,$window,ngDialog,$http,$rootScope,API_URL) {



//a modal will appear, so the user can change his password
        $scope.clickToOpen = function () {


            ngDialog.open({ template: 'views/modals/ChangePassword.html', className: 'ngdialog-theme-default' });



        };
// a modal will appear showing the user informations
$scope.profileopen = function () {
    ngDialog.open({ template: 'views/modals/profile.html', className: 'ngdialog-theme-default' });


}
        //a function to submit the password and new password to the backend, and the backend will check if the password correct or not
        // if it is correct, it will change to the new password

        $scope.submit = function () {
            $http({
                method: 'POST',
                url: API_URL+'change',
                //pass the password,the new password and the user id as paramaters
                data: $.param({password : $scope.password, new_password : $scope.new_password, id: $rootScope.currentUser.id }),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function(response) {
                console.log(response);
                alert(response);
            }).error(function(response) {
                console.log(response);
            });
        }
    });