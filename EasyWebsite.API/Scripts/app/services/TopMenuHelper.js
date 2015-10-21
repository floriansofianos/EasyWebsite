(function () {

    var module = angular.module("app.menu");

    var topMenuHelper = function ($resource) {

        var getAll = function () {
            return $resource('/api/Module/').query();
        };

        return {
            getAll: getAll
        }
    };

    module.factory("topMenuHelper", topMenuHelper);
}());