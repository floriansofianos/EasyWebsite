(function () {
    var app = angular.module("myApp");

    var contentController = function ($scope, $location, moduleContentHelper, moduleHelper, newsHelper) {

        var currentPage = $location.url();

        $scope.module = moduleHelper.getByUrl(currentPage);

        $scope.module.$promise.then(function () {
            if ($scope.module.moduleType == 0) $scope.allElements = moduleContentHelper.getElementsByURL(currentPage);
            if ($scope.module.moduleType == 1) {
                $scope.allNews = newsHelper.get($scope.module.id);
                if (currentPage.split('/').length > 2) {
                    // We are in a single news situation
                    $scope.singleNews = newsHelper.getSingleNews($scope.module.id, currentPage.split('/')[2]);
                }
            }
        });

        

    };

    app.controller("contentController", ['$scope', '$location', 'moduleContentHelper', 'moduleHelper', 'newsHelper', contentController]);
}());