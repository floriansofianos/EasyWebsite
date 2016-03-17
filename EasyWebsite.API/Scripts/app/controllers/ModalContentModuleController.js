(function () {
    var app = angular.module("myApp");

    var modalContentModuleController = function ($scope, moduleHelper, languageHelper) {

        $scope.modules = moduleHelper.getAll();

        var parseHTML = function (element) {
            var container = $.parseHTML(element)[0];
            //TODO Parse HTML
        };

        var element = $scope.$parent.element;
        var language = $scope.$parent.language;

        $scope.allModules = [];
        $scope.modules.$promise.then(function () {
            _.each($scope.modules, function (m) {
                $scope.allModules.push({
                    id: m.id,
                    label: _.find(m.label, function(n) { return n.language == languageHelper.getCurrentLanguage() }).name
                });
            });
        });

        var moduleContentTranslation = _.find(element.moduleContentTranslations, function (e) { return e.language == language; })
        if (moduleContentTranslation) $scope.content = moduleContentTranslation.content;
        else $scope.content = '<div class="module-container"></div>';

        parseHTML($scope.content);

        $scope.save = function () {
            var selectedModule = _.find($scope.modules, function (m) { return m.id == $scope.moduleId });
            var moduleHtml = '';
            if (selectedModule.type == 1) moduleHtml = '<ew-module-news moduleId=' + selectedModule.id + '></ew-module-news>'
            $scope.$parent.save('<div class="module-container">' + moduleHtml + '</div>');
        }



    };

    app.controller("modalContentModuleController", ['$scope', 'moduleHelper', 'languageHelper', modalContentModuleController]);
}());