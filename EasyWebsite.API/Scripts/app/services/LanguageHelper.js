(function () {

    var module = angular.module("myApp");

    var languageHelper = function () {

        var availableLanguages = [
            {
                label: 'LANGUAGE_FRENCH',
                code: 'fr_FR'
            },
            {
                label: 'LANGUAGE_ENGLISH',
                code: 'en_AU'
            }
        ];

        var currentLanguage;

        var setCurrentLanguage = function (lang) {
            currentLanguage = lang;
        };

        var getCurrentLanguage = function () {
            return currentLanguage;
        };

        var getModuleLabel = function (moduleNames) {
            var correctModuleName = _.find(moduleNames, function (n) { return n.language == getCurrentLanguage() || n.language.indexOf(getCurrentLanguage()) > -1; });
            return correctModuleName ? correctModuleName.name : '';
        };

        return {
            availableLanguages: availableLanguages,
            setCurrentLanguage: setCurrentLanguage,
            getCurrentLanguage: getCurrentLanguage,
            getModuleLabel: getModuleLabel
        }
    };

    module.factory("languageHelper", languageHelper);
}());