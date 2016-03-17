(function () {
    var app = angular.module('myApp');

    var ewModuleNews = function () {
        return {
            replace: true,
            scope: {
                moduleid: '='
            },
            templateUrl: '/templates/ew-module-news.html',
            controller: 'moduleNewsController',
            link: function (scope, elt, attr) {             

            }
        }
    };

    app.directive('ewModuleNews', ewModuleNews)

}());