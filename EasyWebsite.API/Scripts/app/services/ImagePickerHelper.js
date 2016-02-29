(function () {

    var module = angular.module("app.image.picker");

    var imagePickerHelper = function () {

        var existingImagePickers = [];

        var registerImagePicker = function (id) {
            existingImagePickers.push({
                id: id,
                selectedImages: []
            });
        }

        var setSelectedImage = function (id, item) {
            var selectedImagePicker = _.find(existingImagePickers, function (i) { return i.id == id; });
            var selectedImages = selectedImagePicker.selectedImages;
            if (_.find(selectedImages, function (i) { return i == item; })) {
                selectedImagePicker.selectedImages = _.filter(selectedImages, function (i) { return i != item; });
            }
            else {
                selectedImagePicker.selectedImages.push(item);
            }
        }

        var getSelectedImages = function (id) {
            return _.find(existingImagePickers, function (i) { return i.id == id; }).selectedImages;
        }

        return {
            registerImagePicker: registerImagePicker,
            setSelectedImage: setSelectedImage,
            getSelectedImages: getSelectedImages
        }
    };

    module.factory("imagePickerHelper", imagePickerHelper);
}());