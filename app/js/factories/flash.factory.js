/*global angular*/
function initModule() {
    'use strict';

    function FlashFactory($rootScope) {

        function initService() {

            function clearFlashMessage() {
                var flash = $rootScope.flash;
                if (flash) {
                    if (!flash.keepAfterLocationChange) {
                        delete $rootScope.flash;
                    } else {
                        // only keep for a single location change
                        flash.keepAfterLocationChange = false;
                    }
                }
            }

            $rootScope.$on('$locationChangeStart', function () {
                clearFlashMessage();
            });

        }

        function success(message, keepAfterLocationChange) {
            $rootScope.flash = {
                message: message,
                type: 'success',
                keepAfterLocationChange: keepAfterLocationChange
            };
        }

        function error(message, keepAfterLocationChange) {
            $rootScope.flash = {
                message: message,
                type: 'error',
                keepAfterLocationChange: keepAfterLocationChange
            };
        }

        var service = {};

        service.success = success;
        service.error = error;

        initService();

        return service;

    }

    angular
        .module('myApp')
        .factory('FlashFactory', FlashFactory);

    FlashFactory.$inject = ['$rootScope'];
}

initModule();
