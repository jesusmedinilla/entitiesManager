/*global angular, define*/
define(['app'], function (app) {

    'use strict';

    function UserService($timeout, $filter, $q) {

        var service = {};

        function getByUsername(username) {
            var deferred = $q.defer();
            var filtered = $filter('filter')(getUsers(), {
                username: username
            });
            var user = filtered.length ? filtered[0] : null;
            deferred.resolve(user);
            return deferred.promise;
        }

        function login(username, password, callback) {
            $timeout(function () {
                var response;

                service.getByUsername(username)
                    .then(function (user) {
                        if (user !== null && user.password === password) {
                            response = {
                                success: true
                            };
                        } else {
                            response = {
                                success: false,
                                message: 'Username or password is incorrect'
                            };
                        }
                        callback(response);
                    });
            }, 1000);

        }

        //        function GetAll() {
        //            var deferred = $q.defer();
        //            deferred.resolve(getUsers());
        //            return deferred.promise;
        //        }

        //        function GetById(id) {
        //            var deferred = $q.defer();
        //            var filtered = $filter('filter')(getUsers(), { id: id });
        //            var user = filtered.length ? filtered[0] : null;
        //            deferred.resolve(user);
        //            return deferred.promise;
        //        }

        function create(user) {
            var deferred = $q.defer();

            // simulate api call with $timeout
            $timeout(function () {
                getByUsername(user.username)
                    .then(function (duplicateUser) {
                        if (duplicateUser !== null) {
                            deferred.resolve({
                                success: false,
                                message: 'Username "' + user.username + '" is already taken'
                            });
                        } else {
                            var users = getUsers();

                            // assign id
                            var lastUser = users[users.length - 1] || {
                                id: 0
                            };
                            user.id = lastUser.id + 1;

                            // save to local storage
                            users.push(user);
                            setUsers(users);

                            deferred.resolve({
                                success: true
                            });
                        }
                    });
            }, 1000);

            return deferred.promise;
        }

        //        function Update(user) {
        //            var deferred = $q.defer();
        //
        //            var users = getUsers();
        //            for (var i = 0; i < users.length; i++) {
        //                if (users[i].id === user.id) {
        //                    users[i] = user;
        //                    break;
        //                }
        //            }
        //            setUsers(users);
        //            deferred.resolve();
        //
        //            return deferred.promise;
        //        }

        //        function Delete(id) {
        //            var deferred = $q.defer();
        //
        //            var users = getUsers();
        //            for (var i = 0; i < users.length; i++) {
        //                var user = users[i];
        //                if (user.id === id) {
        //                    users.splice(i, 1);
        //                    break;
        //                }
        //            }
        //            setUsers(users);
        //            deferred.resolve();
        //
        //            return deferred.promise;
        //        }

        // private functions

        function getUsers() {
            if (!localStorage.users) {
                localStorage.users = JSON.stringify([]);
            }

            return JSON.parse(localStorage.users);
        }


        function setUsers(users) {
            localStorage.users = JSON.stringify(users);
        }



        //service.GetAll = GetAll;
        //service.GetById = GetById;
        service.getByUsername = getByUsername;
        service.create = create;
        //service.Update = Update;
        //service.Delete = Delete;
        service.login = login;

        return service;

    }

    UserService.$inject = ['$timeout', '$filter', '$q'];
    app.factory('UserService', UserService);
});
