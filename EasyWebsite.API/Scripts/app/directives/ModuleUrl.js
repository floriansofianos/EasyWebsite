﻿(function () {
    var app = angular.module('myApp');

    var moduleUrl = function (moduleUrlHelper, $q, $routeParams) {
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                ctrl.$asyncValidators.moduleUrl = function (modelValue, viewValue) {

                    if (ctrl.$isEmpty(modelValue)) {
                        // consider empty model valid
                        return $q.when();
                    }

                    var def = $q.defer();

                    var isAlreadyTaken = moduleUrlHelper.verify(modelValue, $routeParams.id || 0);

                    isAlreadyTaken.then(function (data) {
                        if (data.data) {
                            // Reject this URL
                            def.reject();
                        }
                        else {
                            // Accept it
                            def.resolve();
                        }
                    });

                    return def.promise;
                };
            }
        }
    }

    app.directive('moduleUrl', ['moduleUrlHelper', '$q', '$routeParams', moduleUrl]);
}());