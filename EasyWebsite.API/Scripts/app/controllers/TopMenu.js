(function () {
    var menuModule = angular.module('app.menu');

    var TopMenuController = function ($scope, $location, routingHelper) {

        this.setRoute = function (route) {
            $location.url(route);
        };

        this.isShowing = function (section) {
            return section == routingHelper.getActiveTopMenu();
        };

    };

    menuModule.controller('TopMenuController', ['$scope', '$location', 'routingHelper', TopMenuController]);

}());