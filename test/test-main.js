var tests = [];
for (var file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
        if (/spec\.js$/.test(file)) {
            tests.push(file);
        }
    }
}

requirejs.config({
    // Karma serves files from '/base'
    baseUrl: '/base/app',

    paths: {
        'app': 'js/app',
        'angular': '../app/lib/angular/angular',
        'angular-cookies': '../app/lib/angular-cookies/angular-cookies',
        'angular-resource': '../app/lib/angular-resource/angular-resource',

        'angularMocks': '../app/lib/angular-mocks/angular-mocks',
        'angular-route': '../app/lib/angular-route/angular-route',
        'parse': '../app/lib/parse/parse',

        'jquery': '../app/lib/jquery/dist/jquery',
        //'bootstrap': '../app/lib/bootstrap/dist/js/bootstrap.min',

    },

    shim: {
        'app': {
            deps: ['angular', 'angular-route', 'angular-cookies', 'angular-resource', 'jquery']
        },
        'angular-route': {
            deps: ['angular']
        },
        'angular-cookies': {
            deps: ['angular']
        },
        'angular-resource': {
            deps: ['angular']
        }
    },


    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start
});
