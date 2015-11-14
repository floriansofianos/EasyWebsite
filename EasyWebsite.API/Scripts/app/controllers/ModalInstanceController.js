(function () {
    var app = angular.module("myApp");

    var modalInstanceController = function ($scope, $uibModalInstance, element) {

        if (element.moduleContentTranslations) $scope.content = element.moduleContentTranslations[0].content;
        else $scope.content = '<h4>Hello World!!</h4>';

        $scope.close = function () {
            $uibModalInstance.close();
        };
        $scope.save = function () {
            if (element.moduleContentTranslations[0]) {
                element.moduleContentTranslations[0].content = $scope.content;
            }
            else {
                element.moduleContentTranslations = [{ content: $scope.content, language: 'fr' }];
            }
            $uibModalInstance.close();
        }

    };

    app.controller("ModalInstanceController", ['$scope', '$uibModalInstance', 'element', modalInstanceController]);
}());