(function () {

    var module = angular.module("myApp");

    var userHelper = function ($resource) {

        var get = function (username) {
            return $resource('/api/User/' + username).get();
        };

        return {
            get: get
        }
    };

    module.factory("userHelper", userHelper);
}());