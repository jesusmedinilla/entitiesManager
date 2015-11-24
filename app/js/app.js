/*global angular, ngRoute, $, define, Parse */
define(
    ['js/routing', 'js/factories/dependenciesResolver.factory', 'parse'],
    function (routesConf, dependencyResolverFor, Parse) {

        'use strict';

        var app = angular.module('app', ['ngRoute', 'ngCookies', 'ngResource']); //, 'ngAnimate', 'ui.bootstrap' ]);

        app.config([
            '$routeProvider',
            '$locationProvider',
            '$controllerProvider',
            '$compileProvider',
            '$filterProvider',
            '$provide',


            function config($routeProvider, $locationProvider, $controllerProvider, $compileProvider, $filterProvider, $provide) {

                app.controller = $controllerProvider.register;
                app.directive = $compileProvider.directive;
                app.filter = $filterProvider.register;
                app.factory = $provide.factory;
                app.service = $provide.service;

                //$locationProvider.html5Mode(true);
                //$locationProvider.html5Mode({
                //    enabled: false,
                //    requireBase: false
                //});

                if (routesConf.routes !== undefined) {
                    angular.forEach(routesConf.routes, function (route, path) {
                        $routeProvider.when(path, {
                            templateUrl: route.templateUrl,
                            controller: route.controller,
                            controllerAs: route.controllerAs,
                            resolve: dependencyResolverFor(route.dependencies)
                        });
                    });
                }

                if (routesConf.defaultRoutePath !== undefined) {
                    $routeProvider.otherwise({
                        redirectTo: config.defaultRoutePath
                    });
                }
            }
        ]);



        app.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];

        function run($rootScope, $location, $cookieStore, $http) {

            $rootScope.globals = $cookieStore.get('globals') || {};
            if ($rootScope.globals.currentUser) {
                $http.defaults.headers.common.Authorization = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line ['Authorization']
            }

            $rootScope.$on('$locationChangeStart', function (event, next, current) {
                // redirect to login page if not logged in and trying to access a restricted page
                var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1,
                    loggedIn = $rootScope.globals.currentUser;

                if (restrictedPage && !loggedIn) {
                    $location.path('/login');
                }
            });
        }

        function startParse() {
            Parse.initialize("atGimMnC7AN88LEtBepThZqhTGTSS7zLCkutq54z", "eMXl6flzsyT48vya1L6smLLRvVf0aGIUeXn4tHTv");

            var TestObject = Parse.Object.extend("TestObject"),
                testObject = new TestObject();

            testObject.save({
                foo: "bar"
            }, {
                success: function (object) {
                    $(".success").show();
                },
                error: function (model, error) {
                    $(".error").show();
                }
            });
        }

        //app.config(config);
        app.run(run);
        app.run(startParse);








        // Refactorizar este controller a otro sitio (WebComponent???)
        function HeaderCtrl($rootScope, $scope, $location) {
            $scope.isLogged = false;

            $rootScope.$watch(
                function (rootScope) {
                    return $rootScope.globals.currentUser;
                },
                function (newValue, oldValue) {
                    $scope.isLogged = newValue !== undefined;
                    if ($scope.isLogged) {
                        $scope.welcomeMessage = "Bienvenido, " + $rootScope.globals.currentUser.username;
                    }
                }
            );
        }

        app.controller('HeaderCtrl', HeaderCtrl);

        HeaderCtrl.$inject = ['$rootScope', '$scope', '$location'];

        return app;
    }
);
