/*global angular*/
function initModule() {
    'use strict';


    function RegisterController(UserService, $location, $rootScope, FlashFactory) {

        var vm = this;

        function register() {
            vm.dataLoading = true;
            UserService.create(vm.user)
                .then(function (response) {
                    if (response.success) {
                        FlashFactory.success('Registration successful', true);
                        $location.path('/login');
                    } else {
                        FlashFactory.error(response.message);
                        vm.dataLoading = false;
                    }
                });
        }

        vm.register = register;

    }

    //    angular
    //        .module('app')
    //        .controller('RegisterController', RegisterController);

    angular.module("myApp").cp.register('RegisterController', RegisterController);

    RegisterController.$inject = ['UserService', '$location', '$rootScope', 'FlashFactory'];
}

initModule();
