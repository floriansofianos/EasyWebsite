(function () {

    var module = angular.module("myApp");

    var moduleHelper = function ($resource) {

        var getAll = function () {
            return $resource('/api/Module/').query();
        };

        return {
            getAll: getAll
        }
    };

    module.factory("moduleHelper", moduleHelper);
}());