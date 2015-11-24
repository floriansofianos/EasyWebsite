(function () {

    var module = angular.module("myApp");

    var moduleUrlHelper = function ($http) {

        var verify = function (url) {
            $http.get({ url: '/module', data: { url: url } }).then(function (data) {
                return data;
            })
        };

        return {
            verify: verify
        }
    };

    module.factory("moduleUrlHelper", ['$http', moduleUrlHelper]);
}());