/*global angular */

angular.module('myRouting', [
    'ngRoute'
])
    .config(['$routeProvider', function ($routeProvider) {
        'use strict';

        $routeProvider
            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'view/login/main/login.view.html',
                controllerAs: 'vm'
            })
            .when('/register', {
                controller: 'RegisterController',
                controllerAs: "vm",
                templateUrl: 'view/login/register/register.view.html'
            })
            .when('/', {
                controller: 'EntityListCtrl',
                controllerAs: "vm",
                templateUrl: 'view/entity/entityList.view.html'
            })
            .when('/entity/add', {
                controller: 'EntityDetailCtrl',
                controllerAs: "vm",
                templateUrl: 'view/entity/entityDetails.view.html'
            })
            .when('/entity/:id', {
                controller: 'EntityDetailCtrl',
                controllerAs: "vm",
                templateUrl: 'view/entity/entityDetails.view.html'
            })
            .otherwise({
                redirectTo: '/login'
            });
    }]);
