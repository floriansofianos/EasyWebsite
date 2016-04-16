(function () {
    var mainModule = angular.module('myApp');

    var errorController = function ($scope, spinnerHelper) {

        spinnerHelper.hide();

    };

    mainModule.controller('errorController', ['$scope', 'spinnerHelper', errorController]);

}());