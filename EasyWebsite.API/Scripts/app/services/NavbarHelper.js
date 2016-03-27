(function () {

    var module = angular.module("app.navbar");

    var navbarHelper = function ($location) {

        var getActiveMenus = function () {
            return $location.path().split('/');
        };

        return {
            getActiveMenus: getActiveMenus
        }
    };

    module.factory("navbarHelper", navbarHelper);
}());