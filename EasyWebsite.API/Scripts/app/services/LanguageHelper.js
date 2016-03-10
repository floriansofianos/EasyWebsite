(function () {

    var module = angular.module("myApp");

    var languageHelper = function () {

        var availableLanguages = [
            {
                label: 'LANGUAGE_FRENCH',
                code: 'fr'
            },
            {
                label: 'LANGUAGE_ENGLISH',
                code: 'en'
            }
        ];

        return {
            availableLanguages: availableLanguages
        }
    };

    module.factory("languageHelper", languageHelper);
}());