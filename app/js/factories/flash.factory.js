/*global angular, define*/
define(['app'], function (app) {

    'use strict';

    function initModule() {

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

        FlashFactory.$inject = ['$rootScope'];
        app.factory('FlashFactory', FlashFactory);

    }

    initModule();
});
