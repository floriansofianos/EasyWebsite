(function () {
    var myApp = angular.module('myApp');

    var homePageController = function ($scope, moduleHelper, $location) {
        var home = moduleHelper.getHomeModule();
        home.$promise.then(function() {
            $location.url(home.url);
        });
    };

    myApp.controller('homePage', ['$scope', 'moduleHelper', '$location', homePageController]);
}());