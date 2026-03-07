var gulp = require('gulp'),
    clean = require('gulp-clean'),
    usemin = require('gulp-usemin'),
    // minifyHtml = require('gulp-minify-html'),
    uglify = require('gulp-uglify'),
    minifycss = require('gulp-minify-css'),
    rev = require('gulp-rev');

var config = {
    deployPath: 'dist'
};

gulp.task('clean', function() {
    return gulp.src(config.deployPath).pipe(clean());
});

gulp.task('usemin', function() {
    return gulp
        .src('./*.html')
        .pipe(
            usemin({
                // html: [function() {
                //     return minifyHtml({
                //         empty       : true,
                //         conditionals: true,
                //         spare       : true,
                //         cdata       : true
                //     });
                // }],
                js: [uglify, rev],
                css: [minifycss(), rev]
            })
        )
        .pipe(gulp.dest(config.deployPath));
});

gulp.task('default', ['clean'], function() {
    gulp.start('usemin');
});
