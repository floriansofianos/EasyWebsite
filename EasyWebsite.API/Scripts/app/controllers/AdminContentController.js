(function () {
    var app = angular.module("myApp");

    var adminContentController = function ($scope, $routeParams, $location, moduleHelper, moduleContentHelper, moduleContentTypeHelper) {

        var allModules = moduleHelper.getAll();

        $scope.moduleContentTypes = moduleContentTypeHelper.get();

        // In case we don't have a module id, redirect to the first one
        if (!$routeParams.id) {
            allModules.$promise.then(function () {
                $location.url('/admin/module-content/' + allModules[0].id);
            });
        }

        // If we have a module Id, we now need to load its content
        if ($routeParams.id) {
            $scope.moduleContentTypes.$promise.then(function () {
                $scope.allElements = moduleContentHelper.getElements($routeParams.id);
                allModules.$promise.then(function () {
                    $scope.currentModuleId = $routeParams.id;
                    $scope.modules = allModules;
                });
            });
        }

        $scope.onModuleChange = function () {
            $location.url('/admin/module-content/' + $scope.currentModuleId);
        }
        

    };

    app.controller("adminContentController", ['$scope', '$routeParams', '$location', 'moduleHelper', 'moduleContentHelper', 'moduleContentTypeHelper', adminContentController]);
}());