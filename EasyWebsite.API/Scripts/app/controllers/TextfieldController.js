(function () {
    var app = angular.module("myApp");

    var textfieldController = function ($scope) {
        $scope.tinymceOptions = {
            plugins: 'advlist autolink link image lists charmap print preview table paste',
            skin: 'lightgray',
            theme: 'modern',
            image_advtab: true ,
            paste_data_images: true
        };

    };

    app.controller("textfieldController", ['$scope', textfieldController]);
}());