(function () {

    var module = angular.module("myApp");

    var websiteFileHelper = function ($resource) {

        var getAll = function () {
            return $resource('/api/WebsiteFile/').query();
        };

        return {
            getAll: getAll
        }
    };

    module.factory("websiteFileHelper", websiteFileHelper);
}());