﻿(function () {
    var menuModule = angular.module('app.menu');

    var topMenuItem = function (routingHelper) {
        return {
            require: '^topMenu',
            replace: true,
            scope: {
                label: '@',
                route: '@',
                icon: '@'
            },
            templateUrl: '/templates/top-menu-item.html',
            link: function (scope, elt, attr, ctrl) {

                // handle click on menu item
                elt.on('click', function (evt) {
                    evt.stopPropagation();
                    evt.preventDefault();
                    scope.$apply(function () {
                        ctrl.setRoute(scope.route);
                    });

                });

                // is element active?
                scope.isActive = function () {
                    return _.any(routingHelper.getActiveMenus(), function (menu) { return menu === scope.route }) ? 'active' : '';
                }

            }
        }
    };

    menuModule.directive('topMenuItem', ['routingHelper', topMenuItem])

}());