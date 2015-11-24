/*global define*/
define(['app'], function (app) {
    'use strict';


    function LoginController($location, AuthenticationFactory, FlashFactory) {
        var vm = this;

        function initController() {
            // reset login status
            AuthenticationFactory.clearCredentials();
        }

        function login() {
            vm.dataLoading = true;
            AuthenticationFactory.login(vm.username, vm.password, function (response) {
                if (response.success) {
                    AuthenticationFactory.setCredentials(vm.username, vm.password);
                    $location.path('/');
                } else {
                    FlashFactory.error(response.message);
                    vm.dataLoading = false;
                    //alert(response.message)
                }
            });
        }

        initController();
        vm.login = login;
    }

    LoginController.$inject = ['$location', 'AuthenticationFactory', 'FlashFactory'];

    app.controller('LoginController', LoginController);

});
