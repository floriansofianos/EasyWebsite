(function () {
    var app = angular.module("myApp");

    var newsPageController = function ($scope, authService, newsHelper, userHelper) {

        //TODO Only show the news for current language

        //TODO Ability to write news in multiple languages

        $scope.newElement = {
            newLanguage: 'fr'
        };

        $scope.addNews = function () {
            $scope.creatingNews = true;
        };

        $scope.cancel = function () {
            $scope.creatingNews = false;
        }

        $scope.save = function () {
            var news = {
                moduleId: parseInt($scope.moduleid),
                title: $scope.newElement.newTitle,
                body: $scope.newElement.newBody,
                date: (new Date()).toJSON(),
                language: $scope.newElement.newLanguage
            };
            newsHelper.save(news);
            $scope.creatingNews = false;
        }

        

    };

    app.controller("newsPageController", ['$scope', 'authService', 'newsHelper', 'userHelper', newsPageController]);
}());