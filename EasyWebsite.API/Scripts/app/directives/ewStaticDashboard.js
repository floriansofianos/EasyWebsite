(function () {
    var dashboardModule = angular.module('app.dashboard');

    var ewStaticDashboard = function () {
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
                    }
                }

                
            }
        }
    }

    dashboardModule.directive('ewStaticDashboard', ewStaticDashboard);
}());