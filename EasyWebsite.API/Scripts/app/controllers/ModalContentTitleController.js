(function () {
    var app = angular.module("myApp");

    var modalContentTitleController = function ($scope) {

        var parseHTML = function (element) {
            var container = $.parseHTML(element)[0];
            $scope.title = container.innerHTML;
        };

        var element = $scope.$parent.element;
        var language = $scope.$parent.language;

        var moduleContentTranslation = _.find(element.moduleContentTranslations, function (e) { return e.language == language; })
        if (moduleContentTranslation) $scope.content = moduleContentTranslation.content;
        else $scope.content = '<div class="title-container"></div>';

        parseHTML($scope.content);

        $scope.save = function () {
            $scope.$parent.save('<div class="title-container">' + $scope.title + '</div>');
        }



    };

    app.controller("modalContentTitleController", ['$scope', modalContentTitleController]);
}());