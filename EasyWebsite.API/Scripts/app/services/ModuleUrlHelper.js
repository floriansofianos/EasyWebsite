(function () {

    var module = angular.module("myApp");

    var moduleUrlHelper = function ($http) {

        var verify = function (url) {
            return $http({ method: 'GET', url: '/api/Module?url=' + url });
        };

        return {
            verify: verify
        }
    };

    module.factory("moduleUrlHelper", ['$http', moduleUrlHelper]);
}());