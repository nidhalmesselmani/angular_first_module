'use strict';
/**
 * @ngdoc overview
 * @name sbAdminApp
 * @description
 * # sbAdminApp
 *
 * Main module of the application.
 */
 var app = angular
  .module('sbAdminApp', [
    'oc.lazyLoad',
    'ui.router',
    'ui.bootstrap',
    'angular-loading-bar',
      'satellizer',
      'ngDialog'
  ])
  .config(['$stateProvider','$urlRouterProvider','$ocLazyLoadProvider','$authProvider',function ($stateProvider,$urlRouterProvider,$ocLazyLoadProvider,$authProvider) {
      $authProvider.loginUrl = 'http://localhost/Lumen_API/public/auth/login';
    $ocLazyLoadProvider.config({
      debug:false,
      events:true,
    });

    $urlRouterProvider.otherwise('/login');

//the states (the routes)
    $stateProvider
      .state('dashboard', {
        url:'/dashboard',
        templateUrl: 'views/dashboard/main.html',
         authenticate : true ,
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'sbAdminApp',
                    files:[
                    'scripts/directives/header/header.js',
                    'scripts/directives/header/header-notification/header-notification.js',
                    'scripts/directives/sidebar/sidebar.js',
                    'scripts/directives/sidebar/sidebar-search/sidebar-search.js'
                    ]
                }),
                $ocLazyLoad.load(
                {
                   name:'toggle-switch',
                   files:["bower_components/angular-toggle-switch/angular-toggle-switch.min.js",
                          "bower_components/angular-toggle-switch/angular-toggle-switch.css"
                      ]
                }),
                $ocLazyLoad.load(
                {
                  name:'ngAnimate',
                  files:['bower_components/angular-animate/angular-animate.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngCookies',
                  files:['bower_components/angular-cookies/angular-cookies.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngResource',
                  files:['bower_components/angular-resource/angular-resource.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngSanitize',
                  files:['bower_components/angular-sanitize/angular-sanitize.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngTouch',
                  files:['bower_components/angular-touch/angular-touch.js']
                })
            }
        }
    })
      .state('dashboard.home',{
        url:'/home',
        controller: 'MainCtrl',
        templateUrl:'views/dashboard/home.html',
          authenticate : true ,
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
              'scripts/controllers/main.js',
              'scripts/directives/timeline/timeline.js',
              'scripts/directives/notifications/notifications.js',
              'scripts/directives/chat/chat.js',
              'scripts/directives/dashboard/stats/stats.js'
              ]
            })
          }
        }
      })
      .state('dashboard.form',{
        templateUrl:'views/form.html',
        url:'/form',
          authenticate : true
    })
      .state('dashboard.blank',{
        templateUrl:'views/pages/blank.html',
        url:'/blank',
        authenticate : true
      })
      .state('login',{
        templateUrl:'views/pages/login.html',
        url:'/login',
          authenticate: false

    })
      .state('dashboard.chart',{
        templateUrl:'views/chart.html',
        url:'/chart',
        controller:'ChartCtrl',
          authenticate : true,
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'chart.js',
              files:[
                'bower_components/angular-chart.js/dist/angular-chart.min.js',
                'bower_components/angular-chart.js/dist/angular-chart.css'
              ]
            }),
            $ocLazyLoad.load({
                name:'sbAdminApp',
                files:['scripts/controllers/chartContoller.js']
            })
          }
        }
    })
      .state('dashboard.table',{
        templateUrl:'views/table.html',
        url:'/table',
          authenticate : true
    })
      .state('dashboard.panels-wells',{
          templateUrl:'views/ui-elements/panels-wells.html',
          url:'/panels-wells',
          authenticate : true
      })
      .state('dashboard.buttons',{
        templateUrl:'views/ui-elements/buttons.html',
        url:'/buttons',
          authenticate : true
    })
      .state('dashboard.notifications',{
        templateUrl:'views/ui-elements/notifications.html',
        url:'/notifications',
          authenticate : true
    })
      .state('dashboard.typography',{
       templateUrl:'views/ui-elements/typography.html',
       url:'/typography',
          authenticate : true
   })
      .state('dashboard.icons',{
       templateUrl:'views/ui-elements/icons.html',
       url:'/icons',
          authenticate : true
   })
      .state('dashboard.grid',{
       templateUrl:'views/ui-elements/grid.html',
       url:'/grid',
          authenticate : true
   }).state('recovery',{

        templateUrl:'views/pages/recovery.html',
        url:'/recovery',
        authenticated : false,
        controller : 'recoveryController'
    })
  }]);





app.run(function ($rootScope, $state,$location,$auth ) {
    //for every state change this will trigger
     $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
//if the state destination has authenticated as true and the user is authenticated by satttelizer ($auth)
         if($auth.isAuthenticated() && toState.authenticate== true ){

         }else {
             //if one of the condition is false he will be just redirected to the login page
             $location.path('/login');
         }


     });
//a global function that triggers everytime the user press log out
    $rootScope.logout = function() {
        //uses satellizer materials to logout ($auth), so the sattelizer token will vanish and the user will be successfully logout
        $auth.logout().then(function() {
            //remover the user credentials from localstorage
            localStorage.removeItem('user');
            //affect null to the global variable $rootscope.currentUser
            $rootScope.currentUser = null;
            //finally go the login page
            $state.go('login');
        });
    }
    $rootScope.currentUser = JSON.parse(localStorage.getItem('user'));

 });

