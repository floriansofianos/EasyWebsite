(function () {
    var dashboardModule = angular.module('app.dashboard');

    var dynamic = function ($compile) {
        return {
            restrict: 'A',
            replace: true,
            link: function (scope, ele, attrs) {
                ele.html(attrs.dynamic);
                $compile(ele.contents())(scope);
            }
        };
    };

    dashboardModule.directive('dynamic', ['$compile', dynamic])

}());