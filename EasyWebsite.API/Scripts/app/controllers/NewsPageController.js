(function () {
    var app = angular.module("myApp");

    var newsPageController = function ($scope, authService, newsHelper, userHelper, languageHelper, settings, permissionHelper, $location, spinnerHelper, $route, $window, $filter) {

        $scope.notSavingNews = true;

        $scope.canWriteNews = permissionHelper.get('ROLE_NEWS_WRITER');

        $scope.goToNews = function (newsId) {
            $location.path($location.url() + '/' + newsId);
        };

        // Only show the news for current language
        $scope.news.$promise.then(function () {
            $scope.news = _.filter($scope.news, function (n) { return n.language == languageHelper.getCurrentLanguage(); });
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
               date: (new Date()).toJSON(),
               language: $scope.newElement.newLanguage,
               id: $scope.newElement.id
           };
           var promise = newsHelper.save(news);
           $scope.notSavingNews = false;
            spinnerHelper.show();
            promise.then(function() {
                spinnerHelper.hide();
                $route.reload();
            });

        }

        $scope.editNews = function (id) {
            var currentNews = _.find($scope.news, function (n) { return n.id == id; });
            $scope.newElement = {
                newTitle: currentNews.title,
                newBody: currentNews.body,
                newLanguage: currentNews.language,
                id: currentNews.id
            };
            $scope.creatingNews = true;
        }

        $scope.deleteNews = function (id) {
            if ($window.confirm($filter('translate')('CONFIRM_DELETE_NEWS'))) {
                var promise = newsHelper.deleteNews(id);
                $scope.notSavingNews = false;
                spinnerHelper.show();
                promise.then(function () {
                    spinnerHelper.hide();
                    $route.reload();
                });
            }            
        }

        

    };

    app.controller("newsPageController", ['$scope', 'authService', 'newsHelper', 'userHelper', 'languageHelper', 'settings', 'permissionHelper', '$location', 'spinnerHelper', '$route', '$window', '$filter', newsPageController]);
}());