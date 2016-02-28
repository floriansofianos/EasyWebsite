(function () {
    var app = angular.module("app.image.picker");

    var imagePickerController = function ($scope) {

        $scope.selectedItem = [];

        $scope.selectItem = function (item) {
            if (_.any($scope.selectedItem, function (i) { return i == item })) {
                delete $scope.selectedItem[$scope.selectedItem.indexOf(item)];
            }
            else {
                $scope.selectedItem.push(item);
            }
        }
    };

    app.controller("imagePickerController", ['$scope', imagePickerController]);
}());