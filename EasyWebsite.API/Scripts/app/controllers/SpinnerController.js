(function () {
    var spinnerModule = angular.module('app.spinner');

    var SpinnerController = function ($scope, spinnerHelper) {
        var api = {
            show: function () {
                $scope.show = true;
            },
            hide: function () {
                $scope.show = false;
            }
        }
        spinnerHelper.register(api);
    };

    spinnerModule.controller('SpinnerController', ['$scope', 'spinnerHelper', SpinnerController]);

}());