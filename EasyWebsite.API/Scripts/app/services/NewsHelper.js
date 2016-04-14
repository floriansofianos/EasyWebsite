(function () {

    var module = angular.module("myApp");

    var newsHelper = function ($resource) {

        var get = function (moduleId) {
            return $resource('/api/News/' + moduleId).query();
        };

        var getSingleNews = function (moduleId, newsId) {
            return $resource('/api/News/' + moduleId, { newsId: newsId }).get();
        }

        var save = function (news) {
            var query = $resource('/api/News/').save(news);
            return query.$promise;
        };

        return {
            get: get,
            save: save,
            getSingleNews: getSingleNews
        }
    };

    module.factory("newsHelper", newsHelper);
}());