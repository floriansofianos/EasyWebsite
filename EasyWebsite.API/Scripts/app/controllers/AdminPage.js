(function () {
    var app = angular.module("myApp");

    var adminPage = function ($scope, languageHelper, settings) {

        var allSettings = settings.get();
        $scope.availableLanguages = languageHelper.availableLanguages;

        allSettings.$promise.then(function () {
            $scope.settings = {};
            _.each(allSettings, function (s) {
                $scope.settings[s.key] = {
                    value: s.value,
                    id: s.id
                }
            });
            var selectedLanguagesCodes = $scope.settings.languages ? $scope.settings.languages.value.split('|') : [window.navigator.language];
            $scope.settings.languages.value = _.filter($scope.availableLanguages, function (e) { return _.any(selectedLanguagesCodes, function (l) { return l == e.code; }); });
        });

        $scope.save = function () {
            allSettings = [];
            $scope.settings.languages.value = _.reduce($scope.settings.languages.value, function (memo, l) { return l.code + '|' + memo; }, '');
            for (var property in $scope.settings) {
                if ($scope.settings.hasOwnProperty(property)) {
                    allSettings.push({
                        id: $scope.settings[property].id,
                        key: property,
                        value: $scope.settings[property].value
                    });
                }
            }
            settings.save(allSettings);
        }
        
    };

    app.controller("adminPage", ['$scope', 'languageHelper', 'settings', adminPage]);
}());