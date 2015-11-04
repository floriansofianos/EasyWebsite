(function () {
    var app = angular.module("myApp");

    var adminContentController = function ($scope, $routeParams, $location, moduleHelper, moduleContentHelper) {

        var allModules = moduleHelper.getAll();

        // In case we don't have an operator id, redirect to the first one
        if (!$routeParams.id) {
            allModules.$promise.then(function () {
                $location.url('admin-content/' + allModules[0].Id);
            });
        }

        // If we have a module Id, we now need to load its content
        if ($routeParams.id) {
            $scope.allElements = moduleContentHelper.getElements($routeParams.id);
        }

        

    };

    app.controller("adminContentController", ['$scope', '$routeParams', '$location', 'moduleHelper', 'moduleContentHelper', adminContentController]);
}());