﻿(function () {
    var dashboardModule = angular.module('app.dashboard');

    var ewStaticDashboard = function ($sce) {
        return {
            scope: {
                elements: '='
            },
            templateUrl: 'templates/ewStaticDashboardTemplate.html',
            link: function (scope) {
                
                scope.gridsterOpts = {
                    columns: 24,
                    rowHeight: 40,
                    floating: false,
                    pushing: false,
                    swapping: false,
                    resizable: {
                        enabled: false
                    },
                    draggable: {
                        enabled: false
                    },
                    margins: [0, 0]
                }

                scope.trustAsHtml = function (s) {
                    return $sce.trustAsHtml(s);
                };

                
            }
        }
    }

    dashboardModule.directive('ewStaticDashboard', ['$sce', ewStaticDashboard]);
}());