(function () {
    var app = angular.module("myApp");

    var modalContentImageController = function ($scope, Upload, websiteFileHelper, imagePickerHelper, $timeout) {

        var parseHTML = function (element) {
            var container = $.parseHTML(element)[0];
            //TODO: Parse the HTML
        };

        var element = $scope.$parent.element;

        if (element.moduleContentTranslations.length > 0) $scope.content = element.moduleContentTranslations[0].content;
        else $scope.content = '<div class="image-container"></div>';

        parseHTML($scope.content);

        $scope.save = function () {
            var selectedImages = imagePickerHelper.getSelectedImages('carouselImages');
            var imgElements = '';
            _.each(selectedImages, function (i) {
                imgElements += '<div><img src="Images/' + i.filename + '" class="image" /></div>';
            });
            $scope.$parent.save('<div class="image-container">' + imgElements + '</div>');
        }

        $scope.uploadFiles = function (files) {
            $scope.files = files;
            if (files && files.length) {
                Upload.upload({
                    url: 'api/WebsiteFile',
                    data: {
                        files: files
                    }
                }).then(function (response) {
                    $timeout(function () {
                        $scope.result = response.data;
                    });
                }, function (response) {
                    if (response.status > 0) {
                        $scope.errorMsg = response.status + ': ' + response.data;
                    }
                }, function (evt) {
                    $scope.progress =
                        Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                });
            }
        };

        $scope.images = websiteFileHelper.getAll();

    };

    app.controller("modalContentImageController", ['$scope', 'Upload', 'websiteFileHelper', 'imagePickerHelper', '$timeout', modalContentImageController]);
}());