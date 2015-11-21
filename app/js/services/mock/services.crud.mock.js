/*global angular*/
function initModule() {
    'use strict';

    function CrudService($timeout, $filter, $q) {

        function getList() {
            if (!localStorage.entities) {
                localStorage.entities = JSON.stringify([]);
            }

            return JSON.parse(localStorage.entities);
        }

        function setList(elems) {
            localStorage.entities = JSON.stringify(elems);
        }

        function getAll() {
            var deferred = $q.defer();
            $timeout(function () {
                deferred.resolve({
                    success: true,
                    result: getList()
                });
            }, 1000);
            return deferred.promise;
        }

        function getItemById(id) {
            var deferred = $q.defer();
            $timeout(function () {
                var filtered = $filter('filter')(getList(), {
                        id: id
                    }),
                    entity = filtered.length ? filtered[0] : null;
                deferred.resolve({
                    success: true,
                    result: entity
                });
            }, 1000);
            return deferred.promise;
        }

        function createItem(item) {
            var deferred = $q.defer();

            // simulate api call with $timeout
            $timeout(function () {
                var entities = getList(),
                    lastEntity = entities[entities.length - 1] || {
                        id: 0
                    };
                item.id = lastEntity.id + 1;

                // save to local storage
                entities.push(item);
                setList(entities);

                deferred.resolve({
                    success: true
                });
            }, 1000);

            return deferred.promise;
        }

        function updateItem(item) {
            var deferred = $q.defer();
            $timeout(function () {
                var entities = getList(),
                    i;
                for (i = 0; i < entities.length; i++) {
                    if (entities[i].id === item.id) {
                        entities[i] = item;
                        break;
                    }
                }
                setList(entities);
                deferred.resolve({
                    success: true,
                    result: entities
                });
            }, 1000);
            return deferred.promise;
        }

        function deleteItem(item) {
            var deferred = $q.defer();
            $timeout(function () {
                var entities = getList();
                for (var i = 0; i < entities.length; i++) {
                    var entity = entities[i];
                    if (entity.id === item.id) {
                        entity.splice(i, 1);
                        break;
                    }
                }
                setList(entitites);
                deferred.resolve({
                    success: true,
                    result: entities
                });
            }, 1000);
            return deferred.promise;
        }


        var service = {};

        service.getList = getAll;
        service.updateItem = updateItem;
        service.createItem = createItem;
        service.getItemById = getItemById;
        service.deleteItem = deleteItem;

        return service;

    }

    angular
        .module('myApp')
        .factory('CrudService', CrudService);

    CrudService.$inject = ['$timeout', '$filter', '$q'];

}

initModule();
