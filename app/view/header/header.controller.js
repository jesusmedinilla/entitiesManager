/*global angular, define*/
define(["app"], function (app) {
    'use strict';

    function HeaderCtrl($rootScope, $scope, $location) {
        $scope.isLogged = false;

        $rootScope.$watch(
            function (rootScope) {
                return $rootScope.globals.currentUser;
            },
            function (newValue, oldValue) {
                $scope.isLogged = newValue !== undefined;
                if ($scope.isLogged) {
                    $scope.welcomeMessage = "Welcome, " + $rootScope.globals.currentUser.username;
                }
            }
        );

    }

    HeaderCtrl.$inject = ['$rootScope', '$scope', '$location'];
    app.controller('HeaderCtrl', HeaderCtrl);

});
