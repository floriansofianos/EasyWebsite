(function () {
    var myApp = angular.module('myApp', ['ngRoute', 'pascalprecht.translate', 'ngSanitize']);

    // Routing configuration
    myApp.config(['$routeProvider', '$locationProvider',
          function ($routeProvider, $locationProvider) {
              $routeProvider.
                when('/', {
                    templateUrl: 'templates/home.html',
                    controller: 'homePage'
                }).
                otherwise({
                    redirectTo: '/'
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

    }());