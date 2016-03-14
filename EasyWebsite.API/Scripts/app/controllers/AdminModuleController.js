(function () {
    var app = angular.module("myApp");

    var adminModuleController = function ($scope, moduleTypeHelper, moduleHelper, $routeParams, $location, languageHelper, settings) {

        $scope.types = moduleTypeHelper.get();

        $scope.modules = moduleHelper.getAll();

        $scope.availableLanguages = settings.getAvailableLanguages();

        if ($routeParams.id) {
            $scope.types.$promise.then(function () {
                $scope.module = moduleHelper.get($routeParams.id);
            })
            $scope.currentModuleId = $routeParams.id;
        }
        else {
            $scope.availableLanguages.$promise.then(function() {
                var allLanguages = $scope.availableLanguages.value.split('|');
                $scope.module = {
                    name: []
                };
                _.each(allLanguages, function (l) {
                    if (l != '') $scope.module.name.push({ language: l, name: '' });
                });
            });
        }

        $scope.update = function (module) {
            moduleHelper.save(module);
        }

        $scope.onModuleChange = function () {
            $location.url('/admin/module/' + $scope.currentModuleId);
        }

        $scope.addNewElement = function () {
            $location.url('/admin/module/');
        };

        $scope.getLabel = function(moduleNames) {
            return languageHelper.getModuleLabel(moduleNames);
        };
    };

    app.controller("adminModuleController", ['$scope', 'moduleTypeHelper', 'moduleHelper', '$routeParams', '$location', 'languageHelper', 'settings', adminModuleController]);
}());