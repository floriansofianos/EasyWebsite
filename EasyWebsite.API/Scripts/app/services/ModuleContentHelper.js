(function () {

    var module = angular.module("myApp");

    var moduleContentHelper = function ($resource) {

        var getElements = function (moduleId) {
            return $resource('/api/ModuleContent/' + moduleId).query();
        };

        var getElementsByURL = function (url) {
            return $resource('/api/ModuleContent/', { url: url }).query();
        };

        var saveElements = function (moduleId, elements) {
            var query = $resource('/api/ModuleContent/' + moduleId).save(elements);
            query.$promise.then(function () { alert('Successful save!') });
        }

        return {
            getElements: getElements,
            getElementsByURL: getElementsByURL,
            saveElements: saveElements,
        }
    };

    module.factory("moduleContentHelper", moduleContentHelper);
}());