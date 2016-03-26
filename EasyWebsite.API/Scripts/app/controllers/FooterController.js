(function () {
    var app = angular.module("myApp");

    var footerController = function ($scope, settings) {

        var footerRequest = settings.getFooter();

        footerRequest.$promise.then(function() {
            $scope.footerContent = footerRequest.value;
        });
        
    };

    app.controller("footerController", ['$scope', 'settings', footerController]);
}());