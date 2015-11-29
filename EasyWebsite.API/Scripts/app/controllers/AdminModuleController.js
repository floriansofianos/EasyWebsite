(function () {
    var app = angular.module("myApp");

    var adminModuleController = function ($scope, moduleTypeHelper) {

        $scope.types = moduleTypeHelper.get();

    };

    app.controller("adminModuleController", ['$scope', 'moduleTypeHelper', adminModuleController]);
}());