(function () {

    var module = angular.module("myApp");

    var newsDate = function () {
        return function (input) {
            return moment.utc(input).local().format('LLLL');
        }
    }

    module.filter("newsDate", newsDate);

}());