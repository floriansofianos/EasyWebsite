(function () {

    var module = angular.module("myApp");

    var moduleTypeHelper = function ($resource) {

        var get = function () {
            return $resource('/api/ModuleType/').query();
        };

        return {
            get: get
        }
    };

    module.factory("moduleTypeHelper", moduleTypeHelper);
}());