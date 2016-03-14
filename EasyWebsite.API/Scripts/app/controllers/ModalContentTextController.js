(function () {
    var app = angular.module("myApp");

    var modalContentTextController = function ($scope) {

        var parseHTML = function (element) {
            var container = $.parseHTML(element)[0];
            $scope.content = container.innerHTML;
            $scope.backgroundColor = $(container).css("background-color");
        };

        var element = $scope.$parent.element;
        var language = $scope.$parent.language;

        var moduleContentTranslation = _.find(element.moduleContentTranslations, function (e) { return e.language == language; })
        if (moduleContentTranslation) $scope.content = moduleContentTranslation.content;
        else $scope.content = '<div class="text-container"><div>Hello World!!</div></div>';

        parseHTML($scope.content);

        $scope.save = function () {
            //In case there is a background
            var bckColor = $scope.backgroundColor ? 'background-color: ' + $scope.backgroundColor + ';' : ''
            $scope.$parent.save('<div class="text-container" style="' + bckColor + '">' + $scope.content + '</div>');
        }

        

    };

    app.controller("modalContentTextController", ['$scope', modalContentTextController]);
}());