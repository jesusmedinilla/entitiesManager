/*global angular, define, Parse*/
define(['app', 'parse'], function (app, Parse) {
    'use strict';

    function UserService($rootScope, $q) {

        function login(username, password, callback) {
            var response;

            Parse.User.logIn(username, password, {
                success: function (user) {
                    $rootScope.$apply(function () {
                        response = {
                            success: true
                        };
                        callback(response);
                    });
                },
                error: function (user, error) {
                    $rootScope.$apply(function () {
                        response = {
                            success: false,
                            message: 'Username or password is incorrect'
                        };
                        callback(response);
                    });
                }
            });
        }

        function create(newUser) {
            var deferred = $q.defer(),
                user = new Parse.User();

            user.set("username", newUser.username);
            user.set("password", newUser.password);
            //user.set("email", newUser.email);

            user.signUp(null, {
                success: function (user) {
                    $rootScope.$apply(function () {
                        deferred.resolve({
                            success: true
                        });
                    });
                },
                error: function (user, error) {
                    $rootScope.$apply(function () {
                        deferred.resolve({
                            success: false,
                            message: error.message
                        }); //'En nombre de usuario ya esta siendo usado' });
                    });
                }
            });

            return deferred.promise;
        }

        var service = {};

        service.create = create;
        service.login = login;

        return service;
    }


    UserService.$inject = ['$rootScope', '$q'];
    app.factory('UserService', UserService);

});
