(function () {

    var module = angular.module("myApp");

    var permissionHelper = function ($resource) {

        var get = function (role) {
            return $resource('/api/HasRole/', { role: role }).get();
        };

        return {
            get: get
        }
    };

    module.factory("permissionHelper", permissionHelper);
}());