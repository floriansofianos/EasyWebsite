(function () {
    var app = angular.module("myApp");

    var adminModuleController = function ($scope, moduleTypeHelper, moduleHelper) {

        $scope.types = moduleTypeHelper.get();

        $scope.update = function (module) {
            moduleHelper.save(module);
        }

    };

    app.controller("adminModuleController", ['$scope', 'moduleTypeHelper', 'moduleHelper', adminModuleController]);
}());