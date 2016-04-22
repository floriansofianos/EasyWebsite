(function () {
    var menuModule = angular.module('app.menu');

    var TopMenuController = function ($scope, $location, routingHelper, languageHelper, topMenuHelper, settings) {

        $scope.affixed = 'top';
        $scope.inverse = true;
        var businessName = settings.getBusinessName();

        businessName.$promise.then(function () {
            if(businessName.value) $scope.brand = businessName.value;
        });

        var getLabel = function (moduleNames) {
            return languageHelper.getModuleLabel(moduleNames);
        };

        var adminMenus = [{
            label: [{ language: 'fr_FR', name: 'Administration' }, { language: 'en_AU', name: 'Admin' }],
            action: '/admin/home',
            icon: 'fa-home'
        },
        {
            label: [{ language: 'fr_FR', name: 'Module' }, { language: 'en_AU', name: 'Module' }],
            action: '/admin/module'
        },
        {
            label: [{ language: 'fr_FR', name: 'Contenu de module' }, { language: 'en_AU', name: 'Module Content' }],
            action: '/admin/module-content'
        }];

        if(routingHelper.getActiveSection() == 'admin') {
            $scope.topMenuItems = [];
            _.each(adminMenus, function (m) {
                $scope.topMenuItems.push({
                    title: getLabel(m.label),
                    action: m.action,
                    icon: m.icon
                });
            });
        }
        else {
            $scope.allModules = topMenuHelper.getAll();
            $scope.allModules.$promise.then(function () {

                $scope.topMenuItems = [];
                _.each($scope.allModules, function (m) {
                    $scope.topMenuItems.push({
                        title: getLabel(m.label),
                        action: m.route,
                        icon: m.icon
                    });
                });
            });
        }

        $scope.setRoute = function (route) {
            $location.url(route);
        };

        $scope.navigateToHome = function () {
            $location.url('/');
        }
    };

    menuModule.controller('TopMenuController', ['$scope', '$location', 'routingHelper', 'languageHelper', 'topMenuHelper', 'settings', TopMenuController]);

}());