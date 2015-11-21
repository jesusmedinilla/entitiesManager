/*global angular*/
function initModule() {
    'use strict';

    function EntityListCtrl(CrudFactory, FlashFactory) {

        var vm = this;
        vm.selectedView = 'default';
        vm.entities = [];

        CrudFactory.getList().then(function (response) {
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

    //    angular
    //        .module('myApp').cp.register
    //        .controller('WineListCtrl', WineListCtrl)
    //        .controller('WineDetailCtrl', WineDetailCtrl);

    // LAZY LOAD
    angular.module('myApp').cp.register('EntityListCtrl', EntityListCtrl);

    EntityListCtrl.$inject = ['CrudFactory', 'FlashFactory'];

}

initModule();
