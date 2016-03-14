(function () {
    var app = angular.module("myApp");

    var modalInstanceController = function ($scope, $uibModalInstance, element, language, moduleContentTypeHelper) {
        
        $scope.moduleContentTypes = moduleContentTypeHelper.get();

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
                element.moduleContentTranslations.push({ content: content, language: language });
            }
            $uibModalInstance.close();
        }

    };

    app.controller("ModalInstanceController", ['$scope', '$uibModalInstance', 'element', 'language', 'moduleContentTypeHelper', modalInstanceController]);
}());