(function () {

    var module = angular.module("myApp");

    var errorEmailHelper = function ($injector) {

        // Gets the current user from the cache or the server
        var sendEmail = function (message) {
            var http = $injector.get('$http');
            http({
                method: 'POST',
                url: '/api/EmailError',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: '=' + message
            });
        }

        return {
            sendEmail: sendEmail
        }
    };

    module.factory("errorEmailHelper", ["$injector", errorEmailHelper]);
}());