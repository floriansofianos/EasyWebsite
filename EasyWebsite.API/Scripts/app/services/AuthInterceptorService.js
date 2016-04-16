(function () {
    var app = angular.module("myApp");

    var authInterceptorService = function ($q, $location, localStorageService, $injector) {

        var _request = function (config) {

            config.headers = config.headers || {};

            var authData = localStorageService.get('authorizationData');
            if (authData) {
                config.headers.Authorization = 'Bearer ' + authData.token;
            }

            return config;
        }

        var _responseError = function (rejection) {
            var deferred = $q.defer();
            if (rejection.status === 401) {
                var authService = $injector.get('authService');
                authService.refreshToken().then(function (response) {
                    _retryHttpRequest(rejection.config, deferred);
                }, function () {
                    authService.logOut();
                    var urlToRedirect = $location.url();
                    $location.path('/login').search({ redirect: urlToRedirect });
                    deferred.reject(rejection);
                });
            } else {
                var message = 'Error accessing ' + encodeURIComponent(rejection.config.url) + '\n'
                          + 'Status: ' + rejection.status + '\n'
                          + 'Error: ' + encodeURIComponent(rejection.statusText) + '\n';
                errorEmailHelper.sendEmail(message);
                $location.url('/error');
                deferred.reject(rejection);
            }
            return deferred.promise;
        }

        var _retryHttpRequest = function (config, deferred) {
            var $http = $http || $injector.get('$http');
            $http(config).then(function (response) {
                deferred.resolve(response);
            }, function (response) {
                deferred.reject(response);
            });
        }

        return {
            request: _request,
            responseError: _responseError,
        };
    };

    app.factory('authInterceptorService', ['$q', '$location', 'localStorageService', '$injector', authInterceptorService]);
}());