/*global require, angular*/
require.config({
    baseUrl: '/',
    paths: {
        'app' : 'js/app',
		'angular': '/lib/angular/angular',
		'angular-route': '/lib/angular-route/angular-route',
        'angular-cookies': '/lib/angular-cookies/angular-cookies',
        //'angular-resource': '/lib/angular-resource/angular-resource.js',
        //'angular-animate': '/app/lib/angular-animate/angular-animate',
        //'ui-bootstrap': '/app/lib/angular-bootstrap/ui-bootstrap.min',
        //'ui-bootstrap-tpls': '/app/lib/angular-bootstrap/ui-bootstrap-tpls.min',

		//'bootstrap': '/bower_components/bootstrap/dist/js/bootstrap.min',
		'jquery': '/lib/jquery/dist/jquery'
        //'parse': '/bower_components/parse/parse',

        //'version': '/lib/version/version',
        //'version-directive': '/lib/version/version-directive',
        //'interpolate-filter': '/lib/version/interpolate-filter'

        //'webcomponents-lite':'/bower_components/webcomponentsjs/webcomponents-lite.min'
    },

    shim: {
		'app': {
			deps: [ 'angular', 'angular-route', 'angular-cookies',
                    'jquery' ] //, 'version', 'version-directive', 'interpolate-filter'
		},
		'angular-route': {
			deps: ['angular']
		},
        'angular-cookies': {
            deps: ['angular']
        }
        /*'version': {
            deps: ['angular']
        },
        'version-directive': {
            deps: ['angular']
        },
        'interpolate-filter': {
            deps: ['angular']
        }*/
	}
});

require(
    [
        'app'
    ],
    function (app) {
        'use strict';
        angular.bootstrap(document, ['app']);
    }
);
