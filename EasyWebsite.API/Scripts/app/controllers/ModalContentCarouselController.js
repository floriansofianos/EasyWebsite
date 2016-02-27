(function () {
    var app = angular.module("myApp");

    var modalContentCarouselController = function ($scope, Upload) {

        var parseHTML = function (element) {
            var container = $.parseHTML(element)[0];
            $scope.title = container.innerHTML;
        };

        var element = $scope.$parent.element;

        if (element.moduleContentTranslations.length > 0) $scope.content = element.moduleContentTranslations[0].content;
        else $scope.content = '<div class="carousel-container"></div>';

        parseHTML($scope.content);

        $scope.save = function () {
            $scope.$parent.save('<div class="carousel-container">' + $scope.title + '</div>');
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

    };

    app.controller("modalContentCarouselController", ['$scope', 'Upload', modalContentCarouselController]);
}());