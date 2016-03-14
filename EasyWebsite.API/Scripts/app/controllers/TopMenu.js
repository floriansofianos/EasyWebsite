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
            var correctModuleName = _.find(moduleNames, function (n) { return n.language == languageHelper.currentLanguage || n.language.indexOf(languageHelper.currentLanguage) > -1; });
            return correctModuleName ? correctModuleName.name : '';
        }

    };

    menuModule.controller('TopMenuController', ['$scope', '$location', 'routingHelper', 'languageHelper', TopMenuController]);

}());