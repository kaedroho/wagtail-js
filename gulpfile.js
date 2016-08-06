var gulp = require('gulp');
var rollup = require('rollup-stream');
var typescript = require('rollup-plugin-typescript');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify')


gulp.task('default', function() {
    return rollup({
            entry: 'src/main.ts',
            format: 'iife',
            moduleName: 'Wagtail',
            plugins: [
                typescript({
                    typescript: require('typescript')
                }),
            ]
        })
        .pipe(source('wagtail.js'))
        .pipe(gulp.dest('dist'));
});


gulp.task('dist', ['default'], function() {
    return rollup({
            entry: 'src/main.ts',
            format: 'iife',
            moduleName: 'Wagtail',
            plugins: [
                typescript({
                    typescript: require('typescript')
                }),
            ]
        })
        .pipe(source('wagtail.min.js'))
        .pipe(streamify(uglify()))
        .pipe(gulp.dest('dist'));
});
