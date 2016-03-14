(function () {
    var app = angular.module("myApp");

    var modalContentWidgetController = function ($scope) {

        var parseHTML = function (element) {
            var container = $.parseHTML(element)[0];
            $scope.content = $(container).find(".widget-content")[0].innerHTML;
            $scope.title = $(container).find(".widget-header")[0].innerHTML;
        };

        var element = $scope.$parent.element;
        var language = $scope.$parent.language;

        var moduleContentTranslation = _.find(element.moduleContentTranslations, function (e) { return e.language == language; })
        if (moduleContentTranslation) $scope.content = moduleContentTranslation.content;
        else $scope.content = '<div class="widget-container"><div class="widget-header"></div><div class="widget-content"><div></div></div></div>';

        parseHTML($scope.content);

        $scope.save = function () {
            $scope.$parent.save('<div class="widget-container"><div class="widget-header">' + $scope.title + '</div><div class="widget-content">' + $scope.content + '</div></div>');
        }



    };

    app.controller("modalContentWidgetController", ['$scope', modalContentWidgetController]);
}());