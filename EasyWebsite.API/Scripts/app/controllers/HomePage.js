(function () {
    var myApp = angular.module('myApp');

    var homePageController = function ($scope) {
        $scope.helloWorld = 'Welcome to Easy Website!';
    };

    myApp.controller('homePage', ['$scope', homePageController]);
}());