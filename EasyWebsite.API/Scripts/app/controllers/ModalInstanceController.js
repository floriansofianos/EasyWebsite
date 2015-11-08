(function () {
    var app = angular.module("myApp");

    var modalInstanceController = function ($scope, $uibModalInstance) {

        $scope.content = '<h1>Hello World!!</h1>';
        $scope.close = function () {
            $uibModalInstance.close();
        };

    };

    app.controller("ModalInstanceController", ['$scope', '$uibModalInstance', modalInstanceController]);
}());