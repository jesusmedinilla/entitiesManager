/*global require, console*/

var gulp = require("gulp");
var webserver = require("gulp-webserver");
var jsHint = require("gulp-jshint");
var jsMin = require("gulp-jsmin");
var rename = require("gulp-rename");
var minifyHTML = require("gulp-minify-html");
var deleteLines = require("gulp-delete-lines");


// Servidor web de desarrollo
gulp.task("devServer", function () {
    "use strict";
    gulp.src("./app")
        .pipe(webserver({
            open: true,
            livereload: true
        }));
});

gulp.task("prodServer", function () {
    "use strict";
    gulp.src("./dist")
        .pipe(webserver({
            open: true,
            livereload: true
        }));
});

// Depurador de errores
gulp.task("jsHint", function () {
    "use strict";
    return gulp.src("./app/view/**/*.js")
        .pipe(jsHint(".jshintrc"))
        .pipe(jsHint.reporter("default"));
});

gulp.task("compressJsMin", function () {
    "use strict";
    gulp.src(["./app/view*/**/*.js"])
        .pipe(jsMin())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest("dist/"));

    gulp.src(["app/js/**/*.js"])
        .pipe(jsMin())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest("dist/js/"));

    gulp.src(["app/lib/version/**/*.js"])
        .pipe(jsMin())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest("dist/lib/version/"));
});

gulp.task("compressHTML", function () {
    "use strict";
    gulp.src("./app/view*/**/*.html")
        .pipe(deleteLines({
            "filters": ["<!-- BEGIN PROD FILES"]
        }))
        .pipe(deleteLines({
            "filters": ["END PROD FILES -->"]
        }))
        .pipe(deleteLines({
            "filters": [new RegExp(".*DEVFILE.*")]
        }))
        .pipe(minifyHTML())
        .pipe(gulp.dest("dist/"));
});

gulp.task("copyResources", function () {
    "use strict";
    gulp.src(["./app/lib/**/*.min.*"])
        .pipe(gulp.dest("dist/lib/"));
    gulp.src(["app/css/app.css"])
        .pipe(gulp.dest("dist/css/"));
});

gulp.task("changeIndex", function () {
    "use strict";
    gulp.src(["./app/index.html"])
        .pipe(deleteLines({
            "filters": ["<!-- BEGIN PROD FILES"]
        }))
        .pipe(deleteLines({
            "filters": ["END PROD FILES -->"]
        }))
        .pipe(deleteLines({
            "filters": [new RegExp(".*DEVFILE.*")]
        }))
        .pipe(minifyHTML())
        .pipe(gulp.dest("dist/"));
});


gulp.task("default", ["jsHint"]);

gulp.task("compile", ["compressHTML", "compressJsMin", "copyResources", "changeIndex"]);
