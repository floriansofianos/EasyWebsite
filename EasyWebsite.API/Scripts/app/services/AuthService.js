(function () {
    var app = angular.module("myApp");

    var authService = function ($http, $q, localStorageService, $resource) {

        var _authentication = {
            isAuth: false,
            userName: "",
            useRefreshTokens: false
        };

        var _login = function (loginData) {

            var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;

            if (loginData.useRefreshTokens) {
                data = data + "&client_id=ngAuthApp";
            }

            var deferred = $q.defer();

            $http.post('/token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                if (loginData.useRefreshTokens) {
                    localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName, refreshToken: response.refresh_token, useRefreshTokens: true });
                }
                else {
                    localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName, refreshToken: "", useRefreshTokens: false });
                }
                _authentication.isAuth = true;
                _authentication.userName = loginData.userName;
                _authentication.useRefreshTokens = loginData.useRefreshTokens;

                deferred.resolve(response);

            }).error(function (err, status) {
                _logOut();
                deferred.reject(err);
            });

            return deferred.promise;

        };

        var _logOut = function () {

            localStorageService.remove('authorizationData');

            _authentication.isAuth = false;
            _authentication.userName = "";
            _authentication.useRefreshTokens = false;

        };

        var _fillAuthData = function () {

            var authData = localStorageService.get('authorizationData');
            if (authData) {
                _authentication.isAuth = true;
                _authentication.userName = authData.userName;
                _authentication.useRefreshTokens = authData.useRefreshTokens;
            }

        };

        var _refreshToken = function () {
            var deferred = $q.defer();

            var authData = localStorageService.get('authorizationData');

            if (authData && authData.useRefreshTokens) {

                var data = "grant_type=refresh_token&refresh_token=" + authData.refreshToken + "&client_id=ngAuthApp";

                localStorageService.remove('authorizationData');

                $http = $http || $injector.get('$http');
                $http.post('/token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                    localStorageService.set('authorizationData', { token: response.access_token, userName: response.userName, refreshToken: response.refresh_token, useRefreshTokens: true });

                    deferred.resolve(response);

                }).error(function (err, status) {
                    _logOut();
                    deferred.reject(err);
                });
            } else {
                deferred.reject();
            }

            return deferred.promise;
        };

        var isAuthenticated = function () {
            return $resource('/api/IsAuthenticated/').get();
        }

        return {
            login: _login,
            authentication: _authentication,
            fillAuthData: _fillAuthData,
            logOut: _logOut,
            refreshToken: _refreshToken,
            isAuthenticated: isAuthenticated
        };
    };

    app.factory('authService', ['$http', '$q', 'localStorageService', '$resource', authService]);
}());