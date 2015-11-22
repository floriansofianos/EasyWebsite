(function () {
    var app = angular.module('myApp');

    var topMenu = function (moduleUrlHelper) {
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                ctrl.$asyncValidators.moduleUrl = function (modelValue, viewValue) {

                    if (ctrl.$isEmpty(modelValue)) {
                        // consider empty model valid
                        return $q.when();
                    }

                    var def = $q.defer();

                    var isAlreadyTaken = moduleUrlHelper.verify(modelValue);

                    modelValue.$promise.then(function () {
                        if (isAlreadyTaken) {
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

    app.directive('moduleUrl', ['topMenuHelper', moduleUrlHelper]);
}());