(function () {
    var dashboardModule = angular.module('app.dashboard');

    var ewDashboard = function () {
        return {
            scope: {

            },
            templateUrl: 'templates/ewDashboardTemplate.html',
            link: function (scope) {
                scope.elements = [
                    {
                        sizeX: 3,
                        sizeY: 3,
                        row: 0,
                        col: 0
                    },
                    {
                        sizeX: 5,
                        sizeY: 6,
                        row: 1,
                        col: 6
                    }
                ];
            }
        }
    }

    dashboardModule.directive('ewDashboard', ewDashboard);
}());