(function () {
    var app = angular.module("myApp");

    var modalContentTitleController = function ($scope) {

        var parseHTML = function (element) {
            var container = $.parseHTML(element)[0];
            $scope.title = container.innerHTML;
        };

        var element = $scope.$parent.element;

        if (element.moduleContentTranslations.length > 0) $scope.content = element.moduleContentTranslations[0].content;
        else $scope.content = '<div class="title-container"></div>';

        parseHTML($scope.content);

        $scope.save = function () {
            $scope.$parent.save('<div class="title-container">' + $scope.title + '</div>');
        }



    };

    app.controller("modalContentTitleController", ['$scope', modalContentTitleController]);
}());