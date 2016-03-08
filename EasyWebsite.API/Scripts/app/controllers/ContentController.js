﻿(function () {
    var app = angular.module("myApp");

    var contentController = function ($scope, $location, moduleContentHelper, moduleHelper) {

        var currentPage = $location.url();

        $scope.module = moduleHelper.getByUrl(currentPage);

        $scope.module.$promise.then(function () {
            if ($scope.module.moduleType == 0) $scope.allElements = moduleContentHelper.getElementsByURL(currentPage);
        });

        

    };

    app.controller("contentController", ['$scope', '$location', 'moduleContentHelper', 'moduleHelper', contentController]);
}());