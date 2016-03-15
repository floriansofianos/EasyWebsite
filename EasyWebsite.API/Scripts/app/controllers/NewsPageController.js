﻿(function () {
    var app = angular.module("myApp");

    var newsPageController = function ($scope, authService, newsHelper, userHelper, languageHelper, settings) {

        // Only show the news for current language
        $scope.news.$promise.then(function () {
            $scope.news = _.filter($scope.news, function (n) { return n.language == languageHelper.getCurrentLanguage(); });
        });

        $scope.availableLanguages = settings.getAvailableLanguages();
        $scope.availableLanguages.$promise.then(function () {
            var allLanguages = languageHelper.availableLanguages;
            $scope.languages = _.filter(allLanguages, function (l) {
                return $scope.availableLanguages.value.indexOf(l.code) > -1;
            });
        });
        

        $scope.newElement = {
            newLanguage: languageHelper.getCurrentLanguage()
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

    app.controller("newsPageController", ['$scope', 'authService', 'newsHelper', 'userHelper', 'languageHelper', 'settings', newsPageController]);
}());