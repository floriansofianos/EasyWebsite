(function () {
    var dashboardModule = angular.module('app.dashboard');

    var dynamic = function ($compile) {
        return {
            restrict: 'A',
            replace: true,
            link: function (scope, element, attrs) {
                scope.$watch(function () {
                    return scope.$eval(attrs.dynamic);
                }, function (value) {
                    element.html(value);
                    $compile(element.contents())(scope);
                });
            }
        };
    };

    dashboardModule.directive('dynamic', ['$compile', dynamic])

}());