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
                        id: 0,
                        sizeX: 3,
                        sizeY: 3,
                        row: 0,
                        col: 0
                    },
                    {
                        id: 1,
                        sizeX: 5,
                        sizeY: 6,
                        row: 1,
                        col: 6
                    }
                ];

                scope.gridsterOpts = {
                    columns: 24,
                    rowHeight: 40
                }

                scope.addNewElement = function () {
                    var maxId = _.max(scope.elements, function (e) { return e.id })
                    scope.elements.push({
                        id: maxId.id + 1,
                        sizeX: 3,
                        sizeY: 3,
                        row: 0,
                        col: 0
                    });
                }

                scope.deleteWidget = function (id) {
                    scope.elements = _.filter(scope.elements, function (e) { return e.id != id });
                }
            }
        }
    }

    dashboardModule.directive('ewDashboard', ewDashboard);
}());