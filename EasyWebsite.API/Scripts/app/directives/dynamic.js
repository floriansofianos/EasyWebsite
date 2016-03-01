(function () {
    var dashboardModule = angular.module('app.dashboard');

    var dynamic = function ($compile, $timeout) {
        return {
            restrict: 'A',
            replace: true,
            link: function (scope, element, attrs) {
                var render = function () {
                    scope.$watch(function () {
                        return scope.$eval(attrs.dynamic);
                    }, function (value) {
                        element.html(value);
                        $compile(element.contents())(scope);
                    });
                }
                //TODO See why we have to do this in order to render the carousel
                $timeout(render, 500);
            }
        };
    };

    dashboardModule.directive('dynamic', ['$compile', '$timeout', dynamic])

}());