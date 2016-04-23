(function () {
    var app = angular.module("myApp");

    var modalInstanceController = function ($scope, $uibModalInstance, element, language, moduleContentTypeHelper, settings, languageHelper) {
        
        $scope.moduleContentTypes = moduleContentTypeHelper.get();

        var strAvailableLanguages = settings.getAvailableLanguages();
        strAvailableLanguages.$promise.then(function () {
            $scope.availableLanguages = _.filter(languageHelper.availableLanguages, function (l) { return strAvailableLanguages.value.indexOf(l.code) > -1 });
        });

        $scope.moduleContentTypes.$promise.then(function () {
            $scope.element = element;
            $scope.language = language;
        })

        $scope.close = function () {
            $uibModalInstance.close();
        };

        $scope.save = function (content) {
            var moduleContentTranslation = _.find(element.moduleContentTranslations, function (e) { return e.language == language });
            if (moduleContentTranslation) {
                moduleContentTranslation.content = content;
            }
            else {
                if (!element.moduleContentTranslations) element.moduleContentTranslations = [];
                _.each($scope.availableLanguages, function (l) {
                    element.moduleContentTranslations.push({ content: content, language: l.code });
                });
            }
            $uibModalInstance.close();
        }

    };

    app.controller("ModalInstanceController", ['$scope', '$uibModalInstance', 'element', 'language', 'moduleContentTypeHelper', 'settings', 'languageHelper', modalInstanceController]);
}());