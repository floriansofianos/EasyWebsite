(function () {
    var spinnerModule = angular.module('app.spinner');

    var spinner = function () {
        return {
            transclude: false,
            replace: true,
            scope: {
                show: '=?'
            },
            templateUrl: '/templates/spinner.html',
            controller: 'SpinnerController',
            link: function (scope, elt, attr) {

            }
        }
    }

    spinnerModule.directive('spinner', spinner);
}());