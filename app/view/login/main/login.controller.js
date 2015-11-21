(function () {
    'use strict';

    // LAZY LOAD
    myApp.cp.register('LoginController', LoginController); //Acceso al controller Provider para cargarlo


    LoginController.$inject = ['$location', 'AuthenticationFactory', 'FlashFactory'];

    function LoginController($location, AuthenticationFactory, FlashFactory) {
        var vm = this;

        vm.login = login;

        (function initController() {
            // reset login status
            AuthenticationFactory.clearCredentials();
        })();

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
        };
    }
})();
