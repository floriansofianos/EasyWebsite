(function () {

    var module = angular.module("myApp");

    var routingHelper = function ($location) {

        var getActiveMenus = function () {
            return $location.path().split('/');
        };

        var getActiveTopMenu = function () {
            return getActiveMenus()[1];
        }

        return {
            getActiveMenus: getActiveMenus,
            getActiveTopMenu: getActiveTopMenu,
        }
    };

    module.factory("routingHelper", routingHelper);
}());