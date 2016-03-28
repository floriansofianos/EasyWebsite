(function () {
    var app = angular.module("myApp");

    var textfieldController = function ($scope) {
        $scope.tinymceOptions = {
            plugins: 'advlist autolink link image lists charmap print preview table',
            skin: 'lightgray',
            theme: 'modern'
        };

    };

    app.controller("textfieldController", ['$scope', textfieldController]);
}());