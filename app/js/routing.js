/*global define */
define([], function () {
    'use strict';
    return {
        defaultRoutePath: '/',
        routes: {
            '/login': {
                templateUrl: '/view/login/main/login.view.html',
                controller: 'LoginController',
                controllerAs: 'vm',
                dependencies: [
                    'view/login/main/login.controller',
                    'view/header/header.controller',
                    'js/factories/authentication.factory',
                    'js/factories/flash.factory',
                    'js/services/parse/services.auth.parse'
                    //'js/services/mock/services.auth.mock'
                    //'scripts/services/parse/UserService'
                ]
            },
            '/register': {
                templateUrl: '/view/login/register/register.view.html',
                controller: 'RegisterController',
                controllerAs: 'vm',
                dependencies: [
                    'view/login/register/register.controller',
                    'js/factories/flash.factory',
                    //'js/services/mock/services.auth.mock'
                    'js/services/parse/services.auth.parse'
                ]
            },
            '/': {
                templateUrl: '/view/entity/entityList.view.html',
                controller: 'EntityListCtrl',
                controllerAs: 'vm',
                dependencies: [
                    'view/entity/entityList.controller',
                    'js/factories/flash.factory',
                    'view/header/header.controller',
                    //'scripts/services/parse/CrudService'
                    //'js/services/mock/services.crud.mock'
                    'js/services/srv/services.crud'
                ]

            },
            '/entity/add': {
                templateUrl: '/view/entity/entityDetails.view.html',
                controller: 'EntityDetailCtrl',
                controllerAs: 'vm',
                dependencies: [
                    'view/entity/entityDetails.controller',
                    'js/factories/flash.factory',
                    //'js/services/mock/services.crud.mock'
                    'js/services/srv/services.crud'
                ]

            },
            '/entity/:id': {
                templateUrl: '/view/entity/entityDetails.view.html',
                controller: 'EntityDetailCtrl',
                controllerAs: 'vm',
                dependencies: [
                    'view/entity/entityDetails.controller',
                    'js/factories/flash.factory',
                    //'js/services/mock/services.crud.mock'
                    'js/services/srv/services.crud'
                ]

            }
        }
    };
});
