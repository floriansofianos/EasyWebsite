(function () {
    var app = angular.module("app.image.picker");

    var imagePickerController = function ($scope, imagePickerHelper) {

        imagePickerHelper.registerImagePicker($scope.id);

        $scope.selectItem = function (item) {
            imagePickerHelper.setSelectedImage($scope.id, item);
        }
    };

    app.controller("imagePickerController", ['$scope', 'imagePickerHelper', imagePickerController]);
}());