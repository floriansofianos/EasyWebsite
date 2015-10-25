(function () {
    var myApp = angular.module('myApp', ['ngRoute', 'ngResource', 'pascalprecht.translate', 'ngSanitize', 'LocalStorageModule', 'app.menu', 'app.dashboard']);

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
                  when('/admin-content', {
                      templateUrl: 'templates/admin-content.html',
                      controller: 'adminContentController'
                  }).
                  when('/login', {
                      templateUrl: 'templates/login.html',
                      controller: 'loginPage'
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