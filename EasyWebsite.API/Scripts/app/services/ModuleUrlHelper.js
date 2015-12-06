(function () {

    var module = angular.module("myApp");

    var moduleUrlHelper = function ($http) {

        var verify = function (url, id) {
            return $http({ method: 'GET', url: '/api/Module?url=' + url + '&id=' + id });
        };

        return {
            verify: verify
        }
    };

    module.factory("moduleUrlHelper", ['$http', moduleUrlHelper]);
}());