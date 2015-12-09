(function () {
    var app = angular.module("myApp");

    var modalInstanceController = function ($scope, $uibModalInstance, element) {
        
        $scope.element = element;

        $scope.close = function () {
            $uibModalInstance.close();
        };

        $scope.save = function (content) {
            if (element.moduleContentTranslations[0]) {
                element.moduleContentTranslations[0].content = content;
            }
            else {
                element.moduleContentTranslations = [{ content: content, language: 'fr' }];
            }
            $uibModalInstance.close();
        }

    };

    app.controller("ModalInstanceController", ['$scope', '$uibModalInstance', 'element', modalInstanceController]);
}());