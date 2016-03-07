(function () {
    var app = angular.module("myApp");

    var modalContentMapController = function ($scope) {
        $scope.map = { center: { latitude: 0, longitude: 0 }, zoom: 1 };

        var parseHTML = function (element) {
            var container = $.parseHTML(element)[0];
            //TODO Parse existing HTML
        };

        var element = $scope.$parent.element;

        $scope.marker = {
            idKey: element.id,
            coords: $scope.map.center,
            options: { draggable: true }
        };

        $scope.windowOptions = {
            visible: false
        };

        var events = {
            places_changed: function (searchBox) {
                var result = searchBox.getPlaces();
                //console.log(result[0]);
                $scope.companyDetails = '<span class="company-name">' + result[0].name + '</span>' + result[0].adr_address.replace(',', '<br />');
                $scope.marker.coords.latitude = result[0].geometry.location.lat();
                $scope.marker.coords.longitude = result[0].geometry.location.lng();
                $scope.map.zoom = 17;
                $scope.windowOptions.visible = true;
            }
        }

        $scope.searchbox = {
            template: 'templates/map-searchbox.html',
            events: events
        }

        if (element.moduleContentTranslations.length > 0) $scope.content = element.moduleContentTranslations[0].content;
        else $scope.content = '<div class="map-container"></div>';

        parseHTML($scope.content);

        $scope.save = function () {
            $scope.$parent.save('<div class="map-container"><ui-gmap-google-map center="' + JSON.stringify($scope.map.center).replace(new RegExp('"', "g"), '&quot;') + '" zoom="' + $scope.map.zoom + '"><ui-gmap-marker coords="' + JSON.stringify($scope.map.center).replace(new RegExp('"', "g"), '&quot;') + '" idkey="' + $scope.marker.idKey + '"><ui-gmap-window options="' + JSON.stringify($scope.windowOptions).replace(new RegExp('"', "g"), '&quot;') + '" show="true"><div dynamic="\'' + $scope.companyDetails.replace(new RegExp('"', "g"), '&quot;') + '\'"></div></ui-gmap-window></ui-gmap-marker></div>');
        }



    };

    app.controller("modalContentMapController", ['$scope', modalContentMapController]);
}());