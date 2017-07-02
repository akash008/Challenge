var app = angular.module('FoghornApp', ['ngRoute', 'infinite-scroll', 'mdo-angular-cryptography']);
app.config(function($routeProvider, $cryptoProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "app/components/search/search.view.html",
                controller: "SearchController"
            })
            // crypto key    
        $cryptoProvider.setCryptographyKey('Foghorn');
    })
    .run(function($rootScope) {
        $rootScope.$on("$locationChangeStart", function(event, next, current) {
            // handle route changes     
            if (next != current) {
                localStorage.clear();
            }
        });
    });