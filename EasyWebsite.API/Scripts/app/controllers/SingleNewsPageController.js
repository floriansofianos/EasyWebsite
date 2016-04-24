(function () {
    var app = angular.module("myApp");

    var singleNewsPageController = function ($scope, authService, newsHelper, userHelper, languageHelper, settings, permissionHelper, spinnerHelper, $filter, $window, $route, $location, moduleHelper) {

        $scope.notSavingNews = true;

        $scope.canWriteNews = permissionHelper.get('ROLE_NEWS_WRITER');

        // Only show the news for current language
        $scope.allnews.$promise.then(function () {
            $scope.allnews = _.filter($scope.allnews, function (n) { return n.language == languageHelper.getCurrentLanguage(); });
        });

        $scope.availableLanguages = settings.getAvailableLanguages();
        $scope.availableLanguages.$promise.then(function () {
            var allLanguages = languageHelper.availableLanguages;
            $scope.languages = _.filter(allLanguages, function (l) {
                return $scope.availableLanguages.value.indexOf(l.code) > -1;
            });
        });
        

        $scope.newElement = {
            newLanguage: languageHelper.getCurrentLanguage()
        };

        $scope.addNews = function () {
            $scope.creatingNews = true;
        };

        $scope.cancel = function () {
            $scope.creatingNews = false;
        }

        $scope.save = function () {
            var news = {
                moduleId: parseInt($scope.moduleid),
                title: $scope.newElement.newTitle,
                body: $scope.newElement.newBody,
                language: $scope.newElement.newLanguage,
                id: $scope.newElement.id,
                date: $scope.newElement.date
            };
            var promise = newsHelper.save(news);
            $scope.notSavingNews = false;
            spinnerHelper.show();
            promise.then(function () {
                spinnerHelper.hide();
                $route.reload();
            });
        }

        $scope.editNews = function (id) {
            var currentNews = _.find($scope.allnews, function (n) { return n.id == id; });
            $scope.newElement = {
                newTitle: currentNews.title,
                newBody: currentNews.body,
                newLanguage: currentNews.language,
                id: currentNews.id,
                date: currentNews.date
            };
            $scope.creatingNews = true;
        }

        $scope.deleteNews = function (id) {
            if ($window.confirm($filter('translate')('CONFIRM_DELETE_NEWS'))) {
                var promise = newsHelper.deleteNews(id);
                $scope.notSavingNews = false;
                spinnerHelper.show();
                promise.then(function () {
                    var module = moduleHelper.get(parseInt($scope.moduleid));
                    module.$promise.then(function () {
                        spinnerHelper.hide();
                        $location.url(module.url);
                    });
                });
            }
        }        

    };

    app.controller("singleNewsPageController", ['$scope', 'authService', 'newsHelper', 'userHelper', 'languageHelper', 'settings', 'permissionHelper', 'spinnerHelper', '$filter', '$window', '$route', '$location', 'moduleHelper', singleNewsPageController]);
}());