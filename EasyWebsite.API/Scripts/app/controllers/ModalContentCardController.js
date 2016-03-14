(function () {
    var app = angular.module("myApp");

    var modalContentCardController = function ($scope) {

        var parseHTML = function (element) {
            var container = $.parseHTML(element)[0];
            $scope.content = $(container).find(".card-content")[0].innerHTML;
            $scope.icon = $(container).find("i")[0].className.split(' ')[1];
        };

        var element = $scope.$parent.element;
        var language = $scope.$parent.language;

        var moduleContentTranslation = _.find(element.moduleContentTranslations, function (e) { return e.language == language; })
        if (moduleContentTranslation) $scope.content = moduleContentTranslation.content;
        else $scope.content = '<div class="card-container"><div class="card-content"></div><i class="fa fa-info"></i></div>';

        parseHTML($scope.content);

        $scope.save = function () {
            $scope.$parent.save('<div class="card-container"><div class="card-content">' + $scope.content + '</div><i class="fa ' + $scope.icon + '"></i></div>');
        }



    };

    app.controller("modalContentCardController", ['$scope', modalContentCardController]);
}());