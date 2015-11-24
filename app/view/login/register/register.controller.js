/*global angular, define*/
define(['app'], function (app) {
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

    RegisterController.$inject = ['UserService', '$location', '$rootScope', 'FlashFactory'];
    app.controller('RegisterController', RegisterController);
});
