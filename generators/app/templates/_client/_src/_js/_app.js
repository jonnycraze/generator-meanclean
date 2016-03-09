var app = angular.module('YOUR_APP_NAME', 
        ['ngRoute'] // deps go in array
    );

    // configure our routes
    .config(function($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);

        $routeProvider
            // route for the home page
            .when('/', {
                templateUrl : '/src/views/landing.html'
            });
    });