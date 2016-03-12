(function () {

    var module = angular.module("myApp");

    var settingsHelper = function ($resource) {

        var get = function () {
            return $resource('/api/SiteSettings/').query();
        };

        var save = function (settings) {
            var query = $resource('/api/SiteSettings/').save(settings);
            query.$promise.then(function () { alert('Successful save!') });
        }

        return {
            get: get,
            save: save
        }
    };

    module.factory("settingsHelper", settingsHelper);
}());