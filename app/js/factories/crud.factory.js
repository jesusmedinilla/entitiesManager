/*global angular*/
function initModule() {
    'use strict';

    function CrudFactory(CrudService) {

        function getList() {
            return CrudService.getList();
        }

        function updateItem(item) {
            return CrudService.updateItem(item);
        }

        function createItem(item) {
            return CrudService.createItem(item);
        }

        function getItemById(id) {
            return CrudService.getItemById(id);
        }

        function deleteItem(item) {
            return CrudService.deleteItem(item);
        }

        var service = {};

        service.getList = getList;
        service.updateItem = updateItem;
        service.createItem = createItem;
        service.getItemById = getItemById;
        service.deleteItem = deleteItem;


        return service;
    }

    angular
        .module('myApp')
        .factory('CrudFactory', CrudFactory);

    CrudFactory.$inject = ['CrudService'];

}

initModule();
