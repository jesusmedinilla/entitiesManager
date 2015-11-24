/*global define*/
define(['app'], function (app) {

    'use strict';

    function CrudService(Entity, $q) {

        function getList() {
            var deferred = $q.defer();

            Entity.query({},
                function (result) {
                    deferred.resolve({
                        success: true,
                        result: result
                    });
                },
                function () {
                    deferred.resolve({
                        success: false,
                        message: 'Error recuperando el listado'
                    });
                });

            return deferred.promise;
        }

        function updateItem(item) {
            var deferred = $q.defer();

            item.$update({
                    id: item.id
                },
                function (result) {
                    deferred.resolve({
                        success: true,
                        result: result
                    });
                },
                function () {
                    deferred.resolve({
                        success: false,
                        message: 'Error'
                    });
                });

            return deferred.promise;
        }

        function createItem(item) {

            var deferred = $q.defer(),
                newItem = new Entity();

            newItem.name = item.name;

            newItem.$save({},
                function (result) {
                    deferred.resolve({
                        success: true,
                        result: result
                    });
                },
                function () {
                    deferred.resolve({
                        success: false,
                        message: 'Error'
                    });
                });

            return deferred.promise;
        }

        function getItemById(id) {
            var deferred = $q.defer();

            Entity.get({
                    id: id
                },
                function (result) {
                    deferred.resolve({
                        success: true,
                        result: result
                    });
                },
                function () {
                    deferred.resolve({
                        success: false,
                        message: 'Error'
                    });
                });

            return deferred.promise;
        }

        function deleteItem(item) {
            var deferred = $q.defer();

            item.$delete({
                    id: item.id
                },
                function (result) {
                    deferred.resolve({
                        success: true,
                        result: result
                    });
                },
                function () {
                    deferred.resolve({
                        success: false,
                        message: 'Error'
                    });
                });

            return deferred.promise;
        }

        var service = {};

        service.getList = getList;
        service.updateItem = updateItem;
        service.createItem = createItem;
        service.getItemById = getItemById;
        service.deleteItem = deleteItem;

        return service;
    }


    function Entity($resource) {
        return $resource(
            'http://localhost:8080/entitiesManagerServices/rest/entities/:id', {
                id: '@id'
            }, {
                update: {
                    method: 'PUT',
                    dataType: 'json',
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                }
            }
        );
    }

    CrudService.$inject = ['Entity', '$q'];
    Entity.$inject = ['$resource'];

    app.factory('Entity', Entity);
    app.factory('CrudService', CrudService);

});
