(function () {
    var menuModule = angular.module('app.menu');

    var topMenu = function (topMenuHelper) {
        return {
            scope: {

            },
            replace: true,
            templateUrl: '/templates/top-menu.html',
            controller: 'TopMenuController',
            link: function (scope, elt, attr) {
                scope.topMenuItems = topMenuHelper.getAll();
            }
        }
    }

    menuModule.directive('topMenu', ['topMenuHelper', topMenu]);
}());