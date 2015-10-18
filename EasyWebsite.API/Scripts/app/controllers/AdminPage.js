(function () {
    var app = angular.module("myApp");

    var adminPage = function ($scope, $resource) {

       $scope.secretValue = $resource('api/values/5').get();
        
    };

    app.controller("adminPage", ['$scope', '$resource', adminPage]);
}());