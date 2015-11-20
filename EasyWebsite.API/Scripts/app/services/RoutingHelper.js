(function () {

    var module = angular.module("myApp");

    var routingHelper = function ($location) {

        var getActiveMenus = function () {
            return $location.path().split('/');
        };

        var getActiveTopMenu = function () {
            var activeMenus = getActiveMenus();
            return activeMenus[1] == 'admin' ? 'admin' : '';
        }

        return {
            getActiveMenus: getActiveMenus,
            getActiveTopMenu: getActiveTopMenu,
        }
    };

    module.factory("routingHelper", routingHelper);
}());