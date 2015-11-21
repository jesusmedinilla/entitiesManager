/*global angular*/
function initModule() {
    'use strict';

    function EntityDetailCtrl(CrudFactory, $routeParams, FlashFactory) {
        var vm = this;
        vm.entity = {};
        vm.dataLoading = false;
        vm.loadedId = $routeParams.id;

        if (vm.loadedId !== undefined) {
            vm.dataLoading = true;
            CrudFactory.getItemById($routeParams.id).then(function (response) {
                if (response.success) {
                    //FlashFactory.Success('Registration successful', true);
                    vm.entity = response.result;
                    vm.dataLoading = false;
                } else {
                    FlashFactory.error(response.message);
                    vm.dataLoading = false;
                }
            });
        }

        this.saveEntity = function () {
            vm.dataLoading = true;

            if (this.entity.id !== undefined) {
                CrudFactory.updateItem(this.entity).then(function (response) {
                    if (response.success) {
                        vm.dataLoading = false;
                        FlashFactory.success('Entity updated successfuly', true);
                        window.location = "#/";
                    } else {
                        vm.dataLoading = false;
                        FlashFactory.error(response.message);
                    }
                });
            } else {
                CrudFactory.createItem(this.entity).then(function (response) {
                    if (response.success) {
                        vm.dataLoading = false;
                        FlashFactory.success('Entity created successfuly', true);
                        window.location = "#/";
                    } else {
                        vm.dataLoading = false;
                        FlashFactory.error(response.message);
                    }
                });
            }
        };

        this.deleteEntity = function () {
            vm.dataLoading = true;
            vm.loadedId = undefined;

            CrudFactory.deleteItem(this.entity).then(function (response) {
                if (response.success) {
                    FlashFactory.success('Boda eliminada correctamente', true);
                    window.location = "#/";
                    vm.dataLoading = false;
                } else {
                    FlashFactory.error(response.message);
                    vm.dataLoading = false;
                }
            });
        };
    }

    //    angular
    //        .module('myApp').cp.register
    //        .controller('WineListCtrl', WineListCtrl)
    //        .controller('WineDetailCtrl', WineDetailCtrl);

    // LAZY LOAD
    angular.module('myApp').cp.register('EntityDetailCtrl', EntityDetailCtrl);

    EntityDetailCtrl.$inject = ['CrudFactory', '$routeParams', 'FlashFactory'];
}

initModule();
