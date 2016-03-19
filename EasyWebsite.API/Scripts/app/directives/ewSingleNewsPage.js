(function () {
    var app = angular.module('myApp');

    var ewSingleNewsPage = function () {
        return {
            replace: true,
            scope: {
                allnews: '=',
                singlenews: '=',
                moduleid: '='
            },
            templateUrl: '/templates/ew-single-news-page.html',
            controller: 'singleNewsPageController',
            link: function (scope, elt, attr) {             

            }
        }
    };

    app.directive('ewSingleNewsPage', ewSingleNewsPage)

}());