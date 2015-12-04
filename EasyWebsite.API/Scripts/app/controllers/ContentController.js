(function () {
    var app = angular.module("myApp");

    var contentController = function ($scope, $location, moduleContentHelper) {

        var currentPage = $location.url();

        $scope.allElements = moduleContentHelper.getElementsByURL(currentPage);

    };

    app.controller("contentController", ['$scope', '$location', 'moduleContentHelper', contentController]);
}());