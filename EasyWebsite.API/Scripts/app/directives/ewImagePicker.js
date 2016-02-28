(function () {
    var menuModule = angular.module('app.image.picker');

    var ewImagePicker = function () {
        return {
            replace: true,
            scope: {
                images: '='
            },
            templateUrl: '/templates/ew-image-picker.html',
            controller: 'imagePickerController',
            link: function (scope, elt, attr) {             

            }
        }
    };

    menuModule.directive('ewImagePicker', ewImagePicker)

}());