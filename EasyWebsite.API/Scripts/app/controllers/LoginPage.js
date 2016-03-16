(function () {
    var app = angular.module("myApp");

    var loginPage = function ($scope,  $location, authService) {

        $scope.loginData = {
            userName: "",
            password: "",
            useRefreshTokens: false
        };

        $scope.message = "";

        $scope.login = function () {

            authService.login($scope.loginData).then(function (response) {
                var redirect = $location.search().redirect;
                if (redirect) $location.path(redirect).search({});
                else $location.path('/');

            },
             function (err) {
                 $scope.message = err.error_description;
             });
        };
    };

    app.controller("loginPage", ['$scope', '$location', 'authService', loginPage]);
}());