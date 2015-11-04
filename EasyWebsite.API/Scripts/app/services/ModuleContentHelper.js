(function () {

    var module = angular.module("myApp");

    var moduleContentHelper = function ($resource) {

        var getElements = function (moduleId) {
            return $resource('/api/ModuleContent/' + moduleId).query();
        };

        var saveElements = function (moduleId, elements) {
            return $resource('/api/ModuleContent/' + moduleId).save(elements);
        }

        return {
            getElements: getElements,
            saveElements: saveElements,
        }
    };

    module.factory("moduleContentHelper", moduleContentHelper);
}());