(function () {

    var module = angular.module("myApp");

    var routingHelper = function ($location) {

        var getActiveMenus = function () {
            return $location.path().split('/');
        };

        var getActiveSection = function () {
            var activeMenus = getActiveMenus();
            return activeMenus[1] == 'admin' ? 'admin' : '';
        }

        return {
            getActiveMenus: getActiveMenus,
            getActiveSection: getActiveSection,
        }
    };

    module.factory("routingHelper", routingHelper);
}());