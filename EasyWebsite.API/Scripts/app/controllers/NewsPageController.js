(function () {
    var app = angular.module("myApp");

    var newsPageController = function ($scope, authService) {

        //TODO Only show the news for current language

        //TODO Ability to write news in multiple languages

        $scope.addNews = function () {
            $scope.creatingNews = true;
        };

        $scope.cancel = function () {
            $scope.creatingNews = false;
        }

        $scope.save = function () {
            // Create new entry
            var news = {
                moduleId: $scope.moduleId,
                title: $scope.newTitle,
                body: $scope.newBody,
                date: (new Date()).toJSON(),
                author: userHelper.get(authService.authentication.userName),
                language: $scope.newLanguage
            };
            $scope.creatingNews = false;
        }

        

    };

    app.controller("newsPageController", ['$scope', 'authService', newsPageController]);
}());