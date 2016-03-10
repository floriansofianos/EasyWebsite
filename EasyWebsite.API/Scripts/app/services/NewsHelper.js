(function () {

    var module = angular.module("myApp");

    var newsHelper = function ($resource) {

        var get = function (moduleId) {
            return $resource('/api/News/' + moduleId).query();
        };

        var save = function (news) {
            var query = $resource('/api/News/').save(news);
            query.$promise.then(function () { alert('Successful save!') });
        }

        return {
            get: get,
            save: save
        }
    };

    module.factory("newsHelper", newsHelper);
}());