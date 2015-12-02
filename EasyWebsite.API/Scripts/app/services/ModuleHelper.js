(function () {

    var module = angular.module("myApp");

    var moduleHelper = function ($resource) {

        var getAll = function () {
            return $resource('/api/Module/').query();
        };

        var save = function (module) {
            return $resource('/api/Module/').save(module);
        };

        return {
            getAll: getAll,
            save: save
        }
    };

    module.factory("moduleHelper", moduleHelper);
}());