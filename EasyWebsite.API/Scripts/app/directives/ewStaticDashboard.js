(function () {
    var dashboardModule = angular.module('app.dashboard');

    var ewStaticDashboard = function ($sce, languageHelper) {
        return {
            scope: {
                elements: '='
            },
            templateUrl: 'templates/ewStaticDashboardTemplate.html',
            link: function (scope) {
                
                scope.gridsterOpts = {
                    columns: 200,
                    rowHeight: 10,
                    floating: false,
                    pushing: false,
                    swapping: false,
                    resizable: {
                        enabled: false
                    },
                    draggable: {
                        enabled: false
                    },
                    margins: [0, 0],
                    maxRows: 900
                }

                scope.trustAsHtml = function (s) {
                    return $sce.trustAsHtml(s);
                };

                scope.getTranslatedContent = function (moduleContentTranslations) {
                    var moduleContentTranslation = _.find(moduleContentTranslations, function (t) { return t.language == languageHelper.getCurrentLanguage(); });
                    return moduleContentTranslation ? moduleContentTranslation.content : '';
                }

                
            }
        }
    }

        dashboardModule.directive('ewStaticDashboard', ['$sce', 'languageHelper', ewStaticDashboard]);
}());