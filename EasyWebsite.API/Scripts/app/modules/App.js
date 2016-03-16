(function () {
    var myApp = angular.module('myApp', ['ngRoute', 'ngResource', 'pascalprecht.translate', 'ngSanitize', 'LocalStorageModule', 'app.menu', 'app.dashboard', 'colorpicker.module', 'ngFileUpload', 'app.image.picker', 'uiGmapgoogle-maps', 'ui.select', 'app.settings']);

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
    myApp.config(['$translateProvider', 'settingsProvider',
        function ($translateProvider, $resource) {
            $translateProvider.useUrlLoader('/api/translation');
            $translateProvider.determinePreferredLanguage();
            $translateProvider.useSanitizeValueStrategy('sanitize');
        }]);

    myApp.config(function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptorService');
    });

    myApp.config(function (uiGmapGoogleMapApiProvider) {
        uiGmapGoogleMapApiProvider.configure({
            //    key: 'your api key',
            libraries: 'weather,geometry,visualization,places'
        });
    })

    myApp.run(['authService', function (authService) {
        authService.fillAuthData();
    }]);

    myApp.run(['$translate', 'settings', 'languageHelper', function ($translate, settings, languageHelper) {
        // Just making sure that the preferred language is correct
        var availableLanguages = settings.getAvailableLanguages();
        availableLanguages.$promise.then(function () {
            if (availableLanguages && availableLanguages.value.indexOf($translate.use()) == -1) {
                // Case where we don't have this language in the available languages. Default to english if available.
                if (availableLanguages.value.indexOf('en') > -1) {
                    $translate.use('en');
                    languageHelper.setCurrentLanguage('en_AU');
                }
                else {
                    // Epic fail, just use the first language available
                    $translate.use(availableLanguages.value.split('|')[0]);
                    languageHelper.setCurrentLanguage(availableLanguages.value.split('|')[0]);
                }
            }
            else {
                languageHelper.setCurrentLanguage($translate.use());
            }

        });
    }]);

    myApp.run(function ($rootScope, $location, authService, permissionHelper) {
        var urlWithAdminPermission = "/admin";

        var verifyPermissions = function () {
            if ($location.url().indexOf(urlWithAdminPermission) > -1) {
                var accessPromise = permissionHelper.get('ROLE_ADMINISTRATOR');
                accessPromise.$promise.then(function () {
                    if (!accessPromise.access) {
                        // redirect back to login
                        $location.path('/login');
                    }
                });
            };
        };

        $rootScope.$on('$routeChangeStart', function (event, next, current) {

            // Authenticate the user if not already the case
            if (!authService.authentication.isAuth) {
                // maybe we just have a referesh token
                var refreshTokenPromise = authService.refreshToken();
            }

            if (refreshTokenPromise) {
                refreshTokenPromise.then(function () {
                    verifyPermissions();
                }, function () {
                    verifyPermissions();
                });
            }
            else verifyPermissions();
        });
    });

}());