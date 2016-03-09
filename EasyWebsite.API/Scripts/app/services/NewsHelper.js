(function () {

    var module = angular.module("myApp");

    var newsHelper = function ($resource) {

        var get = function (moduleId) {
            return $resource('/api/News/' + moduleId).query();
        };

        return {
            get: get
        }
    };

    module.factory("newsHelper", newsHelper);
}());