(function () {

    var module = angular.module("myApp");

    var moduleHelper = function ($resource) {

        var getAll = function () {
            return $resource('/api/Module/').query();
        };

        var getAllStatic = function () {
            return $resource('/api/Module?staticType=true').query();
        };

        var get = function (id) {
            return $resource('/api/Module/' + id).get();
        };

        var getHomeModule = function () {
            return $resource('/api/HomePage/').get();
        };

        var save = function (module) {
            var query = $resource('/api/Module/').save(module);
            query.$promise.then(function () { alert('Successful save!') });
        };

        var getByUrl = function (url) {
            return $resource('/api/Module/', { url: url }).get();
        };


        return {
            getAll: getAll,
            getAllStatic: getAllStatic,
            save: save,
            get: get,
            getByUrl: getByUrl,
            getHomeModule: getHomeModule
        }
    };

    module.factory("moduleHelper", moduleHelper);
}());