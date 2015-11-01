(function () {
    var app = angular.module("myApp");

    var adminContentController = function ($scope, $routeParams, $location) {

        var allModules = moduleHelper.getAll();

        // In case we don't have an operator id, redirect to the first one
        if (!$routeParams.id) {
            allModules.$promise.then(function () {
                $location.url('admin-content/' + allModules[0].Id);
            });
        }

    };

    app.controller("adminContentController", ['$scope', '$routeParams', '$location', adminContentController]);
}());