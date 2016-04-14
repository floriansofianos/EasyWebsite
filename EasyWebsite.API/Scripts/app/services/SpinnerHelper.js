(function () {

    var spinnerModule = angular.module("app.spinner");

    var spinnerHelper = function () {

        var currentSpinner = {};

        var register = function (data) {
            currentSpinner = data;
        };

        var show = function () {
            currentSpinner.show();
        };

        var hide = function () {
            currentSpinner.hide();
        }

        return {
            register: register,
            show: show,
            hide: hide
        }
    };

    spinnerModule.factory("spinnerHelper", spinnerHelper);
}());