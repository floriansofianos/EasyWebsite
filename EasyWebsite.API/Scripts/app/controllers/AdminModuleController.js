(function () {
    var app = angular.module("myApp");

    var adminModuleController = function ($scope, moduleTypeHelper, moduleHelper, $routeParams, $location) {

        $scope.types = moduleTypeHelper.get();

        $scope.modules = moduleHelper.getAll();

        if ($routeParams.id) {
            $scope.module = moduleHelper.get($routeParams.id);
            $scope.currentModuleId = $routeParams.id;
        }

        $scope.update = function (module) {
            moduleHelper.save(module);
        }

        $scope.onModuleChange = function () {
            $location.url('/admin/module/' + $scope.currentModuleId);
        }

        $scope.addNewElement = function () {
            $location.url('/admin/module/');
        }
    };

    app.controller("adminModuleController", ['$scope', 'moduleTypeHelper', 'moduleHelper', '$routeParams', '$location', adminModuleController]);
}());