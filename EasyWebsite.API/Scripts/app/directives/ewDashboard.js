(function () {
    var dashboardModule = angular.module('app.dashboard');

    var ewDashboard = function (moduleContentHelper, $routeParams, $uibModal, $sce) {
        return {
            scope: {
                elements: '=',
                language: '='
            },
            templateUrl: 'templates/ewDashboardTemplate.html',
            link: function (scope) {
                /*
                scope.elements = [
                    {
                        ui_id: 0,
                        sizeX: 3,
                        sizeY: 3,
                        row: 0,
                        col: 0
                    },
                    {
                        ui_id: 1,
                        sizeX: 5,
                        sizeY: 6,
                        row: 1,
                        col: 6
                    }
                ];*/



                scope.gridsterOpts = {
                    columns: 200,
                    rowHeight: 10,
                    floating: false,
                    pushing: false,
                    swapping: false,
                    margins: [0, 0],
                    maxRows: 900,
                    mobileBreakPoint: 750
                }

                scope.addNewElement = function () {
                    if (scope.elements.length < 1) var maxId = 0;
                    else var maxId = _.max(scope.elements, function (e) { return e.id }).id;
                    
                    scope.elements.push({
                        ui_id: maxId + 1,
                        sizeX: 30,
                        sizeY: 30,
                        row: 0,
                        col: 0,
                        moduleId: $routeParams.id
                    });
                }

                scope.deleteWidget = function (id) {
                    scope.elements = _.filter(scope.elements, function (e) { return e.ui_id != id });
                }

                scope.saveAll = function () {
                    moduleContentHelper.saveElements($routeParams.id, scope.elements);
                }

                scope.editWidget = function (elt) {
                    var modalInstance = $uibModal.open({
                        templateUrl: '/templates/admin-content-modal.html',
                        controller: 'ModalInstanceController',
                        size: 'lg',
                        resolve: {
                            element: function () {
                                return elt;
                            },
                            language: function () {
                                return scope.language;
                            }
                        }
                    });
                }

                scope.getCorrectTranslation = function (moduleTranslations) {
                    var translation = _.find(moduleTranslations, function (t) { return t.language == scope.language; });
                    return translation ? translation.content : '';
                };

                scope.trustAsHtml = function (s) {
                    return $sce.trustAsHtml(s);
                };
            }
        }
    }

    dashboardModule.directive('ewDashboard', ['moduleContentHelper', '$routeParams', '$uibModal', '$sce', ewDashboard]);
}());