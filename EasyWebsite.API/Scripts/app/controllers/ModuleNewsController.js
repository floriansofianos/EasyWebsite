(function () {
    var menuModule = angular.module('myApp');

    var moduleNewsController = function ($scope, languageHelper, newsHelper, moduleHelper, $location) {

        $scope.allNews = newsHelper.get($scope.moduleid);
        $scope.module = moduleHelper.get($scope.moduleid);

        $scope.goToNewsModule = function (action) {
            $location.path(action);
        }

        $scope.goToNews = function (action, newsId) {
            $location.path(action + '/' + newsId);
        }

        $scope.allNews.$promise.then(function () {
            $scope.allNews = _.filter($scope.allNews, function (n) { return n.language == languageHelper.getCurrentLanguage(); });
            $scope.lastNews = _.last($scope.allNews);
            $scope.otherNews = _.filter($scope.allNews, function (n) { return n.id != $scope.lastNews.id; });
        });

    };

    menuModule.controller('moduleNewsController', ['$scope', 'languageHelper', 'newsHelper', 'moduleHelper', '$location', moduleNewsController]);

}());