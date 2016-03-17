(function () {
    var menuModule = angular.module('myApp');

    var moduleNewsController = function ($scope, languageHelper, newsHelper) {

        $scope.allNews = newsHelper.get($scope.moduleid);

        $scope.allNews.$promise.then(function () {
            $scope.allNews = _.filter($scope.allNews, function (n) { return n.language == languageHelper.getCurrentLanguage(); });
            $scope.lastNews = _.last($scope.allNews);
            $scope.otherNews = _.filter($scope.allNews, function (n) { return n.id != $scope.lastNews.id; });
        });

    };

    menuModule.controller('moduleNewsController', ['$scope', 'languageHelper', 'newsHelper', moduleNewsController]);

}());