(function () {
    var menuModule = angular.module('app.menu');

    var TopMenuController = function ($scope, $location, routingHelper, languageHelper) {

        this.setRoute = function (route) {
            $location.url(route);
        };

        this.isShowing = function (section) {
            return section == routingHelper.getActiveTopMenu();
        };

        this.getLabel = function (moduleNames) {
            return languageHelper.getModuleLabel(moduleNames);
        };

    };

    menuModule.controller('TopMenuController', ['$scope', '$location', 'routingHelper', 'languageHelper', TopMenuController]);

}());