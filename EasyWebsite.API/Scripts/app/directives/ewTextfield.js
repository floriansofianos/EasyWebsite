(function () {
    var app = angular.module('myApp');

    var ewTextfield = function () {
        return {
            replace: true,
            scope: {
                model: '='
            },
            templateUrl: '/templates/ew-textfield.html',
            controller: 'textfieldController',
            link: function (scope, elt, attr) {             

            }
        }
    };

    app.directive('ewTextfield', ewTextfield)

}());