(function () {
    var menuModule = angular.module('app.menu');

    var TopMenuController = function ($scope, $location) {

        this.setRoute = function (route) {
            $location.url(route);
        };

    };

    menuModule.controller('TopMenuController', ['$scope', '$location', TopMenuController]);

}());