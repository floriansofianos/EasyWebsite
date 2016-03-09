(function () {
    var app = angular.module('myApp');

    var ewNewsPage = function () {
        return {
            replace: true,
            scope: {
                allNews: '=',
                moduleId: '='
            },
            templateUrl: '/templates/ew-news-page.html',
            controller: 'newsPageController',
            link: function (scope, elt, attr) {             

            }
        }
    };

    app.directive('ewNewsPage', ewNewsPage)

}());