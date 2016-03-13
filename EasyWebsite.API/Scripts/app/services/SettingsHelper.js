(function () {

    var module = angular.module("app.settings");

    module.provider('settings', function () {
        // In the provider function, you cannot inject any
        // service or factory. This can only be done at the
        // "$get" method.

        this.$get = function ($resource) {
            var get = function () {
                return $resource('/api/SiteSettings/').query();
            };

            var getAvailableLanguages = function () {
                return $resource('/api/SiteSettings/', { key: 'languages' }).get();
            }

            var save = function (settings) {
                var query = $resource('/api/SiteSettings/').save(settings);
                query.$promise.then(function () { alert('Successful save!') });
            }

            return {
                get: get,
                save: save,
                getAvailableLanguages: getAvailableLanguages
            }
        };
    });

}());