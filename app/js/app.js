/*global angular, ngRoute, $ */

var myApp = angular.module('myApp', [
    'myRouting', // Cargamos el módulo de rutas
    'myApp.version', // Cargamos el módulo de las versiones
    'ngResource',
    'myApp.version.version-directive',
    'ngCookies' // 'ui.bootstrap', 'ngAnimate'
]);

myApp.$inject = ['$controllerProvider'];

function config($controllerProvider) {
    'use strict';

    myApp.cp = $controllerProvider; // Guardamos el controllerProvider para poder hacer el lazy load de los controllers
    myApp.cpRegister = $controllerProvider.register; // Necesario para el testeo
}



myApp.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];

function run($rootScope, $location, $cookieStore, $http) {
    'use strict';

    // keep user logged in after page refresh
    $rootScope.globals = $cookieStore.get('globals') || {};
    if ($rootScope.globals.currentUser) {
        $http.defaults.headers.common.Authorization = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line ['Authorization']
    }

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        // redirect to login page if not logged in and trying to access a restricted page
        var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1,
            loggedIn = $rootScope.globals.currentUser;

        if (restrictedPage && !loggedIn) {
            $location.path('/login');
        }
    });
}

myApp.config(config);
myApp.run(run);
//myApp.run( startParse );





/*
function startParse()
{
	Parse.initialize("atGimMnC7AN88LEtBepThZqhTGTSS7zLCkutq54z", "eMXl6flzsyT48vya1L6smLLRvVf0aGIUeXn4tHTv");

	var TestObject = Parse.Object.extend("TestObject");
	var testObject = new TestObject();
	  testObject.save({foo: "bar"}, {
	  success: function(object) {
	    $(".success").show();
	  },
	  error: function(model, error) {
	    $(".error").show();
	  }
	})
}*/
