(function () {
    var myApp = angular.module('myApp', ['ngRoute', 'ngResource', 'pascalprecht.translate', 'ngSanitize', 'LocalStorageModule', 'app.menu', 'app.dashboard', 'colorpicker.module', 'ngFileUpload', 'app.image.picker']);

    // Routing configuration
    myApp.config(['$routeProvider', '$locationProvider',
          function ($routeProvider, $locationProvider) {
              $routeProvider.
                when('/', {
                    templateUrl: 'templates/home.html',
                    controller: 'homePage'
                }).
                  when('/admin', {
                      templateUrl: 'templates/admin.html',
                      controller: 'adminPage'
                  }).
                  when('/admin/module-content', {
                      templateUrl: 'templates/admin-content.html',
                      controller: 'adminContentController'
                  }).
                  when('/admin/module-content/:id', {
                      templateUrl: 'templates/admin-content.html',
                      controller: 'adminContentController'
                  }).
                  when('/login', {
                      templateUrl: 'templates/login.html',
                      controller: 'loginPage'
                  }).
                  when('/admin/module', {
                      templateUrl: 'templates/admin-module.html',
                      controller: 'adminModuleController'
                  }).
                  when('/admin/module/:id', {
                      templateUrl: 'templates/admin-module.html',
                      controller: 'adminModuleController'
                  }).
                otherwise({
                    templateUrl: 'templates/content.html',
                    controller: 'contentController'
                });

              // Use HTML5 URLs
              $locationProvider.html5Mode(true);
          }]);

    // Translation configuration
    myApp.config(['$translateProvider',
        function ($translateProvider) {
            $translateProvider.useUrlLoader('/api/translation');
            $translateProvider.preferredLanguage(window.navigator.language);
            $translateProvider.useSanitizeValueStrategy('sanitize');
        }]);

    myApp.config(function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptorService');
    });

    myApp.run(['authService', function (authService) {
        authService.fillAuthData();
    }]);

}());