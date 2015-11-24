/*global angular, define*/
define(['app'], function (app) {

    'use strict';

    function EntityListCtrl(CrudService, FlashFactory) {

        var vm = this;
        vm.selectedView = 'default';
        vm.entities = [];

        CrudService.getList().then(function (response) {
            if (response.success) {
                //FlashFactory.success('Listado recuperado en 0 coma', true);
                vm.entities = response.result;
            } else {
                FlashFactory.error(response.message);
            }
        });

        this.addEntity = function () {
            window.location = "#/entity/add";
        };
    }

    EntityListCtrl.$inject = ['CrudService', 'FlashFactory'];
    app.controller('EntityListCtrl', EntityListCtrl);

});
