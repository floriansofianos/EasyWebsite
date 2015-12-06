﻿(function () {

    var module = angular.module("myApp");

    var moduleHelper = function ($resource) {

        var getAll = function () {
            return $resource('/api/Module/').query();
        };

        var get = function (id) {
            return $resource('/api/Module/' + id).get();
        }

        var save = function (module) {
            var query = $resource('/api/Module/').save(module);
            query.$promise.then(function () { alert('Successful save!') });
        };

        return {
            getAll: getAll,
            save: save,
            get: get
        }
    };

    module.factory("moduleHelper", moduleHelper);
}());