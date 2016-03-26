(function () {
    var app = angular.module('myApp');

    var ewFooter = function () {
        return {
            replace: true,
            templateUrl: '/templates/ew-footer.html',
            controller: 'footerController',
            link: function (scope, elt, attr) {             

            }
        }
    };

    app.directive('ewFooter', ewFooter)

}());