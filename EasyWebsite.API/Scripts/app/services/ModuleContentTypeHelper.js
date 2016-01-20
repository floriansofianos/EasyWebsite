(function () {

    var module = angular.module("myApp");

    var moduleContentTypeHelper = function ($resource) {

        var get = function () {
            return $resource('/api/ModuleContentType/').query();
        };

        return {
            get: get
        }
    };

    module.factory("moduleContentTypeHelper", moduleContentTypeHelper);
}());