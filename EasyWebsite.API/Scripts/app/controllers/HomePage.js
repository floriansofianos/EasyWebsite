(function () {
    var myApp = angular.module('myApp');

    var homePageController = function ($scope) {
        $scope.helloWorld = "'WELCOME_TO' Easy Website!";
    };

    myApp.controller('homePage', ['$scope', homePageController]);
}());