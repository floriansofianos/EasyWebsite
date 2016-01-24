function () {
    var app = angular.module("myApp");

    var modalContentTextController = function ($scope) {

        var element = $scope.$parent.element;

        if (element.moduleContentTranslations.length > 0) $scope.content = element.moduleContentTranslations[0].content;
        else $scope.content = '<div>Hello World!!</div>';

        $scope.save = function () {
            $scope.$parent.save($scope.content);
        }

    };

    app.controller("modalContentTextController", ['$scope', modalContentTextController]);
}());