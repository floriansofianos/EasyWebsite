(function () {
    var myApp = angular.module('myApp', ['ngRoute']);

    // Routing configuration
    myApp.config(['$routeProvider',
          function ($routeProvider) {
              $routeProvider.
                when('/', {
                    templateUrl: 'templates/home.html',
                    controller: 'homePage'
                }).
                otherwise({
                    redirectTo: '/'
                });
          }]);

}());