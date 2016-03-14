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

        var currentLanguage = '';

        return {
            availableLanguages: availableLanguages,
            currentLanguage: currentLanguage
        }
    };

    module.factory("languageHelper", languageHelper);
}());