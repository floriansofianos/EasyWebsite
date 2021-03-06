﻿(function () {
    var myApp = angular.module('myApp', ['ngRoute', 'ngResource', 'pascalprecht.translate', 'ngSanitize', 'LocalStorageModule', 'app.menu', 'app.dashboard', 'colorpicker.module', 'ngFileUpload', 'app.image.picker', 'uiGmapgoogle-maps', 'ui.select', 'app.settings', 'tmh.dynamicLocale', 'ngAnimate', 'app.spinner']);

    // Routing configuration
    myApp.config(['$routeProvider', '$locationProvider',
          function ($routeProvider, $locationProvider) {
              $routeProvider.
                when('/', {
                    templateUrl: 'templates/home.html',
                    controller: 'homePage',
                    animation: 'left-animation'
                }).
                  when('/admin/home', {
                      templateUrl: 'templates/admin.html',
                      controller: 'adminPage',
                      animation: 'left-animation'
                  }).
                  when('/admin/module-content', {
                      templateUrl: 'templates/admin-content.html',
                      controller: 'adminContentController',
                      animation: 'left-animation'
                  }).
                  when('/admin/module-content/:id', {
                      templateUrl: 'templates/admin-content.html',
                      controller: 'adminContentController',
                      animation: 'left-animation'
                  }).
                  when('/login', {
                      templateUrl: 'templates/login.html',
                      controller: 'loginPage',
                      animation: 'left-animation'
                  }).
                  when('/admin/module', {
                      templateUrl: 'templates/admin-module.html',
                      controller: 'adminModuleController',
                      animation: 'left-animation'
                  }).
                  when('/admin/module/:id', {
                      templateUrl: 'templates/admin-module.html',
                      controller: 'adminModuleController',
                      animation: 'left-animation'
                  }).
                 when('/error', { templateUrl: '/templates/error.html', controller: 'errorController' }).
                otherwise({
                    templateUrl: 'templates/content.html',
                    controller: 'contentController',
                    animation: 'left-animation'
                });

              // Use HTML5 URLs
              $locationProvider.html5Mode(true);
          }]);

    // Translation configuration
    myApp.config(['$translateProvider', 'settingsProvider',
        function ($translateProvider, $resource) {
            $translateProvider.useUrlLoader('/api/translation');
            $translateProvider.determinePreferredLanguage();
            $translateProvider.useSanitizeValueStrategy('escape');
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

    myApp.run(['$translate', 'settings', 'languageHelper', '$rootScope', 'tmhDynamicLocale', function ($translate, settings, languageHelper, $rootScope, tmhDynamicLocale) {
        // Just making sure that the preferred language is correct
        var availableLanguages = settings.getAvailableLanguages();
        availableLanguages.$promise.then(function () {
            if (availableLanguages && availableLanguages.value.indexOf($translate.use()) == -1) {
                // Case where we don't have this language in the available languages. Default to english if available.
                if (availableLanguages.value.indexOf('en') > -1) {
                    $translate.use('en');
                    languageHelper.setCurrentLanguage('en_AU');
                    tmhDynamicLocale.set('en_AU');
                }
                else {
                    // Epic fail, just use the first language available
                    $translate.use(availableLanguages.value.split('|')[0]);
                    languageHelper.setCurrentLanguage(availableLanguages.value.split('|')[0]);
                    tmhDynamicLocale.set(availableLanguages.value.split('|')[0]);
                }
            }
            else {
                languageHelper.setCurrentLanguage($translate.use());
                tmhDynamicLocale.set($translate.use());
            }
            $rootScope.languageLoaded = true;
        });
    }]);

    myApp.run(function ($rootScope, $location, authService, permissionHelper) {
        var urlWithAdminPermission = "/admin";

        var verifyPermissions = function () {
            // Verifies that we do not try to access an admin page with user credentials
            if ($location.url().indexOf(urlWithAdminPermission) > -1) {
                var accessPromise = permissionHelper.get('ROLE_ADMINISTRATOR');
                accessPromise.$promise.then(function () {
                    if (!accessPromise.access) {
                        // redirect back to login
                        var urlToRedirect = $location.url();
                        $location.path('/login').search({ redirect: urlToRedirect });
                    }
                });
            };
        };

        $rootScope.$on('$routeChangeStart', function (event, next, current) {

            $rootScope.animation = next.animation;

            // Authenticate the user if not already the case
            var isAuthenticatedPromise = authService.isAuthenticated();

            isAuthenticatedPromise.$promise.then(function () {
                if (!isAuthenticatedPromise.authenticated) {
                    // maybe we just have a refresh token
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

        $rootScope.$on('$routeChangeSuccess', function (event, currentRoute) {
            switch (currentRoute.templateUrl) {
                case 'templates/login.html':
                    $rootScope.bodyClass = 'login-layout';
                    break;
                default:
                    $rootScope.bodyClass = '';
                    break;
            }
        });
    });

    // Angular Error interceptor
    myApp.config(['$provide', function ($provide) {
        $provide.decorator("$exceptionHandler", ['$delegate', '$injector', 'errorEmailHelper', function ($delegate, $injector, errorEmailHelper) {
            return function (exception, cause) {
                $delegate(exception, cause);
                var location = $injector.get('$location')
                errorEmailHelper.sendEmail('Error accessing ' + encodeURIComponent(location.url().toString()) + ' \nError: ' + encodeURIComponent(exception.stack));
                location.url('/error');
            };
        }]);
    }]);

}());