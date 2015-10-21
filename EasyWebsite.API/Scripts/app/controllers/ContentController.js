(function () {
    var app = angular.module("myApp");

    var contentController = function ($scope, $location) {

        $scope.currentPage = $location.url();

    };

    app.controller("contentController", ['$scope', '$location', contentController]);
}());